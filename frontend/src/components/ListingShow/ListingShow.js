 import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing,deleteListing } from "../../store/listingsActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ListingShow.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ListingShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const listing = useSelector((state) => state.listings[id])
    const currentUser = useSelector((state) => state.session.user);
    useEffect(() => {
       dispatch(fetchListing(id));
    }, [dispatch]);

    //const showButton = listing.poster_id === currentUser.id;
    const removeListing = () => {
        console.log(listing);
        dispatch(deleteListing(listing.id))
    }

    return (
        <div className = "show-page">
            <div className="photo-list">
                    {listing.photos.map((photo) => <img src={photo} alt={listing.title} class="photo" />)}
                    {console.log(listing.photos)}
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
                <p>Posted by {listing.poster_id}</p>
                {currentUser?.id === listing.poster_id && <p className ="updateanddestroy">
                    <Link to={{pathname:"/updatelisting", state: {listing}}}>
                        <button className="update">Update Listing</button>
                    </Link>
                     <Link to = "/">
                         <button className="delete" onClick={()=>removeListing()}>Delete Listing</button>
                     </Link>
                    
                </p>}
                
                </div>
                
            </div>
                
                
            
        </div>
    );
};

export default ListingShow;