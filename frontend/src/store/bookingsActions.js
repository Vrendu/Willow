import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

// export const getBookings = (state) => {
//     return state.bookings ? Object.values(state.bookings) : [];
// }



export const setBookings = (bookings) => {
    return { type: "SET_BOOKINGS", payload: bookings };
}

export const receiveBooking = (booking) => {
    return {type: "RECEIVE_BOOKING", booking};
}

export const postBooking = (booking) => {
    return {type: "POST_BOOKING", booking};
}

export const changeBooking = (booking) => {
    return {type: "UPDATE_BOOKING", booking};
}

export const destroyBooking = (bookingID) => {
    return {type: "DELETE_BOOKING", bookingID};
}


export const fetchBookings = (userID) => {
    return (dispatch) => {
        csrfFetch(`/api/bookings?user_id=${userID}`)
            .then((response) => response.json())
            .then((bookings) => {
                dispatch(setBookings(bookings));
                
            });
    };
};

export const fetchBooking = (bookingID) => {
    return (dispatch) => {
        csrfFetch(`/api/bookings/${bookingID}`)
        .then ((response) => response.json())
        .then((booking) => {
            dispatch(receiveBooking(booking))
        })
    }
}


export const createBooking = (booking) => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch("/api/bookings", {
                method: "POST",
                body: JSON.stringify(booking),
            });
            return response;
        } catch (error) {
            let errors = [];

            if (error.response && error.response.data && error.response.data.errors) {
                errors = error.response.data.errors;
            } else {
                errors = [error.message];
            }

            throw error; // Rethrow the error to be caught by the caller
        }
    };
};

export const updateBooking = (booking) => {
    return async (dispatch) => {
        try{
            const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: "PUT",
            body: JSON.stringify(booking)
            });
            const data = await response.json();
            return response;
        }
        catch (error) {
            let errors = [];
            if (error.response && error.response.data && error.response.data.errors) {
                errors = error.response.data.errors;
            } else {
                errors = [error.message];
            }
            throw error; // Rethrow the error to be caught by the caller
        }       
    }
}

export const deleteBooking = (bookingID) => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/bookings/${bookingID}`, {
            method: "DELETE"
        });
        const data = await response.json();
        dispatch(destroyBooking(data));
        return response;
    }
}

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case "SET_BOOKINGS":
            return { ...state, ...action.payload };
        case "RECEIVE_BOOKING":
            newState[action.booking.id] = action.booking;
            return newState;
        case "POST_BOOKING":
            newState[action.booking.id] = action.booking;
            return newState;
        case "UPDATE_BOOKING":
           
        case "DELETE_BOOKING":
            delete newState[action.bookingID];
            return newState;
        default:
            return state;
    }
} 

export default bookingsReducer;
