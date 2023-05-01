import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper';
import 'swiper/css/bundle';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    },[dispatch]);
    
    console.log(listings)
    if (!listings){
        return null;
    }
    return (
        <div className="container">
            <Swiper
                modules={[Navigation, Mousewheel]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                mousewheel
            >
            {listings.length > 0 && listings.map((listing, index) => (
               listing && <SwiperSlide>
                    <Link to={`/listings/${listing.id}`} className="card-link" >
                    <div key={listing.id} className="card">
                        <img src={listing.photos[0]} alt={listing.title} />
                        <div className="card-body">
                            <h3>${Math.floor(listing.price).toLocaleString()}</h3>
                                <p>{listing.bedrooms} bd <span class="lighter">|</span> {listing.bathrooms} ba <span class="lighter">|</span> {listing.square_feet} sqft</p>
                            <p>{listing.address}</p>
                        </div>
                    </div>
                    </Link>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    );
};
export default Listings;