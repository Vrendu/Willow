import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateForm.css";
import { updateListing } from "../../store/listingsActions";
import { useLocation,useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDropzone } from 'react-dropzone';

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
    const history = useHistory();
    const [message, setMessage] = useState([]);
    const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => handleImage(acceptedFiles),
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const priceInt = parseInt(price);
        const bedroomsInt = parseInt(bedrooms);
        const bathroomsInt = parseInt(bathrooms);
        const squareFeetInt = parseInt(squareFeet);
        if (!address || !city || !state || !zipCode || !price || !bedrooms || !bathrooms || !squareFeet) {
            setMessage(["Please fill in all required fields"]);
            return;
        }

        if (state && stateAbbreviations.indexOf(state) === -1) {
            setMessage(["Please enter state name as abbreviation (eg. CA, NY, FL)"]);
            return;
        }

        // Check that price, bedrooms, bathrooms, and square feet are valid integers
        if (isNaN(parseInt(price)) || isNaN(parseInt(bedrooms)) || isNaN(parseInt(bathrooms)) || isNaN(parseInt(squareFeet))) {
            setMessage(["Please enter valid numbers for price, bedrooms, bathrooms, and square feet"]);
            return;
        }

        //also check that price is at least 50000
        if (priceInt < 50000) {
            setMessage(["Please enter a price of at least $50,000"]);
            return;
        }

        //Check that zip code is valid
        if (zipCode.length !== 5 || isNaN(parseInt(zipCode))) {
            setMessage(["Please enter valid zip code"]);
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
        setMessage("Listing updated successfully! Redirecting to show page...");
        history.push(`/listings/${listingID}`);
    };

    const handleImage = (acceptedFiles) => {
        console.log("accepted files ", acceptedFiles);
        setImages(acceptedFiles);
        console.log("images ", images);
        const urls = acceptedFiles.map((image) => URL.createObjectURL(image));
        setImageUrls(urls);
    };


    return (
        <div className="background">
            <br></br>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"></input>
                <h3>Update Your Listing</h3>
                <label>
                    Title
                    <input type="text3" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Description
                    <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <div className="address">
                    <label>
                        Address
                        <input type="text2" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>
                        City
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </label>
                    <label>
                        State
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </label>
                    <label>
                        Zip Code
                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </label>
                </div>
                <div className="other-details">
                    <label>
                        Price
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        Bedrooms
                        <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                    </label>
                    <label>
                        Bathrooms
                        <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                    </label>
                    <label>
                        Square Feet
                        <input type="text" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
                    </label>
                </div>
                    <label>
                        Images
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} multiple />
                            <p>Drag and drop files here, or click to select files</p>
                        </div>
                    </label>
                {/* <Link to="/"> */}
                <button type="submit" className="submit">Update</button>
                {/* </Link> */}
                <div className="message-container">
                    {message.map((message, index) => (
                        <p key={index} className="error">{message}</p>
                ))}
            </div>
            </form>
            
        </div>
        </div>
    );
};

export default UpdateForm;