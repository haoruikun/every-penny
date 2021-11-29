import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TopBar from '../components/topBar';
import '../css/App.css';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


function Dashboard(props) {
  const [ expenses, setExpenses ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ date, setDate ] = useState(new Date());


  let totalSpending = 0;
  expenses.forEach((spending) => {
    totalSpending += spending.amount;
  })
  

  useEffect(() => {
    if (props.login) {
      fetch("http://localhost:3002/dashboard_spending", {
            method: "POST",
            body: JSON.stringify({
                username: props.username,
                month: date.getMonth() + 1,
                year: date.getFullYear()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
          setExpenses(json);
          console.log(json);
          setIsLoading(false);
        })
    }
  }, [props.login, date])

    return (
      // <Box
      //     component="main"
      //     sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      // ></Box>
      <>
          <TopBar 
            username={props.username} 
            currentPage={props.currentPage}
            setLogin={props.setLogin}
            setLoggedInUser={props.setLoggedInUser}
            handleDrawerToggle={props.handleDrawerToggle}
          />
        {isLoading &&       
        <div className="loader">
          <CircularProgress />
        </div>}
        <div className="page-wrapper">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box m={2}>
              <DatePicker
                inputFormat="yyyy-MM"
                views={['year', 'month']}
                label="Pick your month"
                minDate={new Date('2012-03-01')}
                maxDate={new Date('2023-06-01')}
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </Box>
          </LocalizationProvider>
          <Typography variant="h4">
            Your Total Spending: ${totalSpending.toFixed(2)} 
          </Typography>
        </div>
      </>
    );

}

export default Dashboard;