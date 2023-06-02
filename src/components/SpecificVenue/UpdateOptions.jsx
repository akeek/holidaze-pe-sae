import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { venuesUrl } from "../constants"
import { Modal } from "react-bootstrap";
import styles from "../../styles/specificVenue.module.css"

function UpdateOptions() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();
    let { id } = useParams();
    const token = localStorage.getItem("accessToken");
    const method = "delete";


    async function onDelete() {
        const response = await fetch(venuesUrl + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method
        })
        if (response.ok) {
            alert("The listing is now deleted");
            navigate("/profile");
        } else {
            alert("Something went wrong, please try again")
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = () => onDelete();

    return (
        <div className={styles.updateOptions}>
            <div>
                <a className={styles.editbutton} href={`/updateVenue/${id}`}>Update venue</a>
            </div>
            <div>
                <button onClick={handleDeleteClick} className={styles.deletebutton}>Delete venue</button>
            </div>
            <Modal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}>
                <div className={styles.deleteContainer}>
                    <p>Are you sure you want to delete your venue?</p>
                    <p>This action is permanent, and can not be undone.</p>
                    <div className={styles.deleteButtons}>
                        <button onClick={handleCloseDeleteModal}>Cancel</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateOptions;
