import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings, fetchListingsByLocation, getListings } from '../../store/listingsActions';
import "./Listings.css";
import 'swiper/css/bundle';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import axios from 'axios';
import { clearAllListings } from '../../store/listingsActions';
//import firebase from 'firebase/app';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);
    
    useEffect(() => {    
        dispatch(clearAllListings());     
    }, [dispatch]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get("https://ipinfo.io?token=7cf3db293dbbd5");
                const data = response.data;
                const [latitude, longitude] = data.loc.split(',');
                dispatch(fetchListingsByLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude)}));
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };
        fetchLocation();
       
        
    }, [dispatch]);
   

    if (!listings) {
        return null;
    }
    return (
        <> 
        <span className="recently-added-text"> Listings Near You </span>
        <div className="container">
            
            <Swiper
                modules={[Navigation, Mousewheel]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                mousewheel
            >
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
                {listings.map((listing, index) =>
                    listing && (
                        <SwiperSlide key={listing.id}>
                            <Link to={`/listings/${listing.id}`} className="card-link">
                                <div className="card">
                                    <img src={listing.photos[0]} alt={listing.title} />
                                    <div className="card-body">
                                        <h3>${Math.floor(listing.price).toLocaleString()}</h3>
                                        <p>
                                            {listing.bedrooms} bd <span className="lighter">|</span>{" "}
                                            {listing.bathrooms} ba{" "}
                                            <span className="lighter">|</span>{" "}
                                            {listing.square_feet} sqft
                                        </p>
                                        <p>{listing.address}</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                )}
                
            </Swiper>
            
        </div>
        </>
    );
};

export default Listings;