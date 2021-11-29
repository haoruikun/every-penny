import React, {useState} from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';

export default function TopBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleUserClose = () => {
        setAnchorEl(null);
      };
    
      const handleLogout = () => {
        props.setLogin(false);
        props.setLoggedInUser(null);
        setAnchorEl(null);
      }
      

    return (
        <AppBar
            position="fixed"
            sx={{
                ml: 240,
                width: { sm: "calc(100% - 240px)"},
                boxShadow: 0,
            }}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.currentPage}
          </Typography>
          <div>
            <Typography variant="subtitle1" gutterBottom component="span">
              {props.username}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleUserClose}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
}