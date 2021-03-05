import React from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import Button from '@material-ui/core/Button';

const AppointmentCard = ({ appointment, toggleModal, setSelectedAppointment, openEditForm }) => {
    const center = appointment.vaccination_center
    const dateTime = utcToZonedTime(new Date(appointment.appointment_time), 'America/Chicago')
    
    return (
        <div className="main-container">
            <h3>{format(dateTime, 'MMMM dd, Y h:mmaaa')}</h3> 
            <h4>{center.name}</h4>
            <p>{center.address}</p>
            <p>{center.city} {center.state} {center.zip_code}</p>
            <p>{center.phone_number}</p>
            <Button variant="outlined"
                onClick={() => {
                setSelectedAppointment(appointment)
                openEditForm()
            }}>Edit</Button>
            <Button variant="outlined"
                onClick={() => {
                toggleModal()
                setSelectedAppointment(appointment)
            }}>Cancel</Button>
        </div>
    )
}

export default AppointmentCard;