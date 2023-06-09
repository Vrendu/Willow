import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing, deleteListing } from "../../store/listingsActions";
import { createFavorite, deleteFavorite } from "../../store/favoritesActions";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ListingShow.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getFavorites } from "../../store/favoritesActions";
import { fetchUser } from "../../store/session";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdCalendar, IoMdAddCircle } from 'react-icons/io';
import BookingFormModal from "../BookingFormModal";
import { fetchBookings } from "../../store/bookingsActions";
import { GoogleMap, Marker } from '@react-google-maps/api';

const ListingShow = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const listing = useSelector((state) => state.listings[id]);
    const currentUser = useSelector((state) => state.session.user);
    const favorites = useSelector(getFavorites)
    const [currentFavorite, setCurrentFavorite] = useState({})
    const [isFavorite, setIsFavorite] = useState(false);
    const [map, setMap] = useState(null);
    const [tourBooked, setTourBooked] = useState(false);
    const bookings = useSelector((state) => state.bookings);
   
    useEffect(() => {
        dispatch(fetchListing(id));
        
        if (currentUser){
            dispatch(fetchUser(currentUser.id)) 
             
        }

    }, [dispatch]);


    useEffect(() => {
        if(currentUser && listing){
            checkIsFavorite(); 
            dispatch(fetchBookings(currentUser.id));
        }
    }, [listing, currentUser, ])

    useEffect(() => {
        if (currentUser && listing){
            checkIsBooked();
        }
        
    }, [bookings, currentUser, listing]);

    const checkIsBooked = () => {
        Object.keys(bookings).forEach((bookingKey) => {
            const booking = bookings[bookingKey];
            if (booking && currentUser && booking.listing_id === listing.id && booking.user_id === currentUser.id && new Date(booking.date) >= new Date()) {
                setTourBooked(true);
            }
        });
    }


    useEffect(() => {
        if (listing) {
            const script = document.createElement('script');
            //const script = document.getElementById('mapsscript');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAV4WKaME8NfVDjcMKlZtvSKn3oe-MiyXU`;
            script.addEventListener('load', () => {
                setMap(
                    new window.google.maps.Map(document.getElementById('map'), {
                        center: { lat: listing.lat, lng: listing.lng },
                        zoom: 13,
                    })
                );
            });
            document.body.appendChild(script);
        }
    }, [listing, currentUser]);

    useEffect(() => {
        if (map && listing) {
            const geocoder = new window.google.maps.Geocoder();
            
            geocoder.geocode(
                { address: `${listing.address} ${listing.city} ${listing.state}` },
                (results, status) => {
                    if (status === "OK" && results) {
                        const marker = new window.google.maps.Marker({
                            position: results[0].geometry.location,
                            map,
                        });
                        //console.log(results[0].geometry.location)
                        map.setCenter(marker.getPosition());
                    } else {
                        console.error("Geocode was not successful for the following reason:", status);
                    }
                }
            );
        }
    }, [map, ]);
   
    const checkIsFavorite = () => {
        favorites.forEach((favorite) => {
           if (favorite && (favorite.listing_id === listing.id)){
            setIsFavorite(true);
            setCurrentFavorite(favorite);
           }
        })
    }
    
   
    const removeListing = () => {
       setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteListing(listing.id))
        setShowConfirmation(false)
        history.push("/");
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
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
        return (
            <div className="no-listing-message">
                <h2>Listing not found/deleted</h2>
                <Link to="/">Click to redirect to home page</Link>
            </div>
        );
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
                                {isFavorite ? <div className="hearttext" >  <FaHeart className="heart-filled" /> Saved to Favorites </div>: 
                                    <div className="hearttext"> <FaRegHeart className="heart-empty" /> Save to Favorites </div>
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
                    <div className="laddress">
                        {listing.address} {" "}
                        {listing.city} {", "} {listing.state} {" "} {listing.zip_code}
                    </div>

                    <p className="listing-description">{listing.description}</p>
                    <br></br>
                    {currentUser?.id === listing.poster_id && (
                        <p className="updateanddestroy">
                            <Link to={{ pathname: "/updatelisting", state: { listing } }}>
                                <button className="update">Update Listing</button>
                            </Link>
                            <button className="delete" onClick={() => removeListing()}>
                                Delete Listing
                            </button>
                        </p>
                    )}
                    {showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="confirmation-content">
                            <p>Confirm Listing Delete?</p>
                            <div className="confirmation-buttons">

                                <button onClick={handleConfirmDelete}>Yes</button>
                                <button onClick={handleCancelDelete}>No</button>
                            </div>
                        </div>
                    </div>)}
                    <div id="map">
                        <GoogleMap
                            mapContainerStyle={{ height: '400px', width: '100%' }}
                            center={{ lat: listing.lat, lng: listing.lng }}
                            zoom={13}
                        >
                            {map && (
                                <Marker
                                    position={{ lat: listing.lat, lng: listing.lng }}
                                    map={map}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ListingShow;