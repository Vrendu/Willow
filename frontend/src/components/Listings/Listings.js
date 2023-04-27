import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css"

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    },[]);

    

    return (
        <div>
            <h2>Listings</h2>
            {console.log(listings, "listings component")}
            {listings.length > 0 && listings.map((listing, index) => (
                <div key={listing.id} className="card">
                    <img src={listing.photos[0]} alt={listing.title} />
                    <div className="card-body">
                        <h3>{listing.title}</h3>
                        {/* <p>{listing.description}</p> */}
                        <p>Price: ${listing.price}</p>
                        <p>Square Feet: {listing.square_feet}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Listings;