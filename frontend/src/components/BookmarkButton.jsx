import * as React from "react";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import { CircularProgress, Box } from "@mui/material";

export default function BookmarkButton({ bookmarked, id }) {
  const [active, toggle] = useState(bookmarked);
  const [loading, setLoading] = useState(false);

  function handleToggle() {
    setLoading(true);
    fetch(`http://localhost:3002/toggle_bookmark/${id}`).then((response) => {
      if (response.status === 200) {
        toggle(!active);
        setLoading(false);
      }
    });
  }
  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress
          size={20}
          sx={{ width: 5, height: 5 }}
          color="warning"
        />
      </Box>
    );
  } else {
    return (
      <IconButton aria-label="bookmark" color="warning" onClick={handleToggle}>
        {active ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    );
  }
}
