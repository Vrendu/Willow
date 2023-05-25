import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { createBooking } from "../../store/bookingsActions";
import './BookingForm.css';
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function BookingForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [participants, setParticipants] = useState();
    const [errors, setErrors] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
    const listingID = useParams(); 

    console.log(listingID);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("listing_id", parseInt(listingID.id));
        formData.append("date", date);
        formData.append("time", time);
        formData.append("participants", parseInt(participants));
        formData.append("user_id", parseInt(currentUser.id));
        
        // TODO: Perform validation on the form fields here
        // You can use the `setErrors` function to set any validation errors

        
        dispatch(createBooking(Object.fromEntries(formData.entries())))
        history.go(0);
        //dispatch(createBooking(formData));
    };

    return (
        <div className="booking-form">
            <h1>Booking Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Render form fields and error messages */}
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>Participants:</label>
                    <input
                        type="number"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                    />
                </div>
                <button type="submit">Book Now</button>
                {/* Render error messages */}
                {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </form>
        </div>
    );
}

export default BookingForm;