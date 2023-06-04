import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import LogIn from "../../pages/login";


function RedirectInfo() {

    useEffect(() => {
        document.title = `Holidaze | Error`;
    })

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div class="errorDiv">
            <div>
                <h1>You need to be logged in to view this page</h1>
                <div>
                    <p>Please <button class="logInError" onClick={handleLoginClick}>log in here</button></p>
                    <p>Don't have an account yet? <a href="/register">Register here</a></p>
                </div>
            </div>
            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LogIn handleClose={handleCloseLoginModal} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RedirectInfo;