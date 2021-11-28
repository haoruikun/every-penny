import logo from './assets/logo.svg';
import './css/App.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from './pages/login';
import React, { useState, useEffect } from 'react';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarIcon from '@mui/icons-material/Star';
import AddCardIcon from '@mui/icons-material/AddCard';

const drawerWidth = 240;

export default function App() {
  const [ login, setLogin ] = useState(false);
  const [ signup, setSignUp ] = useState(false);
  const [ loggedInUser, setLoggedInUser ] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const [ currentPage, setCurrentPage ] = useState("Dashboard")
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Dashboard");
    } else if (location.pathname === "/all") {
      setCurrentPage("All Expenses");
    } else if (location.pathname === "/bookmark") {
      setCurrentPage("Bookmark");
    } else if (location.pathname === "/record") {
      setCurrentPage("Record Expense");
    } 
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button selected={location.pathname === "/"} onClick={() => {navigate("/")}}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button selected={location.pathname === "/all"} onClick={() => {navigate("/all")}}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary={"All Expenses"} />
        </ListItem>
        <ListItem button selected={location.pathname === "/bookmark"} onClick={() => {navigate("/bookmark")}}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={"Bookmark"} />
        </ListItem>
        <ListItem button selected={location.pathname === "/record"} onClick={() => {navigate("/record")}}>
          <ListItemIcon>
            <AddCardIcon />
          </ListItemIcon>
          <ListItemText primary={"Record Expense"} />
        </ListItem>
      </List>
    </div>
  );


  if (signup) {
    return <Signup 
      setLogin={setLogin} 
      setSignUp={setSignUp} 
      setLoggedInUser={setLoggedInUser}/>
  } else if (login) {
    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {currentPage}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Dashboard />
        {/* <Routes>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Routes> */}
      </Box>
    );
  } else {
    return <Login 
      setLogin={setLogin} 
      setSignUp={setSignUp} 
      setLoggedInUser={setLoggedInUser}/>
  }
}
