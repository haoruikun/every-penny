import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TopBar from '../components/topBar';
import '../css/App.css';
import CircularProgress from '@mui/material/CircularProgress';


function Dashboard(props) {
  const [ expenses, setExpenses ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
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
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
          setExpenses(json);
          setIsLoading(false);
        })
    }
  }, [props.login])

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
          <Typography variant="h4">
            Your Total Spending: ${totalSpending} 
          </Typography>
        </div>
      </>
    );

}

export default Dashboard;