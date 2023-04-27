
export const setListings = (listings) => {
    return { type: "SET_LISTINGS", payload: listings };
};

export const fetchListings = () => {
    return (dispatch) => {
        fetch("/api/listings")
            .then((response) => response.json())
            .then((listings) => {
                dispatch(setListings(listings));
            });
    };
};

export const getListings = (state) => {
   return state.listings ? Object.values(state.listings) : [] 
}


const listingsReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_LISTINGS":
           return { ...state,  ...action.payload };
          //return action.payload;
        default:
            return state;
    }
};

export default listingsReducer;