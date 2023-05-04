import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const CREATE_FAVORITE = "CREATE_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";

//custom selector 

export const getFavorites = (state) => {
    return state.favorites ? Object.values(state.favorites) : [];
}



export const createFavoriteAction = (favorite) => ({
    type: CREATE_FAVORITE,
    payload: favorite,
});

export const deleteFavoriteAction = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId,
});

export const createFavorite = (listingId, userID) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/favorites`, {
            method: "POST",
            body: JSON.stringify({ listing_id: listingId, user_id: userID }),
        });
        if (res.ok) {
            const { favorite } = await res.json();
            //console.log(favorite)
            if (dispatch(createFavoriteAction(favorite))){
                return favorite;
            }
            //return favorite;
        }
    } catch (err) {
        console.error(err);
    }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/favorites/${favoriteId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const favoriteID = await res.json();
            dispatch(deleteFavoriteAction(favoriteID));
        }
    } catch (err) {
        console.error(err);
    }
};


const favoritesReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.favorites ? action.favorites : {};
        case CREATE_FAVORITE:
            //return {...state, ...action.payload}
            newState[action.payload.id] = action.payload;
            return newState;
        console.log(action.payload);
        case DELETE_FAVORITE:
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};

export default favoritesReducer;