import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';

const CancellationModal = ({ toggleModal, cancelAppointment, appointment }) => {
    return(
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to cancel this appointment?"}</DialogTitle>
            <DialogActions>
            <Button onClick={() => {
                cancelAppointment(appointment)
                toggleModal()}}>Yes</Button>
            <Button onClick={toggleModal}>No</Button>
            </DialogActions>
            
        </Dialog>
    )
}

export default CancellationModal;