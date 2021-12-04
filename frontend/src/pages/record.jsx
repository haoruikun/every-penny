import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  OutlinedInput,
  Grid,
  Button,
} from "@mui/material";
import TopBar from "../components/topBar";
import "../css/App.css";
import "../css/dashboard.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
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

function Record({ ...props }) {
  const [category, setCategory] = useState(null);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(new Date());

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    function pgFormatDate(date) {
      /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
      function zeroPad(d) {
        return ("0" + d).slice(-2);
      }

      var parsed = new Date(date);

      return [
        parsed.getUTCFullYear(),
        zeroPad(parsed.getMonth() + 1),
        zeroPad(parsed.getDate()),
        zeroPad(parsed.getHours()),
        zeroPad(parsed.getMinutes()),
        zeroPad(parsed.getSeconds()),
      ].join(" ");
    }
    const formattedDate = pgFormatDate(date);
    fetch("http://localhost:3002/record", {
      method: "POST",
      body: JSON.stringify({
        username: props.username,
        category,
        reason,
        amount: parseFloat(amount),
        date: dateFormat(date, "yyyy-mm-dd"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
      });
    });
  };
  return (
    <>
      <TopBar {...props} />
      <div className="page-wrapper">
        <Paper sx={{ maxWidth: 600, m: "auto", p: 10 }}>
          <form action="#" onSubmit={handleSubmit}>
            <Typography sx={{ mb: 3 }} variant="h4">
              Record Spending
            </Typography>
            <Grid container>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <DatePicker
                      inputFormat="yyyy-MM-dd"
                      label="Date"
                      minDate={new Date("2012-03-01")}
                      maxDate={new Date("2023-06-01")}
                      value={date}
                      onChange={setDate}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </FormControl>
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <OutlinedInput
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    onChange={handleCategoryChange}
                    value={category}
                  >
                    <MenuItem value={1}>Home & Utilities</MenuItem>
                    <MenuItem value={2}>Transportation</MenuItem>
                    <MenuItem value={3}>Groceries</MenuItem>
                    <MenuItem value={4}>Health</MenuItem>
                    <MenuItem value={5}>Dining</MenuItem>
                    <MenuItem value={6}>Shopping</MenuItem>
                    <MenuItem value={7}>Education</MenuItem>
                    <MenuItem value={8}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="reason"
                label="Reason"
                variant="outlined"
                value={reason}
                onChange={handleReasonChange}
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={{ boxShadow: 0, width: 1 }}
            >
              Record
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default Record;
