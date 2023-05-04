import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing, deleteListing } from "../../store/listingsActions";
import { createFavorite, deleteFavorite } from "../../store/favoritesActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ListingShow.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ListingShow = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listing = useSelector((state) => state.listings[id]);
    const currentUser = useSelector((state) => state.session.user);
    let favorites;
    if (currentUser){
        favorites = currentUser.favorites;
    }
    const [currentFavorite, setCurrentFavorite] = useState({})
    const [isFavorite, setIsFavorite] = useState(false);
    //console.log(currentUser.favorited_listings)
    useEffect(() => {
        dispatch(fetchListing(id));
        

    }, [dispatch]);

    useEffect(() => {
        if(currentUser && listing){
            checkIsFavorite(); 
                //console.log(favorites, "these are my favorites");
        }
    }, [listing, currentUser, ])
   
    const checkIsFavorite = () => {
        favorites.forEach((favorite) => {
           if (favorite && (favorite.listing_id === listing.id)){
            setIsFavorite(true);
            setCurrentFavorite(favorite);
            //console.log(currentFavorite)
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
            {/* {checkIsFavorite()} */}
            <div className="photo-list">
                {listing.photos.map((photo) => (
                    <img src={photo} alt={listing.title} class="photo" />
                ))}
            </div>

            <div className="details">
                <div className="top">
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
                    <p>Posted by {listing.poster_id}</p>
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
                    {currentUser && currentUser.id !== listing.poster_id && (
                        <button className="favorite" onClick={toggleFavorite}>
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingShow;