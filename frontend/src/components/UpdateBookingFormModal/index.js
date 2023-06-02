import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateBookingForm from './UpdateBookingForm';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function UpdateBookingFormModal({ listingId, bookingId }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <span className="update-booking2" onClick={() => setShowModal(true)}> <AiOutlineCheckCircle className="update-icon"/> Update Booking </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateBookingForm listingId={listingId} bookingId={bookingId} />
                </Modal>
            )}
        </>
    );
}

export default UpdateBookingFormModal;