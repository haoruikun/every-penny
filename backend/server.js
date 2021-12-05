require("dotenv").config();
const { Client } = require("pg");
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    client.query("SELECT username FROM users").then((queryResponse) => {
      try {
        let usernameExsits = false;
        queryResponse.rows.forEach((row) => {
          if (row.username === req.body.username) {
            usernameExsits = true;
          }
        });

        if (usernameExsits) {
          res.send({ result: "Username exsits!" });
          return client.end();
        }

        bcrypt
          .genSalt()
          .then((salt) => {
            return bcrypt.hash(req.body.password, salt);
          })
          .then((hashedPassword) => {
            client
              .query(
                "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
                [req.body.username, hashedPassword]
              )
              .then(() => {
                res.send({ result: "success" });
                client.end();
              });
          });
      } catch {
        res.status(500).send();
        client.end();
      }
    });
  });
});

app.post("/login", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    client.query("SELECT * FROM users").then((queryResponse) => {
      const user = queryResponse.rows.find(
        (user) => user.username === req.body.username
      );
      if (user == null) {
        res.status(400).send({ result: "Cannot find user." });
        return client.end();
      }
      try {
        bcrypt.compare(req.body.password, user.password).then((found) => {
          if (found) {
            res.send({ result: "Login success!" });
            client.end();
          } else {
            res.send({ result: "Password incorrect!" });
            client.end();
          }
        });
      } catch {
        res.status(500).send();
        client.end();
      }
    });
  });
});

app.post("/dashboard_spending", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    const username = req.body.username;
    const year = req.body.year;
    const month = req.body.month;
    const query = `SELECT amount,category_id,purchase_date,username FROM expense LEFT JOIN users ON users.id=expense.user_id WHERE username='${username}' AND EXTRACT (MONTH FROM purchase_date) = ${month} AND EXTRACT (YEAR FROM purchase_date) = ${year};`;
    // console.log(query);
    client.query(query).then((queryResponse) => {
      res.send(queryResponse.rows);
      client.end();
    });
  });
});

app.post("/all_spending", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    const username = req.body.username;
    const query = `SELECT expense.id,amount,reason,category_id,purchase_date,username,bookmark FROM expense LEFT JOIN users ON users.id=expense.user_id WHERE username='${username}' ORDER BY purchase_date DESC ;`;
    // console.log(query);
    client.query(query).then((queryResponse) => {
      res.send(queryResponse.rows);
      client.end();
    });
  });
});

app.post("/bookmark", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    const username = req.body.username;
    const query = `SELECT expense.id,amount,reason,category_id,purchase_date,username,bookmark FROM expense LEFT JOIN users ON users.id=expense.user_id WHERE username='${username}' AND bookmark = true ORDER BY purchase_date DESC ;`;
    // console.log(query);
    client.query(query).then((queryResponse) => {
      res.send(queryResponse.rows);
      client.end();
    });
  });
});

app.get("/toggle_bookmark/:id", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    client
      .query("UPDATE expense SET bookmark = NOT bookmark WHERE id = $1;", [
        req.params.id,
      ])
      .then((queryResponse) => {
        if (queryResponse.rowCount === 1) {
          res.json(queryResponse.rows[0]);
          client.end();
        } else {
          res.status(500).send();
          client.end();
        }
      });
  });
});

app.post("/record", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    console.log(req.body);
    const { username, category, amount, reason, date } = req.body;
    client
      .query(`SELECT id from users WHERE username = '${username}';`)
      .then((queryResponse) => {
        client
          .query(
            `INSERT INTO expense(reason,amount,category_id,user_id,purchase_date,bookmark)VALUES('${reason}',${amount},${category},${queryResponse.rows[0].id},'${date}',false);`
          )
          .then((queryResponse) => {
            if (queryResponse.command === "INSERT") {
              res.send({ result: "success" });
              client.end();
            } else {
              res.status(500).send({ result: "fail" });
              client.end();
            }
          });
      });
  });
});

app.get("/record/:id", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    client
      .query("SELECT * FROM expense WHERE id = $1", [req.params.id])
      .then((queryResponse) => {
        if (queryResponse.rowCount === 1) {
          res.json(queryResponse.rows[0]);
          client.end();
        } else {
          res.status(500).send();
          client.end();
        }
      });
  });
});

app.put("/record", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    console.log(req.body);
    const { category, amount, reason, date, id } = req.body;
    client
      .query(
        `UPDATE expense
      SET reason='${reason}',amount=${amount},category_id=${category},purchase_date='${date}' WHERE id=${id};`
      )
      .then((queryResponse) => {
        res.send(queryResponse);
      });
  });
});

app.delete("/delete/:id", (req, res) => {
  const client = createClient();
  client.connect().then(() => {
    client
      .query("DELETE from expense WHERE id = $1;", [req.params.id])
      .then((queryResponse) => {
        console.log(queryResponse.rowCount);
        if (queryResponse.rowCount === 1) {
          res.status(204).send();
        } else {
          res.status(500).send();
          client.end();
        }
      });
  });
});

function createClient() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });

  return client;
}

app.listen(process.env.PORT || 3002);
