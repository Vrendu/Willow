import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, getListings } from '../../store/listingsActions';
import { Link } from "react-router-dom";
import { searchListings } from "../../store/listingsActions";
import "./ListingIndex.css";
import SearchBar from "../SearchBar/SearchBar";

function ListingIndex() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);
    const cities = listings.map(listing => listing.city)
        .filter((city, index, self) => self.indexOf(city) === index);
    const states = listings.map(listing => listing.state)
        .filter((state, index, self) => self.indexOf(state) === index);

    const [bedrooms, setBedrooms] = useState(null);
    const [bathrooms, setBathrooms] = useState(null);
    const [price, setPrice] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        
        dispatch(fetchListings())
    }, [dispatch, bedrooms, bathrooms, price, state, city]);


    const filteredListings = listings.filter(listing => {
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
        
        return true;
    });

    if (!listings){
        return null;
    }
    return (
        <div className="index-page">
            <div className="filters">
                {/* <SearchBar /> */}
                <div>
                    {/* <label>Bedrooms:</label> */}
                    <select onChange={(e) => setBedrooms(e.target.value)}>
                        <option value="">Bedrooms</option>
                        <option value="1">1+ bd</option>
                        <option value="2">2+ bd</option>
                        <option value="3">3+ bd</option>
                        <option value="4">4+ bd</option>
                    </select>
                </div>
                <div>
                    {/* <label>Bathrooms:</label> */}
                    <select onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="">Bathrooms</option>
                        <option value="1">1+ ba</option>
                        <option value="2">2+ ba</option>
                        <option value="3">3+ ba</option>
                        <option value="4">4+ ba</option>
                    </select>
                </div>
                <div>
                    {/* <label>Price:</label> */}
                    <select onChange={(e) => setPrice(e.target.value)}>
                        <option value="">Price</option>
                        <option value="500000">$500,000+</option>
                        <option value="1000000">$1,000,000+</option>
                        <option value="2000000">$2,000,000+</option>
                    </select>
                </div>
               
                <div>
                    {/* <label>City:</label> */}
                    <select onChange={(e) => setCity(e.target.value)}>
                        <option value="">City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    {/* <label>State:</label> */}
                    <select onChange={(e) => setState(e.target.value)}>
                        <option value="">State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>
        <div className="index-container">
                            
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