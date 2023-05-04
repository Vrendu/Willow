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

// export const searchListings = (query) => {
//     return (dispatch) => {
//         fetch("/api/listings?query=")
//             .then((response) => response.json())
//             .then((listings) => {
//                 dispatch(setListings(listings));
//             });
//     };
// }

export const fetchListings = () => {
    return (dispatch) => {
        fetch("/api/listings")
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
            .then((response) => response.json())
            .then((newListing) => {
                dispatch(postListing(newListing));
            })
            //.catch((error) => //console.log(error));
    };
}

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