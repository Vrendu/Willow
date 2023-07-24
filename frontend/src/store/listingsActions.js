import csrfFetch from "./csrf";


export const setListings = (listings) => {
    return { type: "SET_LISTINGS", payload: listings };
};

export const receiveListing = (listing) => {
    return {type: "RECEIVE_LISTING", listing};
}

export const postListing = (listing) => {
    return {type: "POST_LISTING", listing};
}

export const changeListing = (listing) => {
    return {type: "UPDATE_LISTING", listing};
}

export const destroyListing = (listingID) => {
    return {type: "DELETE_LISTING", listingID};
}

export const fetchDataForSearch = async () => {
    const response = await fetch('/api/listings');
    const data = await response.json();
    return data;
}

export const fetchListings = () => {
    return (dispatch) => {
        csrfFetch("/api/listings")
            .then((response) => response.json())
            .then((listings) => {
                dispatch(setListings(listings));
            });
    };
};

export const fetchListing = (listingID) => {
    return (dispatch) => {
        fetch(`/api/listings/${listingID}`)
        .then ((response) => response.json())
        .then((listing) => {
            dispatch(receiveListing(listing))
        })
    }
}

export const createListing = (listing) => {
    return (dispatch) => {
        fetch("api/listings", {
            method: "POST",
            headers: {
                "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
            },
            body: listing,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((newListing) => {
                // Dispatch the action only if there is no 422 error
                if (!newListing.errors) {
                    dispatch(postListing(newListing));
                }
            });
    };
};


export const deleteListing = (listingID) => {
    return (dispatch) => {
    
        csrfFetch(`/api/listings/${listingID}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((listingID) => {
                dispatch(destroyListing(listingID))
            })
    }
}



export const updateListing = (listing) => {
    return (dispatch) => {
        fetch(`api/listings/${listing.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
            },
            body: JSON.stringify(listing)
        })
        .then((response) => response.json())
        .then((listing) => {
            dispatch(changeListing(listing))
        })
    }
}

export const getListings = (state) => {
   return state.listings ? Object.values(state.listings) : [] 
}

export const createReview = (review) => {
    return async (dispatch) => {
        try {
            const response = await csrfFetch("/api/reviews", {
                method: "POST",
                body: JSON.stringify(review),
            });
            return response;
        } catch (err) {
            let errors = [];
            if (err.response && err.response.data && err.response.data.errors) {
                errors = err.response.data.errors;
            } else {
                errors = [err.message];
            }
            throw err;
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
            //dispatch(changeReview(data));
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
            //dispatch(destroyReview(data));
            return data;
        } catch (err) {
            console.error(err);
        }
    };
}



const listingsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case "SET_LISTINGS":
           return { ...state,  ...action.payload };
        case "RECEIVE_LISTING":
            newState[action.listing.id] = action.listing
            return newState;
        case "POST_LISTING":
            return {...state, [action.listing.id]: action.listing};
        case "UPDATE_LISTING":
            return {...state, [action.listing.id]: action.listing};
        case "DELETE_LISTING":
            delete newState[action.listingID];
            return newState;
        default:
            return state;
    }
};

export default listingsReducer;

