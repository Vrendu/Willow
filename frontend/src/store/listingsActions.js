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

export const clearAllListings = () => {
    return {type: "CLEAR_ALL_LISTINGS"};
}



export const fetchListings = ( query = '') => {
    return async (dispatch) => {
        try {
            let url = "/api/listings";
            if (query) {
                url += `?q=${encodeURIComponent(query)}`;
            } 

            const response = await csrfFetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch listings.');
            }
            const listings = await response.json();
            
            dispatch(setListings(listings));
        } catch (error) {
            // Handle error if needed
            console.error('Error fetching listings:', error);
        }
    };
};

export const fetchListingsByLocation = (location) => {
    return async (dispatch) => {
        try {
            console.log("location", location)
            let url = '/api/listings?latitude=' + location.latitude + '&longitude=' + location.longitude;
            console.log("url", url)
            const response = await csrfFetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch listings.');
            }
            const listings = await response.json();
            dispatch(setListings(listings));
        } catch (error) {
            // Handle error if needed
            console.error('Error fetching listings:', error);
        }
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

// thunk action to clear all listings from state
export const clearListings = () => async (dispatch) => {   
    dispatch(clearAllListings());
};

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
        case "CLEAR_ALL_LISTINGS":
            return {};
        default:
            return state;
    }
};

export default listingsReducer;

