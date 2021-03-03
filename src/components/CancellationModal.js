import React from 'react';
import Button from '@material-ui/core/Button';

const CancellationModal = ({ toggleModal, cancelAppointment, appointment }) => {
    return(
        <div>
            <h3>Are you sure you want to cancel this appointment?</h3>
            <Button onClick={() => {
                cancelAppointment(appointment)
                toggleModal()}}>Yes</Button>
            <Button onClick={toggleModal}>No</Button>
        </div>
    )
}

export default CancellationModal;