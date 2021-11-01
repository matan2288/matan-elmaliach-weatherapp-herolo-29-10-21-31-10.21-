import React from 'react'
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";


const style = {
   textAlign: "center",
   position: "absolute",
   top: "50%",
   left: "50%",
   color: "white",
   transform: "translate(-50%, -50%)",
   width: 350,
   bgcolor: "rgba(72, 72, 72, 0.517)",
   border: "none",
   borderRadius: "10px",
   boxShadow: 24,
   p: 3,
 };
 


export const ModalComponent = (props) => {
   return (
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Adding To Favorites Error
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            The location is already reserved on favorites!
            <Button
              variant="text"
              id="modal-btn"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              Back To Main Screen
            </Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
   )
}
