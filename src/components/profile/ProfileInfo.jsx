import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css"
import Modal from "react-bootstrap/Modal";
import MichaelScott from "../../assets/images/michael-scott-the-office.jpeg"

function ProfileInfo() {
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [newAvatarUrl, setNewAvatarUrl] = useState("");
    const [email, setEmail] = useState("")

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("profile"));
        if (data) {
            setAvatar(data.avatar);
            setUserName(data.name);
            setEmail(data.email);
        }
    }, []);

    const avatarImg = avatar || MichaelScott;

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSave = () => {
        const user = JSON.parse(localStorage.getItem("profile"));
        setAvatar(newAvatarUrl);
        localStorage.setItem(
            "profile",
            JSON.stringify({ ...user, avatar: newAvatarUrl })
        );
        handleClose();
    };


    return (
        <div className={styles.profileInfoContainer}>
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <h1 className={styles.username}>{userName}</h1>
                    <p>E-mail: {email}</p>
                </div>
                <div className={styles.avatarContainer}>
                    <img src={avatarImg} alt="Avatar" className={styles.avatar} />
                    <button className={styles.edit} onClick={handleShow}>Edit profile picture</button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update profilepicture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="avatarUrl">Image-URL: </label>
                    <input
                        className={styles.url}
                        type="text"
                        placeholder="Ex: https://ibb.co/hHsZ0G2"
                        id="avatarUrl"
                        value={newAvatarUrl}
                        onChange={(e) => setNewAvatarUrl(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className={styles.formBtnClose} onClick={handleClose}>
                        Close
                    </button>
                    <button className={styles.formBtn} onClick={handleSave}>
                        Update picture
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfileInfo;
