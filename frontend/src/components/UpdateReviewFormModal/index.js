import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateReviewForm from './UpdateReviewForm';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function UpdateReviewFormModal({ listingId, reviewId }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <span className="update-review" onClick={() => setShowModal(true)}> <AiOutlineCheckCircle className="update-review" /> Edit Review </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateReviewForm listingId={listingId} reviewId={reviewId} />
                </Modal>
            )}
        </>
    );
}

export default UpdateReviewFormModal;