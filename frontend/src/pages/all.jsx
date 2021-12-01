import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TopBar from "../components/topBar";
import "../css/App.css";
import "../css/dashboard.css";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SchoolIcon from "@mui/icons-material/School";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import dateFormat from "dateformat";
import BookmarkButton from "../components/BookmarkButton";

function All({ ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (props.login) {
      setIsLoading(true);
      fetch("http://localhost:3002/all_spending", {
        method: "POST",
        body: JSON.stringify({
          username: props.username,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setExpenses(json);
          setIsLoading(false);
        });
    }
  }, [props.login, props.username]);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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

  return (
    <>
      <TopBar {...props} />
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      <div className="page-wrapper">
        <Card sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "calc(100vh - 104px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow hover key={expense.id}>
                    <TableCell padding="checkbox">
                      <BookmarkButton
                        bookmarked={expense.bookmark}
                        id={expense.id}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: chartPallete[expense.category_id],
                          }}
                        >
                          {expense.category_id === 1 && <HomeIcon />}
                          {expense.category_id === 2 && <DirectionsBusIcon />}
                          {expense.category_id === 3 && (
                            <LocalGroceryStoreIcon />
                          )}
                          {expense.category_id === 4 && <HealthAndSafetyIcon />}
                          {expense.category_id === 5 && <RestaurantIcon />}
                          {expense.category_id === 6 && <ShoppingBagIcon />}
                          {expense.category_id === 7 && <SchoolIcon />}
                          {expense.category_id === 8 && <QuestionMarkIcon />}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        ></Typography>
                      </Box>
                    </TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.reason}</TableCell>
                    <TableCell>
                      {dateFormat(expense.purchase_date, "mm/dd/yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
}

export default All;
