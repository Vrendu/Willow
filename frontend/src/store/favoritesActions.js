import csrfFetch from "./csrf";

export const CREATE_FAVORITE = "CREATE_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";

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

