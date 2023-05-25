import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getFavorites } from "../../store/favoritesActions";
import { fetchBookings } from "../../store/bookingsActions";
import { fetchUser } from "../../store/session";
import { fetchListings, getListings } from "../../store/listingsActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper"; 
import { FaCalendarAlt, FaClock } from "react-icons/fa";

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    if (!currentUser) {
        history.push("/");
    }
    const favorites = useSelector(getFavorites);
    const bookings = useSelector((state) => state.bookings);
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchBookings());
        dispatch(fetchListings());
        if (currentUser) {
            dispatch(fetchUser(currentUser.id))
        }
    }, [dispatch]);

    if (!currentUser) {
        return null;
    }
    return (
        <div>
            <div className="profile-container">

            
                <h2>{currentUser.username}'s Profile</h2>
                
                <h2>Upcoming Tours</h2>
                {Object.keys(bookings).map((bookingKey) => {
                    const booking = bookings[bookingKey];
                    if (booking && currentUser && booking.user_id === currentUser.id) {
                        // Find the corresponding listing for the booking
                        const listing = listings.find((listing) => listing.id === booking.listing_id);
                        if (listing && listing.photos.length > 0) {
                            const formattedTime = new Date(booking.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                            return (
                                <div className="upcoming-tour" key={booking.id}>
                                    <img src={listing.photos[0]} alt={listing.title} />
                                    <div className="tour-details">
                                        <h3>{listing.title}</h3>
                                        <p>
                                            <FaCalendarAlt className="tour-icon" /> {booking.date}
                                        </p>
                                        <p>
                                            <FaClock className="tour-icon" /> {formattedTime}
                                        </p>
                                        <br />
                                        <p>{listing.address}, {listing.city}, {listing.state} {listing.zip_code}</p>
                                    </div>
                                </div>
                            );
                        } else {
                            // Handle the case when the listing or photos are not available
                            return (
                                <div className="upcoming-tour" key={booking.id}>
                                    <div className="tour-details">
                                        <h3>{booking.listing_id}</h3>
                                        <p>
                                            <FaCalendarAlt className="tour-icon" /> {booking.date}
                                        </p>
                                        <p>
                                            <FaClock className="tour-icon" /> {booking.time}
                                        </p>
                                        <p>Listing details not available</p>
                                    </div>
                                </div>
                            );
                        }
                    }
                })}
            </div>

            <h2 className="favorites-header">Your Favorites</h2>
            <div className="container">
                <Swiper
                    modules={[Navigation, Mousewheel]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    mousewheel
                >
            {Object.keys(favorites).map((favoriteKey) => {
                const favorite = favorites[favoriteKey];
                if (favorite && currentUser && favorite.user_id === currentUser.id) {
                    return (
                        <div>
                            {listings.map((listing) => {
                                if (listing && favorite.listing_id === listing.id) {
                                    return (
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
                                }
                            }
                            )}
                        </div>
                    )
                }
            }
            )}
            </Swiper>
        </div>
            
        </div>
    )

}

export default Profile;