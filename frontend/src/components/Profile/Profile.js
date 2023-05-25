import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFavorites } from "../../store/favoritesActions";
import { fetchBookings, deleteBooking } from "../../store/bookingsActions";
import { fetchUser } from "../../store/session";
import { fetchListings, getListings } from "../../store/listingsActions";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

function Profile() {
    const [activeTab, setActiveTab] = useState("bookings");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const favorites = useSelector(getFavorites);
    const bookings = useSelector((state) => state.bookings);
    const listings = useSelector(getListings);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchBookings());
        dispatch(fetchListings());
        if (currentUser) {
            dispatch(fetchUser(currentUser.id));
        }
    }, [dispatch]);

    const handleDeleteBooking = (bookingId) => {
        setBookingToDelete(bookingId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // Implement your logic to delete the booking with the given bookingId
        // For example, you can dispatch an action to delete the booking from the store
        console.log("Delete booking with id: ", bookingToDelete);
        dispatch(deleteBooking(bookingToDelete));

        // Reset the confirmation state
        setBookingToDelete(null);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        // Reset the confirmation state
        setBookingToDelete(null);
        setShowConfirmation(false);
    };

    function renderBookings() {
        if (Object.keys(bookings).length === 0) {
            return <h1 className="no-bookings-message">No Tours Currently Booked</h1>;
        }
        return (
            <div className="bookings">
                {Object.keys(bookings).map((bookingKey) => {
                    const booking = bookings[bookingKey];
                    if (booking && currentUser && booking.user_id === currentUser.id) {
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
                                        <br />
                                        <p className="delete-booking">
                                            <FaTimes className="delete-icon" onClick={() => handleDeleteBooking(booking.id)} />
                                            <span className="cancel-booking">Cancel Booking</span>
                                        </p>
                                        
                                    </div>
                                </div>
                            );
                        } else {
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
                                    <p className="delete-booking" onClick={() => handleDeleteBooking(booking.id)}>
                                        <FaTimes className="delete-icon" />
                                        <span>Cancel Booking</span>
                                    </p>
                                    
                                </div>
                            );
                        }
                    }
                })}
            </div>
        );
    }

    function renderFavorites() {
        return (
            <div className="favorites">
                {Object.keys(favorites).map((favoriteKey) => {
                    const favorite = favorites[favoriteKey];
                    if (favorite && currentUser && favorite.user_id === currentUser.id) {
                        const listing = listings.find((listing) => listing.id === favorite.listing_id);
                        if (listing && listing.photos.length > 0) {
                            return (
                                <Link to={`/listings/${listing.id}`} className="fcard-link" key={favorite.id}>
                                    <div className="fcard">
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
                            );
                        }
                    }
                })}
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="tab-navigation">
                    <span className="bookings-button" onClick={() => setActiveTab("bookings")}>
                        Upcoming Tours
                    </span>
                    <span className="favorites-button" onClick={() => setActiveTab("favorites")}>
                        Your Favorites
                    </span>
                </div>
                {showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="confirmation-content">
                            <p>Are you sure?</p>
                            <div className="confirmation-buttons">

                                <button onClick={handleConfirmDelete}>Yes</button>
                                <button onClick={handleCancelDelete}>No</button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "bookings" && renderBookings()}
                {activeTab === "favorites" && renderFavorites()}
                
            </div>
        </div>
    );
}

export default Profile;