import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../store/listingsActions";
import "./ListingForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ListingForm = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [price, setPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [squareFeet, setSquareFeet] = useState(0);
    const [images, setImages] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zip_code", zipCode);
        formData.append("square_feet", squareFeet);
        formData.append("poster_id", currentUser.id);
        if (images){
            // images.forEach((image, idx) => {
            //     formData.append(`photos`, images);
            // })

            for(let i = 0; i < images.length; i++){
                formData.append("photos[]", images[i])
            }
            
       }
        
        
       // console.log(formData);
       // console.log(Object.fromEntries(formData.entries()));
        dispatch(createListing(Object.fromEntries(formData.entries())));
    };

    const handleImage = (e) => {
        const newImages = Array.from(e.target.files);
        setImages(newImages);
        console.log(newImages)
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"></input>
            <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
                State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            <label>
                Zip Code:
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
            </label>
            <label>
                Bedrooms:
                <input type="text" value={bedrooms} onChange={(e) => setBedrooms(parseInt(e.target.value))} />
            </label>
            <label>
                Bathrooms:
                <input type="text" value={bathrooms} onChange={(e) => setBathrooms(parseInt(e.target.value))} />
            </label>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Square Feet:
                <input type="text" value={squareFeet} onChange={(e) => setSquareFeet(parseInt(e.target.value))} />
            </label>
            <label>
                Images:
                <input type="file" multiple onChange={(e) => handleImage(e)} />
            </label>
            {/* <Link to="/"> */}
                <button type="submit">Create Listing</button>
            {/* </Link> */}
            
            
        </form>
    );
};

export default ListingForm;