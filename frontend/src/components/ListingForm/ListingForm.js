import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../store/listingsActions";
import "./ListingForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDropzone } from 'react-dropzone';
//import 'react-dropzone/dist/styles.css';
import { FaTimes } from 'react-icons/fa';

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
    const [imageUrls, setImageUrls] = useState([]);
    const currentUser = useSelector((state) => state.session.user);
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

       setMessage([]);
        const priceInt = parseInt(price);
        const bedroomsInt = parseInt(bedrooms);
        const bathroomsInt = parseInt(bathrooms);
        const squareFeetInt = parseInt(squareFeet);
      
        if (!address || !city || !state || !zipCode || !price || !bedrooms || !bathrooms || !squareFeet) {
            setMessage([ "Please fill in all required fields"]);
            return;
        }

        if (state && stateAbbreviations.indexOf(state) === -1) {
            setMessage(["Please enter state name as abbreviation (eg. CA, NY, FL)"]);    
            return;
        }

        if (isNaN(parseInt(price)) || isNaN(parseInt(bedrooms)) || isNaN(parseInt(bathrooms)) || isNaN(parseInt(squareFeet)) ) {
            setMessage(["Please enter valid numbers for price, bedrooms, bathrooms, and square feet"]);
            return;
        }

        if (priceInt < 50000) {
            setMessage(["Please enter a price of at least $50,000"]);
            return;
        }

        if (zipCode.length !== 5 || isNaN(parseInt(zipCode))) {
            setMessage([ "Please enter valid zip code"]);
            return;
        }

        const formData = new FormData();
        formData.append("listing[title]", title);
        formData.append("listing[description]", description);
        formData.append("listing[price]", priceInt);
        formData.append("listing[bedrooms]", bedroomsInt);
        formData.append("listing[bathrooms]", bathroomsInt);
        formData.append("listing[address]", address);
        formData.append("listing[city]", city);
        formData.append("listing[state]", state);
        formData.append("listing[zip_code]", zipCode);
        formData.append("listing[square_feet]", squareFeetInt);
        formData.append("listing[poster_id]", currentUser.id);
        if (images.length !== 0){
            images.forEach(image => {
                formData.append('listing[photos][]', image);
            })

        }

          
        
        dispatch(createListing(formData));
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setPrice("");
        setBedrooms("");
        setBathrooms("");
        setTitle("");
        setDescription("");
        setSquareFeet("");
        setImages([]);
        setImageUrls([]);
        setMessage(["Listing created successfully! Redirecting to home page..."]);
        setTimeout(() => {
            history.push('/');
        }, 3000);
        
    };

    const handleImage = (acceptedFiles) => {
        // console.log("accepted files ", acceptedFiles);
        // setImages(acceptedFiles);
        // console.log("images ", images);
        // const urls = acceptedFiles.map((image) => URL.createObjectURL(image));
        // setImageUrls(urls);
        const updatedImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages(updatedImages);
        setImageUrls(updatedImages.map((image) => image.preview));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedImageUrls = [...imageUrls];

        updatedImages.splice(index, 1);
        updatedImageUrls.splice(index, 1);

        setImages(updatedImages);
        setImageUrls(updatedImageUrls);
    };

    return (
        <div className="background">
            <br></br>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"></input>
                <h3>Create Your Listing</h3>
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
                        Bed
                        <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                    </label>
                    <label>
                        Bath
                        <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                    </label>
                    <label>
                        Square Ft
                        <input type="text" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
                    </label>
                </div>
                    <label>
                        Images
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} multiple />
                            {imageUrls.length === 0 && (
                                <p>Drag and drop files here, or click to select files</p>
                            )}
                            <div className="preview-container">
                                {imageUrls.map((imageUrl, index) => (
                                    <div key={index} className="preview-image-container">
                                        <img src={imageUrl} alt={`Preview ${index}`} className="preview-image" />
                                        <span
                                            className="remove-image-button"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FaTimes className="delete-icon" />
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </label>
                <button type="submit" className="submit">Create</button>

                <div className="message-container"> 
                    {message.map((message, index) => (
                        <p key={index} className="lerror">{message}</p>
                    ))}
                </div>
            </form>
            
        </div>
        </div>
    );
};

export default ListingForm;