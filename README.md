# Willow 

Background: 

Willow was built to be a clone of the real estate website Zillow. 

Functionality & MVPs 

This app will allow users to search for, create, update, destroy and manage likes of house listings in their chosen area. Coming soon is booking tours. 


1. User Auth 
user can log in, log out, and create account
user can demo login

<img width="500" src="https://user-images.githubusercontent.com/93363393/236381580-9ba7f1b5-552f-4d62-840a-15526310bf37.png">

![sign up](https://user-images.githubusercontent.com/93363393/236381697-63af120f-7685-4d50-8acb-07bcc2adb2a7.png)

![log out](https://user-images.githubusercontent.com/93363393/236381710-ef8dc139-df5b-4c1e-b568-1b8b858e73ac.png)


2. Listings - CRUD 

Displays listings of homes
listings can be added, updated, and removed

![listings](https://user-images.githubusercontent.com/93363393/236381939-6c2307c6-207b-47f6-99d5-7eb19c2afa40.png)

![create](https://user-images.githubusercontent.com/93363393/236381955-7946f148-aea8-408f-a463-a5709754cc01.png)
![update](https://user-images.githubusercontent.com/93363393/236381960-3ad8d717-b6b5-46ab-9c7c-4ddcf03b9182.png)


3. Favorites - CRUD 
favorites can be created and destroyed

![addfav](https://user-images.githubusercontent.com/93363393/236382024-757a09ba-f8cf-4e4c-986f-d46888ebcd27.png)
![removefav](https://user-images.githubusercontent.com/93363393/236382025-f9170611-6642-4a71-93d6-79437f4acd40.png)


4. Maps - Google Maps

App utilizes Google Maps API to display location of listings

![googlemaps](https://user-images.githubusercontent.com/93363393/236382099-93428ae0-8543-4c34-9b8b-bd3cdc95d29b.png)


5. Search

Users can search for listings in their chosen location, filtering by city, state, number of bedrooms/bathrooms, and price
Coming soon is text based search 

![search](https://user-images.githubusercontent.com/93363393/236382153-e2e67ee3-93a0-4443-82fe-0344408b895a.png)


Technologies and Libraries Used: 

React and Redux 

React library used to organize code into functional components, each with their own unique behavior on render, and their own logic to manage the local state.

For example, Listings Index was designed as shown here: 

`function ListingIndex() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    const [bedrooms, setBedrooms] = useState(null);
    const [bathrooms, setBathrooms] = useState(null);
    const [price, setPrice] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        // dispatch action to fetch listings with selected filters
        //dispatch(fetchListings({ bedrooms, bathrooms, price, state, city }));
        dispatch(fetchListings())
    }, [dispatch, bedrooms, bathrooms, price, state, city]);


    const filteredListings = listings.filter(listing => {
        // Check if the listing matches the selected filter options
        if (bedrooms && listing.bedrooms <= bedrooms) {
            return false;
        }
        if (bathrooms && listing.bathrooms <= bathrooms) {
            return false;
        }
        if (price && listing.price <= parseInt(price)) {
            return false;
        }
        if (city && listing.city !== city) {
            return false;
        }
        if (state && listing.state !== state) {
            return false;
        }
        // If all filter options are null or match the listing, include the listing
        return true;
    });

    if (!listings){
        return null;
    }
    return (
        <div>
            <div className="filters">
                <div>
                    <label>Bedrooms:</label>
                    <select onChange={(e) => setBedrooms(e.target.value)}>
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div>
                    <label>Bathrooms:</label>
                    <select onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div>
                    <label>Price:</label>
                    <select onChange={(e) => setPrice(e.target.value)}>
                        <option value="">Any</option>
                        <option value="500000">$500,000+</option>
                        <option value="1000000">$1,000,000+</option>
                        <option value="2000000">$2,000,000+</option>
                    </select>
                </div>
               
                <div>
                    <label>City:</label>
                    <select onChange={(e) => setCity(e.target.value)}>
                        <option value="">Any</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="New York">New York City</option>
                        <option value="Houston">Houston</option>
                        <option value="Miami">Miami</option>
                    </select>
                </div>
                <div>
                    <label>State:</label>
                    <select onChange={(e) => setState(e.target.value)}>
                        <option value="">Any</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                    </select>
                </div>
            </div>
        <div className="container">

                {filteredListings.map(listing => (
                    <Link to={`/listings/${listing.id}`} key={listing.id} className="card-link">
                        <div className="card">
                            <img src={listing.photos[0]} alt={listing.title} />
                            <div className="card-body">
                                <h3>${Math.floor(listing.price).toLocaleString()}</h3>
                                <p>{listing.bedrooms} bd <span>|</span> {listing.bathrooms} ba <span>|</span> {listing.square_feet} sqft</p>
                                <p>{listing.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    </div>
    );
}

export default ListingIndex;`

Application state was saved into redux store in order to manage state of relevant data, both globally and local state of each functional component 

'const rootReducer = combineReducers({
  session,
  listings,
  favorites
});

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;'

Reducers for Listings, Session and Favorites handled state changes as necessary: 

'const favoritesReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.favorites ? action.favorites : {};
        case CREATE_FAVORITE:
            //return {...state, ...action.payload}
            newState[action.payload.id] = action.payload;
            return newState;
        //console.log(action.payload);
        case DELETE_FAVORITE:
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};' 

'const listingsReducer = (state = {}, action) => {
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
};' 

'const sessionReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    
    default:
      return state;
  }
};' 







