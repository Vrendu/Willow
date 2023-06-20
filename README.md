# Willow 

Background: 

Willow was built to be a clone of the real estate website Zillow. 

Functionality & MVPs 

This app will allow users to search for, create, update, destroy and manage likes of house listings in their chosen area. Coming soon is booking tours. 


1. User Auth 
   user can login/demo login, logout, and create account
   
   ![Sign In](https://github.com/Vrendu/Willow/assets/93363393/9d0563cd-3e7c-4095-95c0-d91a0d23f35b)
   
   ![Sign Up](https://github.com/Vrendu/Willow/assets/93363393/8078c6ff-9a76-4a36-a3f9-e6204cd6bc34)
   
   ![Log Out](https://github.com/Vrendu/Willow/assets/93363393/b0b5974f-a8c2-4673-9d84-7862f6e43e87)


3. Listings - CRUD 

   listings can be added, updated, and removed, and most recent listings displayed on spash page.
   
   ![Recent Listings](https://github.com/Vrendu/Willow/assets/93363393/09188f4e-4c11-4420-a5ae-be86be6b07df)
   
   ![Create Listing](https://github.com/Vrendu/Willow/assets/93363393/a9c85006-2a4b-4969-aedd-287cfecf56fe)
   
   ![Update Listing](https://github.com/Vrendu/Willow/assets/93363393/89fad6a3-5519-4e22-a351-6a30209109e9)


3. Favorites - CRUD 
   favorites can be created and destroyed, and viewed in profile
   
   ![Add Favorite](https://github.com/Vrendu/Willow/assets/93363393/ec25a156-c0f1-417a-a077-acb20d2d2104)
   
   ![Remove Favorite](https://github.com/Vrendu/Willow/assets/93363393/5a92f45f-6248-4329-819d-9342caeea737)
   
   ![Favorites](https://github.com/Vrendu/Willow/assets/93363393/a7643c03-f94f-45f2-817e-e3061646ed34)

4. Bookings - CRUD
   tour bookings can be created, viewed in profile, updated, and deleted
   ![Tour Booked](https://github.com/Vrendu/Willow/assets/93363393/f42482dc-cc29-4576-8b38-c8cf82dbaf8f)
      
   ![Bookings](https://github.com/Vrendu/Willow/assets/93363393/c264acba-939d-44f3-948c-c39c06bc6f68)


6. Maps - Google Maps

   App utilizes Google Maps API to display location of listings
   
   ![Google Maps](https://github.com/Vrendu/Willow/assets/93363393/120bae6d-9295-423c-8bc7-01724f7b17f6)


6. Search

   Users can search for listings in their chosen location, filtering by city, state, number of bedrooms/bathrooms, and price
   Coming soon is text based search 
   
   ![Search](https://github.com/Vrendu/Willow/assets/93363393/49fed1c9-e628-4cbf-8879-9bc5cdb840ec)



Technologies and Libraries Used: 

React and Redux 

React library used to organize code into functional components, each with their own unique behavior on render, and their own logic to manage the local state. For example, the listing index below keeps track of state variables (bedrooms, bathrooms, price, state, city) used to filter results by the user's choice. 
```js
function ListingIndex() {
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

export default ListingIndex;

```


Application state was saved into redux store in order to manage state of relevant data, both globally and local state of each functional component. Utilized thunk middleware to connect Ruby on Rails backend to React-Redux frontend.  

``` js
const rootReducer = combineReducers({
  session,
  listings,
  favorites
});

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
```

Reducers for Listings, Session and Favorites handled state changes as necessary: 

``` js
const favoritesReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.favorites ? action.favorites : {};
        case CREATE_FAVORITE:
            //return {...state, ...action.payload}
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_FAVORITE:
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};
``` 

``` js
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
``` 

``` js
const sessionReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    
    default:
      return state;
  }
};
``` 


useEffect hooks used in Listing Show component to render google maps element on page with every render, with marker at given listing location. 

```js
  useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAV4WKaME8NfVDjcMKlZtvSKn3oe-MiyXU`;
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 37.7749, lng: -122.4194 }, // San Francisco as default center
                zoom: 13, // Default zoom level
            });
            setMap(map);
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (map && listing) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
                { address: `${listing.address} ${listing.city} ${listing.state}` },
                (results, status) => {
                    if (status === "OK") {
                        const marker = new window.google.maps.Marker({
                            position: results[0].geometry.location,
                            map,
                        });
                        map.setCenter(marker.getPosition());
                    } else {
                        console.error("Geocode was not successful for the following reason:", status);
                    }
                }
            );
        }
    }, [map, listing]);
  ```

Future Features are to include text based search, and include google maps element on search results page showing location of all listings in a given area.


