import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing, deleteListing } from "../../store/listingsActions";
import { createFavorite, deleteFavorite } from "../../store/favoritesActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ListingShow.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getFavorites } from "../../store/favoritesActions";
import { fetchUser } from "../../store/session";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdCalendar, IoMdAddCircle } from 'react-icons/io';
import BookingFormModal from "../BookingFormModal";
import { fetchBookings } from "../../store/bookingsActions";

const ListingShow = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listing = useSelector((state) => state.listings[id]);
    const currentUser = useSelector((state) => state.session.user);
    const favorites = useSelector(getFavorites)
    const [currentFavorite, setCurrentFavorite] = useState({})
    const [isFavorite, setIsFavorite] = useState(false);
    const [map, setMap] = useState(null);
    const [tourBooked, setTourBooked] = useState(false);
    const bookings = useSelector((state) => state.bookings);
    //console.log(bookings);
    useEffect(() => {
        dispatch(fetchListing(id));
        
        if (currentUser){
            dispatch(fetchUser(currentUser.id))  
        }

    }, [dispatch]);


    useEffect(() => {
        if(currentUser && listing){
            checkIsFavorite(); 
            dispatch(fetchBookings());
        }
    }, [listing, currentUser, ])

    useEffect(() => {
        if (currentUser && listing){
            checkIsBooked();
        }
        
    }, [bookings, currentUser, listing]);

    const checkIsBooked = () => {
        console.log(bookings, "bookings");

        Object.keys(bookings).forEach((bookingKey) => {
            const booking = bookings[bookingKey];
            if (booking && currentUser && booking.listing_id === listing.id && booking.user_id === currentUser.id) {
                setTourBooked(true);
                console.log("found a match");
            }
        });
    }


    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAV4WKaME8NfVDjcMKlZtvSKn3oe-MiyXU`;
        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 37.7749, lng: -122.4194 }, // San Francisco as default center
                zoom: 13, // Default zoom level
            });
            setMap(map);
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (map && listing) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
                { address: `${listing.address} ${listing.city} ${listing.state}` },
                (results, status) => {
                    if (status === "OK") {
                        const marker = new window.google.maps.Marker({
                            position: results[0].geometry.location,
                            map,
                        });
                        map.setCenter(marker.getPosition());
                    } else {
                        console.error("Geocode was not successful for the following reason:", status);
                    }
                }
            );
        }
    }, [map, listing]);
   
    const checkIsFavorite = () => {
        favorites.forEach((favorite) => {
           if (favorite && (favorite.listing_id === listing.id)){
            setIsFavorite(true);
            setCurrentFavorite(favorite);
           }
        })
    }
    
   
    const removeListing = () => {
        dispatch(deleteListing(listing.id));
        alert("Listing deleted")
    };

    const toggleFavorite = () => {
        if (currentUser) {
            if (isFavorite) {
                dispatch(deleteFavorite(currentFavorite.id)).then(() => setIsFavorite(false));
            } else {
                dispatch(createFavorite(listing.id, currentUser.id)).then((response_favorite) => {
                    setCurrentFavorite(response_favorite);
                    setIsFavorite(true);
                })
            }
        }
    };

    if (!listing){
        return null;
    }
    return (
        <div className="show-page">
            <div className="photo-list">
                {listing.photos.map((photo) => (
                    <img src={photo} alt={listing.title} class="photo" />
                ))}
            </div>

            <div className="details">
                <div className="top">
                    {currentUser && currentUser.id !== listing.poster_id && (
                        <div className="header-tools">
                            <div className="favorite" onClick={toggleFavorite}>
                                {isFavorite ? <div> <FaHeart className="heart-filled" /> Saved to Favorites </div>: 
                                    <div> <FaRegHeart className="heart-empty" /> Save to Favorites </div>
                                }  
                                
                            </div> 
                            <div className="booking" > 
                                {tourBooked ? (
                                    <div>
                                        <IoMdCalendar className="tour-icon booked" />
                                        <span className="tour-booked">Tour Booked!</span>
                                    </div>
                                ) : (
                                    <div>
                                        <IoMdAddCircle className="tour-icon" />
                                        <span className="tour-booked"><BookingFormModal/></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <h1 className="show-header">
                        ${Math.floor(listing.price).toLocaleString()}{" "}
                    </h1>
                    <span className="downsized">
                        {listing.bedrooms} bd <span class="lighter">| </span>
                        {listing.bathrooms} ba <span class="lighter">|</span>{" "}
                        {listing.square_feet} sqft
                    </span>{" "}
                    <br></br>
                    <div className="address">
                        {listing.address} {" "}
                        {listing.city} {", "} {listing.state} {" "} {listing.zip_code}
                    </div>

                    <p>{listing.description}</p>
                    <br></br>
                    {currentUser?.id === listing.poster_id && (
                        <p className="updateanddestroy">
                            <Link to={{ pathname: "/updatelisting", state: { listing } }}>
                                <button className="update">Update Listing</button>
                            </Link>
                            <Link to="/">
                                <button className="delete" onClick={() => removeListing()}>
                                    Delete Listing
                                </button>
                            </Link>
                        </p>
                    )}
                    
                    <div id="map"></div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ListingShow;