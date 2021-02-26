import React from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'

const AppointmentCard = ({ appointment, toggleModal, setSelectedAppointment, openEditForm }) => {
    const center = appointment.vaccination_center
    const dateTime = utcToZonedTime(new Date(appointment.appointment_time), 'America/Chicago')
    
    return (
        <div>
            <h3>{format(dateTime, 'MMMM dd, Y h:mmaaa')}</h3> 
            <h4>{center.name}</h4>
            <p>{center.address}</p>
            <p>{center.city} {center.state} {center.zip_code}</p>
            <p>{center.phone_number}</p>
            <button onClick={() => {
                setSelectedAppointment(appointment)
                openEditForm()
            }}>Edit</button>
            <button onClick={() => {
                toggleModal()
                setSelectedAppointment(appointment)
            }}>Cancel</button>
        </div>
    )
}

export default AppointmentCard;