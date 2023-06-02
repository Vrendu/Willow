import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { updateBooking } from "../../store/bookingsActions";
import './UpdateBookingForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UpdateBookingForm({listingId, bookingId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [participants, setParticipants] = useState();
    const [errors, setErrors] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
    //const listingID = listingID;


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const formData = new FormData();
        formData.append("id", parseInt(bookingId));
        formData.append("listing_id", parseInt(listingId));
        formData.append("date", date);
        formData.append("time", time);
        formData.append("participants", parseInt(participants));
        formData.append("user_id", parseInt(currentUser.id));
        return (dispatch(updateBooking(Object.fromEntries(formData.entries())))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                throw res;
            }))
            .then(() => history.go(0));


    };

    return (
        <div className="booking-form">
            <h1>Update Booking Details</h1>
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
                <br></br>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <br></br>
                <div>
                    <label>Participants:</label>
                    <input
                        type="number"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                    />
                </div>
                <button type="submit" className="book-now">Update</button>
                {/* Render error messages */}
                {errors.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
            </form>
        </div>
    );
}

export default UpdateBookingForm;