import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TopBar from "../components/topBar";
import "../css/App.css";
import "../css/dashboard.css";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DoughnutChart from "../components/doughnutChart";
import Categories from "../components/categories";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useNavigate } from "react-router";

function Dashboard(props) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [categoriesHeight, setCategoriesHeight] = useState("0px");
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  let totalSpending = 0;
  expenses.forEach((spending) => {
    totalSpending += spending.amount;
  });
  useEffect(() => {
    document.title = "Dashboard";
  });

  useEffect(() => {
    if (props.login) {
      fetch("https://harry-expense-api.herokuapp.com/dashboard_spending", {
        method: "POST",
        body: JSON.stringify({
          username: props.username,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setExpenses(json);
          // console.log(json);
          // processing data for the chart
          const chartPallete = [
            "#22577A",
            "#38A3A5",
            "#57CC99",
            "#80ED99",
            "#d9ed92",
            "#00b4d8",
            "#94d2bd",
            "#C7F9CC",
          ];
          const labels = [
            "Home & Utilities",
            "Transportation",
            "Groceries",
            "Health",
            "Dining",
            "Shopping",
            "Education",
            "Others",
          ];
          const sumByCategory = [];
          const selectedColor = [];
          const selectedLabels = [];
          let categories = [];
          json.forEach((expense) => {
            if (!categories.includes(expense.category_id)) {
              categories.push(expense.category_id);
            }
          });
          // console.log(categories);
          // detect if the category is in the list from 1-8
          for (let i = 1; i <= 8; i++) {
            if (categories.includes(i)) {
              // if it includes, then calculate the sum of this category
              let sum = 0;
              json.forEach((expense) => {
                if (expense.category_id === i) {
                  sum += expense.amount;
                }
              });
              sumByCategory.push(sum);
              selectedColor.push(chartPallete[i - 1]);
              selectedLabels.push(labels[i - 1]);
            }
          }
          // console.log(sumByCategory);
          // console.log(selectedColor);
          setChartData(sumByCategory);
          setChartColor(selectedColor);
          setChartLabels(selectedLabels);
          //end of data processing
          //get the height of categories
          setIsLoading(false);
        });
    }
  }, [props.login, date, props.username]);

  useEffect(() => {
    if (document.querySelector("table")) {
      setCategoriesHeight(
        getComputedStyle(document.querySelector("table")).getPropertyValue(
          "height"
        )
      );
    }
  }, [chartData]);

  return (
    <>
      <TopBar
        username={props.username}
        currentPage={props.currentPage}
        setLogin={props.setLogin}
        setLoggedInUser={props.setLoggedInUser}
        handleDrawerToggle={props.handleDrawerToggle}
      />
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      <div className="page-wrapper">
        <div className="date-header">
          <Typography variant="h4" fontWeight={700}>
            Total Spending in{" "}
            {date.toLocaleString("default", { month: "long" })}: $
            {totalSpending.toFixed(2)}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <DatePicker
                inputFormat="yyyy-MM"
                views={["year", "month"]}
                label="Pick your month"
                minDate={new Date("2012-03-01")}
                maxDate={new Date("2023-06-01")}
                value={date}
                onChange={setDate}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </Box>
          </LocalizationProvider>
        </div>
        {chartData.length !== 0 ? (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} lg={8}>
              <DoughnutChart
                chartdata={chartData}
                chartcolor={chartColor}
                chartlables={chartLabels}
                height={categoriesHeight}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Categories
                chartdata={chartData}
                chartcolor={chartColor}
                chartlables={chartLabels}
              />
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
            }}
          >
            <Box>
              <Avatar
                sx={{
                  m: "auto",
                  bgcolor: "error.light",
                  width: 100,
                  height: 100,
                }}
              >
                <SimCardAlertIcon sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant="h4" sx={{ my: 3 }}>
                No Expense Found
              </Typography>
              <Button
                variant="contained"
                sx={{ boxShadow: 0, width: 1 }}
                startIcon={<AddCardIcon />}
                onClick={() => {
                  navigate("/record");
                }}
              >
                Record Expense
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
}

export default Dashboard;
