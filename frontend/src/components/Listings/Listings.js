import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css";
import 'swiper/css/bundle';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import axios from 'axios';

const Listings = () => {
    const dispatch = useDispatch();
     const listings = useSelector(getListings);
    // const [userLocation, setUserLocation] = useState(null);
    // const [userCityState, setUserCityState] = useState('');
    // console.log("user location", userLocation);
    // //console.log("user city and state", userCityState);
    useEffect(() => {
        
        dispatch(fetchListings("CA"));
       
    }, [dispatch]);

    // useEffect(() => {
    //     // Function to fetch user's location and set it to state
    //     const getUserLocation = () => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 async (position) => {
    //                     const { latitude, longitude } = position.coords;
    //                     setUserLocation({ latitude, longitude });

    //                     // Get the zip code using reverse geocoding
    //                     try {
    //                         const apiKey = 'AIzaSyAV4WKaME8NfVDjcMKlZtvSKn3oe-MiyXU';
    //                         const response = await axios.get(
    //                             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    //                         );
    //                         console.log("response", response);
    //                         if (response.data && response.data.results && response.data.results.length > 0) {
    //                             const addressComponents = response.data.results[0].address_components;
    //                             let city = '';
    //                             let state = '';

    //                             addressComponents.forEach((component) => {
    //                                 if (component.types.includes('locality')) {
    //                                     city = component.long_name;
    //                                 } else if (component.types.includes('administrative_area_level_1')) {
    //                                     state = component.long_name;
    //                                 }
    //                             });

    //                             // Update the state with city and state
    //                             setUserCityState(`${city}, ${state}`);
    //                             console.log("user city and state", userCityState);
    //                         }
    //                     } catch (error) {
    //                         console.error('Error in reverse geocoding:', error.message);
    //                     }
    //                 },
    //                 (error) => {
    //                     console.error('Error getting user location:', error.message);
    //                 }
    //             );
    //         } else {
    //             console.error('Geolocation is not available in this browser.');
    //         }
    //     };
    //     getUserLocation();
    // }, []);
   
   

    if (!listings) {
        return null;
    }

    return (
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
    );
};

export default Listings;