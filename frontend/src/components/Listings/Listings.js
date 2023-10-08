import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings, getListings } from '../../store/listingsActions';
import "./Listings.css";
import 'swiper/css/bundle';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper";
import axios from 'axios';
import { clearAllListings } from '../../store/listingsActions';
import firebase from 'firebase/app';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);
    const [userLocation, setUserLocation] = useState(null);
    const stateToAbbr = { 
        "Alabama": "AL",
        "Alaska": "AK",
        "American Samoa": "AS",     
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "District Of Columbia": "DC",
        "Federated States Of Micronesia": "FM",
        "Florida": "FL",
        "Georgia": "GA",
        "Guam": "GU",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Marshall Islands": "MH",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Northern Mariana Islands": "MP",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Palau": "PW",
        "Pennsylvania": "PA",
        "Puerto Rico": "PR",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virgin Islands": "VI",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY"
        };
    
    useEffect(() => {    
        dispatch(clearAllListings());     
    }, [dispatch]);

    // want to get user location from IP address, and then fetch listings based on that location
    useEffect(() => {
        // Make an API request to get user location based on IP
        axios.get('https://ipinfo.io/json?token=7cf3db293dbbd5')
            .then((response) => {
                // Extract location data from the response
                const { city, region } = response.data;
                setUserLocation(`${region}`);

                // Use geocoding API to convert user's location to coordinates
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=AIzaSyAV4WKaME8NfVDjcMKlZtvSKn3oe-MiyXU`)
                    .then((geoResponse) => {
                        const { lat, lng } = geoResponse.data.results[0].geometry.location;
                        console.log("user coordinates", lat, lng);

                        // Now, you can use these coordinates to fetch listings within a radius
                        // Dispatch an action or make another API request to fetch listings
                        // within 100 miles of the user's coordinates.
                        const db = firebase.firestore();

                        // Define a reference to your listings collection
                        const listingsRef = db.collection('listings');
                        console.log("listingsRef", listingsRef);

                        // Use GeoFirestore to perform geospatial queries
                        const geoFirestore = new GeoFirestore(listingsRef);

                //         // Define the user's coordinates and radius
                //         const userCoordinates = new firebase.firestore.GeoPoint(lat, lng);
                //         const radius = 100; // 100 miles

                //         // Perform a geospatial query to get listings within the radius
                //         geoFirestore
                //             .query()
                //             .within(userCoordinates, radius, 'location')
                //             .get()
                //             .then((querySnapshot) => {
                //                 // Handle the listings within the radius
                //                 const listingsWithinRadius = [];
                //                 querySnapshot.forEach((doc) => {
                //                     listingsWithinRadius.push(doc.data());
                //                 });

                //                 // Dispatch an action or update the component state with the listings within the radius.
                //             })
                //             .catch((error) => {
                //                 console.error('Error fetching listings within radius:', error);
                //             });
                     })
                    .catch((geoError) => {
                        console.error('Error fetching user coordinates:', geoError);
                    });
                dispatch(fetchListings(stateToAbbr[region]));
            })
            .catch((error) => {
                console.error('Error fetching user location:', error);
            });
    }, [dispatch]);
   

    if (!listings) {
        return null;
    }

    return (
        <> 
        <span className="recently-added-text"> Listings in {userLocation} </span>
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