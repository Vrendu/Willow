import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const postReview = (review) => {
    return {type: "POST_REVIEW", review};
}

export const changeReview = (review) => {
    return {type: "UPDATE_REVIEW", review};
}

export const destroyReview = (reviewID) => {
    return {type: "DELETE_REVIEW", reviewID};
}


export const createReview = (review) => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch("/api/reviews", {
                method: "POST",
                body: JSON.stringify(review),
            });
            const data = await response.json();
            dispatch(postReview(data));
            return data;
        } catch (err) {
            console.error(err);
        }
    };
}

export const updateReview = (review) => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/reviews/${review.id}`, {
                method: "PUT",
                body: JSON.stringify(review),
            });
            const data = await response.json();
            dispatch(changeReview(data));
            return data;
        } catch (err) {
            console.error(err);
        }
    };
}

export const deleteReview = (reviewID) => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/reviews/${reviewID}`, {
                method: "DELETE",
            });
            const data = await response.json();
            dispatch(destroyReview(data));
            return data;
        } catch (err) {
            console.error(err);
        }
    };
}

// const initialState = {};

// const reviewsReducer = (state = initialState, action) => {
//     const newState = { ...state }
//     switch (action.type) {
//         case "SET_REVIEWS":
//             return { ...state, ...action.payload };
//         case "RECEIVE_REVIEW":
//             newState[action.review.id] = action.review
//             return newState;
//         case "POST_REVIEW":
//             return {...state, [action.review.id]: action.review};
//         case "UPDATE_REVIEW":
//             return {...state, [action.review.id]: action.review};
//         case "DELETE_REVIEW":
//             delete newState[action.reviewID];
//             return newState;
//         default:
//             return state;
//     }
// }

// export default reviewsReducer;