import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../store/listingsActions";

const ListingForm = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [price, setPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [squareFeet, setSquareFeet] = useState("");
    const [images, setImages] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();


        const newListing = {
            title,
            description,
            price,
            bedrooms,
            bathrooms,
            address,
            city,
            state,
            zip_code: zipCode,
            square_feet: squareFeet,
            poster_id: currentUser.id
        }

        dispatch(createListing(newListing));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages(files);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Bedrooms:
                <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
            </label>
            <label>
                Bathrooms:
                <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
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
                <input type="text" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
            </label>
            <label>
                Images:
                <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
            </label>
            <button type="submit">Create Listing</button>
        </form>
    );
};

export default ListingForm;