import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, getListings } from '../../store/listingsActions';
import { Link } from "react-router-dom";
import { searchListings } from "../../store/listingsActions";
import "./ListingIndex.css";

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
    }, [dispatch, bedrooms, bathrooms, price, state, city]);

    return (
        <div>
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
                    <option value="50000">$50,000+</option>
                    <option value="100000">$100,000+</option>
                    <option value="150000">$150,000+</option>
                    <option value="200000">$200,000+</option>
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
        
        <div className="container">
            {listings.map(listing => (
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