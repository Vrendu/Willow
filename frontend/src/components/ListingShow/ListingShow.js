import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListing } from "../../store/listingsActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ListingShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    //const listing = useSelector((state) => state.listing.id)
    useEffect(() => {
       dispatch(fetchListing(id));
    }, [dispatch]);

    

    return (
        <div>
            {/* <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <img src={listing.photoUrls[0]} alt={listing.title} />
            <p>Price: {listing.price}</p>
            <p>Square Feet: {listing.squareFeet}</p>
            <p>Bedrooms: {listing.bedrooms}</p>
            <p>Bathrooms: {listing.bathrooms}</p> */}
            Hello there
        </div>
    );
};

export default ListingShow;