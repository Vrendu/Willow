import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import "./ReviewForm.css";
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createReview } from '../../store/listingsActions';
import { AiFillStar } from 'react-icons/ai';

function ReviewForm(){

    const dispatch = useDispatch();
    const history = useHistory();
    const [rating, setRating] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const currentUser = useSelector((state) => state.session.user);
    const listingID = useParams();
    const [errors, setErrors] = useState([]);
    const [activeRating, setActiveRating] = useState(null);

    const renderStars = () => {
        const hoverRating = activeRating || rating;

        const handleHover = (hoverRating) => {
            setActiveRating(hoverRating);
        };

        const handleClick = (clickedRating) => {
            setRating(clickedRating);
            setActiveRating(clickedRating);
        };

        return (
            <>
                {[1, 2, 3, 4, 5].map((index) => {
                    return (
                        <AiFillStar
                            key={index}
                            id='form-star'
                            className={
                                hoverRating >= index ? "filled-star" : "empty-star"
                            }
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(null)}
                            onClick={() => handleClick(index)}
                        />
                    );
                })}
            </>
        );
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
         
        setErrors([]);
        const formData = new FormData();
        
        formData.append("rating", parseInt(rating));
        formData.append("title", title);
        formData.append("description", description);
        formData.append("author_id", currentUser.id);
        formData.append("listing_id", parseInt(listingID.id));
        return (dispatch(createReview(Object.fromEntries(formData.entries())))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
            throw res;
        }))
        .then(() => history.go(0))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='review-form'>
                <div>
                    <label>Rating:</label>
                    <div className="stars-container">
                        {renderStars()}
                    </div>
                    <label>Title:</label>
                    <input 
                        type="text"
                        className='title-input'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description:</label>
                    <textarea
                        type="text"
                        className='description-input'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
                <br></br>
                {errors.map((error, index) => (
                    <div key={index} className='error'>{error}</div>
                ))}
            </form> 

        </div>
    )
}

export default ReviewForm;