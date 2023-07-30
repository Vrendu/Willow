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
            <div className="second-search"><SearchBar value={searchQuery} /> </div>
            
            
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