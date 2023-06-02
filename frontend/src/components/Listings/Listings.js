import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css";
import 'swiper/css/bundle';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    if (!listings) {
        return null;
    }

    const reversedListings = [...listings].reverse();
    const displayedListings = reversedListings.slice(0, 9);

    return (
        <div className="container">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
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
                
                {displayedListings.map((listing, index) =>
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
    );
};

export default Listings;