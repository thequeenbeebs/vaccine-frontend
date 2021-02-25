import React from 'react';
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

const DatePicker = () => {
    return (
        <div id="date-container">
            <h3>Choose a Date:</h3>
            <DatePickerCalendar locale={enGB} />
        </div> 
    )
}

export default DatePicker;