import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
import { IoMdAddCircle } from 'react-icons/io';

function ReviewFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span className="leave_review" onClick={() => setShowModal(true)}> Leave a Review</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewForm />
                </Modal>
            )}
        </>
    );
}

export default ReviewFormModal;