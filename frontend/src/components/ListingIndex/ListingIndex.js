import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getListings } from '../../store/listingsActions';
import { Link } from "react-router-dom";
import "./ListingIndex.css";

function ListingIndex() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    // useEffect(() => {
    //     dispatch(fetchListings());
    // }, []);

    return (
        <div className="listing-index">
            {listings.map(listing => (
                <Link to={`/listings/${listing.id}`} key={listing.id}>
                    <div className="listing-card">
                        <img src={listing.photos[0]} alt={listing.title} />
                        <div className="listing-details">
                            <h3>${Math.floor(listing.price).toLocaleString()}</h3>
                            <p>{listing.bedrooms} bd <span>|</span> {listing.bathrooms} ba <span>|</span> {listing.square_feet} sqft</p>
                            <p>{listing.address}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ListingIndex;