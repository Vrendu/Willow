import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper';
import 'swiper/css/bundle';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    },[]);

    

    return (
        <div className="container">
            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
            {listings.length > 0 && listings.map((listing, index) => (
                <SwiperSlide>
                <div key={listing.id} className="card">
                    <img src={listing.photos[0]} alt={listing.title} />
                    <div className="card-body">
                        <h3>${Math.floor(listing.price)}</h3>
                        {/* <p>{listing.description}</p> */}
                        <p>{listing.bedrooms} bds | {listing.bathrooms} ba | {listing.square_feet} sqft</p>
                        <p>{listing.address}</p>
                    </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    );
};
export default Listings;