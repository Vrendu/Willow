import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing } from "../../store/listingsActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ListingShow.css";

const ListingShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const listing = useSelector((state) => state.listings[id])
    useEffect(() => {
       dispatch(fetchListing(id));
    }, [dispatch]);

    

    return (
        <div className = "show-page">
            <div className="photo-list">
                    {listing.photos.map((photo) => <img src={photo} alt={listing.title} class="photo" />)}
            </div>
            
            <div className="details">

                <div className="top">
                    <h1 className="show-header">${Math.floor(listing.price).toLocaleString()} </h1>
                    <span className="downsized"> {listing.bedrooms} bd <span class="lighter">| </span>
                    {listing.bathrooms} ba <span class="lighter">|</span> {listing.square_feet} sqft</span> <br></br>
                    <div className = "address">
                    {listing.address} {" "} {listing.city} {", "} {listing.state} {" "} {listing.zip_code}
                </div>
                  
                <p>{listing.description}</p>
                <button className="update">Update Listing</button>
                </div>
                
            </div>
                
                
            
        </div>
    );
};

export default ListingShow;