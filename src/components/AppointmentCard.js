import React from 'react';

const AppointmentCard = ({ appointment, toggleModal, setSelectedAppointment }) => {
    const center = appointment.vaccination_center
    
    return (
        <div>
            <h3>{appointment.appointment_time}</h3>
            <h4>{center.name}</h4>
            <p>{center.address}</p>
            <p>{center.city} {center.state} {center.zip_code}</p>
            <p>{center.phone_number}</p>
            <button>Edit</button>
            <button onClick={() => {
                toggleModal()
                setSelectedAppointment(appointment)
            }}>Cancel</button>
        </div>
    )
}

export default AppointmentCard;