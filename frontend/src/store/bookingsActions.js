import csrfFetch from "./csrf";

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

export const fetchDataForSearch = async () => {
    const response = await fetch('/api/bookings');
    const data = await response.json();
    return data;
}


export const fetchBookings = () => {
    return (dispatch) => {
        fetch("/api/bookings")
            .then((response) => response.json())
            .then((bookings) => {
                dispatch(setBookings(bookings));
            });
    };
}

export const fetchBooking = (bookingID) => {
    return (dispatch) => {
        fetch(`/api/bookings/${bookingID}`)
        .then ((response) => response.json())
        .then((booking) => {
            dispatch(receiveBooking(booking))
        })
    }
}

export const createBooking = (booking) => {
    return async (dispatch) => {
        const response = await csrfFetch("/api/bookings", {
            method: "POST",
            body: JSON.stringify(booking)
        });
        const data = await response.json();
        dispatch(postBooking(data));
        return response;
    }
}

export const updateBooking = (booking) => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: "PUT",
            body: JSON.stringify(booking)
        });
        const data = await response.json();
        dispatch(changeBooking(data));
        return response;
    }
}

export const deleteBooking = (bookingID) => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/bookings/${bookingID}`, {
            method: "DELETE"
        });
        dispatch(destroyBooking(bookingID));
        return response;
    }
}

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    const newState = {...state}};
    switch (action.type) {
        case "SET_BOOKINGS":
            return { ...state, ...action.payload };
        case "RECEIVE_BOOKING":
            newState[action.booking.id] = action.booking;
            return newState;
        case "POST_BOOKING":
            newState = Object.assign({}, state);
            newState[action.booking.id] = action.booking;
            return newState;
        case "UPDATE_BOOKING":
           
        case "DELETE_BOOKING":
            newState = Object.assign({}, state);
            delete newState[action.bookingID];
            return newState;
        default:
            return state;
    }
}

export default bookingsReducer;