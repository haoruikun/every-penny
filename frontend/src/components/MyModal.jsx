import React from "react";
import ReactDom from "react-dom";
import { Typography, Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function MyModal(props) {
  const handleOpen = () => props.setModalOpen(true);
  const handleClose = () => props.setModalOpen(false);
  const modalContainer = document.getElementById("modal-container");
  return ReactDom.createPortal(
    <Modal open={props.modalOpen} onClose={handleClose}>
      <Box sx={style}>
        {props.title && (
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            {props.title}
          </Typography>
        )}
        {props.body}
      </Box>
    </Modal>,
    modalContainer
  );
}
