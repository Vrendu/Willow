import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearListings, fetchListings, getListings } from '../../store/listingsActions';
import { Link } from "react-router-dom";
import { searchListings } from "../../store/listingsActions";
import "./ListingIndex.css";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function ListingIndex() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';

    console.log("listings are", listings)
    useEffect(() => {
        // Fetch listings based on the search query
        dispatch(clearListings());
        dispatch(fetchListings(searchQuery));
        
        console.log("search query", searchQuery);
    }, [dispatch, searchQuery, ]);

  
    
    if (!listings){
        return null;
    }
    return (
        <div className="index-page">
            <div className="filters">
                <div className="second-search"><SearchBar placeholder={searchQuery} /> </div>
                {/* filters for bedrooms, bathrooms, price */}
                <div className="filter-container">
                    <div className="filter">
                        <label>Bedrooms</label>
                        <select>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                        </select>
                        <label>Bathrooms</label>
                        <select>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                        </select>
                        <label>Price</label>
                        <select>
                            <option value="100000">$100,000+</option>
                            <option value="200000">$200,000+</option>
                            <option value="300000">$300,000+</option>
                            <option value="400000">$400,000+</option>
                            <option value="500000">$500,000+</option>
                            <option value="600000">$600,000+</option>
                            <option value="700000">$700,000+</option>
                            <option value="800000">$800,000+</option>
                            <option value="900000">$900,000+</option>
                            <option value="1000000">$1,000,000+</option>
                        </select>

                    </div>
                </div>
            </div>
            
        <div className="index-container">
                            
                {Array.from(listings).map(listing => (
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