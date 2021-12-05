import React, { useState, useEffect } from "react";
import {
  Box,
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
  CircularProgress,
} from "@mui/material";
import "../css/App.css";
import "../css/dashboard.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function UpdateForm(props) {
  const [category, setCategory] = useState();
  const [reason, setReason] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://harry-expense-api.herokuapp.com/record/${props.id}`).then(
      (response) => {
        response.json().then((json) => {
          console.log(json);
          setAmount(json.amount);
          setDate(json.purchase_date);
          setReason(json.reason);
          setCategory(json.category_id);
          setIsLoading(false);
        });
      }
    );
  }, [props.setRefresh]);

  const handleSubmit = (event) => {
    event.preventDefault();
    amount ? setAmountError(false) : setAmountError(true);
    category ? setCategoryError(false) : setCategoryError(true);
    reason ? setReasonError(false) : setReasonError(true);

    if (amount && category && reason) {
      fetch("https://harry-expense-api.herokuapp.com/record", {
        method: "PUT",
        body: JSON.stringify({
          username: props.username,
          category,
          reason,
          amount: parseFloat(amount),
          date: dateFormat(date, "yyyy-mm-dd"),
          id: props.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      }).then((response) => {
        response.json().then((json) => {
          console.log(json);
          if (json.command === "UPDATE") {
            toast.success("Record Updated!");
            props.setModalOpen(false);
            props.setRefresh(!props.refresh);
          } else {
            alert("Something went wrong!");
          }
        });
      });
    }
  };
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 1,
          height: 1,
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <form action="#" onSubmit={handleSubmit}>
        <Typography sx={{ mb: 3 }} variant="h4">
          Update Spending
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
          Update
        </Button>
      </form>
    );
  }
}
