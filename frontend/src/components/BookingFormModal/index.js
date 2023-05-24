import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm';

function BookingFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span className="booking" onClick={() => setShowModal(true)}>Book Tour!</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BookingForm />
                </Modal>
            )}
        </>
    );
}

export default BookingFormModal;