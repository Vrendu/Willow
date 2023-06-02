import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm';
import { IoMdAddCircle } from 'react-icons/io';

function BookingFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span className="booking" onClick={() => setShowModal(true)}> <IoMdAddCircle className="tour-icon" />Book Tour!</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BookingForm />
                </Modal>
            )}
        </>
    );
}

export default BookingFormModal;