import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
// or for Day.js
// import DateAdapter from '@mui/lab/AdapterLuxon';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57CC99',
      dark: '#38a3a5',
      light: '#38a3a5',
      contrastText: 'white',
    },
    secondary: {
      main: '#FFD260',
      contrastText: 'white',
    },
    text: {
      primary: 'rgb(34, 87, 122)',
      secondary: 'rgba(34, 87, 122, 0.8)',
      disabled: 'rgba(34, 87, 122, 0.5)',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
          <App />
        {/* </LocalizationProvider> */}
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
