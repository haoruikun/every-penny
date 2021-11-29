require("dotenv").config();
const { Client } = require("pg");
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
    const client = createClient();
    client.connect()
        .then(() => {
        client.query("SELECT username FROM users").then((queryResponse) => {
            queryResponse.rows.forEach((row) => {
                if (row.username === req.body.username) {
                    return res.send({ result: "Username exsits!" });
                }
            })
            
            try {
                bcrypt.genSalt()
                .then((salt) => {
                    return bcrypt.hash(req.body.password, salt)
                })
                .then((hashedPassword) => {
                    client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [
                        req.body.username,
                        hashedPassword,
                    ])
                    .then(() => {
                        res.send({ result: "success" })
                    });
                })
            } catch {
                res.status(500).send()
            }
        });
    });

})

app.post("/login", (req, res) => {
    const client = createClient();
    client.connect()
        .then(() => {
            client.query("SELECT * FROM users").then((queryResponse) => {
                const user = queryResponse.rows.find(user => user.username === req.body.username)
                if (user == null) {
                    return res.status(400).send({ result: "Cannot find user." })
                } 
                try {
                    bcrypt.compare(req.body.password, user.password)
                        .then((found) => {
                            if (found) {
                                res.send({ result: "Login success!" })
                            } else {
                                res.send({ result: 'Password incorrect!' })
                            }
                        })
                } catch {
                    res.status(500).send()
                }
            })
        })
})

app.post("/dashboard_spending", (req, res) => {
    const client = createClient();
    client.connect()
        .then(() => {
            const username = req.body.username;
            const query = `SELECT amount,category_id,purchase_date,username FROM expense LEFT JOIN users ON users.id=expense.user_id WHERE username='${username}';`;
            client.query(query)
            .then((queryResponse) => {
                res.send(queryResponse.rows);
            })
        })
})

function createClient() {
    const client = new Client({
      connectionString: process.env.CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    });
  
    return client;
}

app.listen(3002);