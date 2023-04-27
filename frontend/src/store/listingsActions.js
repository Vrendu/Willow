
export const setListings = (listings) => {
    return { type: "SET_LISTINGS", payload: listings };
};

export const receiveListing = (listing) => {
    return {type: "RECEIVE_LISTING", listing};
}

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

export const getListings = (state) => {
   return state.listings ? Object.values(state.listings) : [] 
}


const listingsReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_LISTINGS":
           return { ...state,  ...action.payload };
        case "RECEIVE_LISTING":
            const newState = {...state}
            newState[action.listing.id] = action.listing
            return newState;
        default:
            return state;
    }
};

export default listingsReducer;