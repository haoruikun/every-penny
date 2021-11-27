import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://ruikunhao.com/" target="_blank">
          Ruikun Hao
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }