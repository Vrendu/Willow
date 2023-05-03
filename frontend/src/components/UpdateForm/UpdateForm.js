import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../store/listingsActions";
import "./UpdateForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { updateListing } from "../../store/listingsActions";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = ({listing}) => {
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
    const [imageUrls, setImageUrls] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
    const listingID = useLocation().state?.listing.id
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const priceInt = parseInt(price);
        const bedroomsInt = parseInt(bedrooms);
        const bathroomsInt = parseInt(bathrooms);
        const squareFeetInt = parseInt(squareFeet);
        if (!address || !city || !state || !zipCode || !price || !bedrooms || !bathrooms || !squareFeet) {
            alert("Please fill in all required fields.");
            return;
        }

        // Check that price, bedrooms, bathrooms, and square feet are valid integers
        if (isNaN(parseInt(price)) || isNaN(parseInt(bedrooms)) || isNaN(parseInt(bathrooms)) || isNaN(parseInt(squareFeet))) {
            alert("Please enter valid numbers for price, bedrooms, bathrooms, and square feet.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", priceInt);
        formData.append("bedrooms", bedroomsInt);
        formData.append("bathrooms", bathroomsInt);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zip_code", zipCode);
        formData.append("square_feet", squareFeetInt);
        formData.append("poster_id", currentUser.id);
        if (images.length !== 0) {
            images.forEach(image => {
                formData.append('photos[]', image);
            })

        }
        formData.append("id", listingID)
        dispatch(updateListing(Object.fromEntries(formData.entries())));
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setPrice("0");
        setBedrooms("0");
        setBathrooms("0");
        setTitle("");
        setDescription("");
        setSquareFeet("");
        setImages([]);
        setImageUrls([]);
        alert("Listing updated successfully!");
    };

    const handleImage = (e) => {
        const newImages = Array.from(e.target.files);
        setImages(newImages);
        if (images.length !== 0) {
            let imagesLoaded = 0;
            const urls = [];
            Array.from(images).forEach((image, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++imagesLoaded == images.length)
                        setImageUrls(urls);
                }
            })
        }
        else setImageUrls([]);
    };

    console.log(images)

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
                <input type="file" multiple onChange={(e) => handleImage(e)} />
            </label>

            <button type="submit">Update Listing</button>

        </form>
    );
};

export default UpdateForm;