import React, { useState, useEffect } from "react";
import {
  Paper,
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
  FormHelperText,
} from "@mui/material";
import TopBar from "../components/topBar";
import "../css/App.css";
import "../css/dashboard.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Record({ ...props }) {
  const [category, setCategory] = useState(null);
  const [reason, setReason] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const navigate = useNavigate();
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
    amount ? setAmountError(false) : setAmountError(true);
    category ? setCategoryError(false) : setCategoryError(true);
    reason ? setReasonError(false) : setReasonError(true);

    if (amount && category && reason) {
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
          if (json.result === "success") {
            toast.success("Spending Recorded!");
            navigate("/all");
          }
        });
      });
    }
  };

  useEffect(() => {
    document.title = "Record";
  });
  return (
    <>
      <TopBar {...props} />
      <div className="page-wrapper">
        <Paper sx={{ maxWidth: 600, m: "auto", p: 10, mt: 5 }}>
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
                <FormControl error={amountError} fullWidth>
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <OutlinedInput
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    type="number"
                  />
                  {amountError && (
                    <FormHelperText>Please enter an amount!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl error={categoryError} fullWidth sx={{ mb: 3 }}>
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
                  {categoryError && (
                    <FormHelperText>Please select a category!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl error={reasonError} fullWidth sx={{ mb: 3 }}>
              <TextField
                id="reason"
                label="Reason"
                variant="outlined"
                value={reason}
                onChange={handleReasonChange}
              />
              {reasonError && (
                <FormHelperText>Please enter a reason!</FormHelperText>
              )}
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
