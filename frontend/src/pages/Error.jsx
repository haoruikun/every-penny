import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found";
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>

            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3, boxShadow: 0 }}
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Go back to dashboard
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Error;
