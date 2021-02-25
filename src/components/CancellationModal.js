import React from 'react';

const CancellationModal = ({ toggleModal, cancelAppointment, appointment }) => {
    return(
        <div>
            <h3>Are you sure you want to cancel this appointment?</h3>
            <button onClick={() => {
                cancelAppointment(appointment)
                toggleModal()}}>Yes</button>
            <button onClick={toggleModal}>No</button>
        </div>
    )
}

export default CancellationModal;