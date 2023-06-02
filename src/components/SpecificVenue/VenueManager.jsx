import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/profile.module.css"

function UpdateVenueManager() {

    const handleUpdate = async () => {
        const user = JSON.parse(localStorage.getItem("profile"));
        const token = localStorage.getItem("accessToken");
        const url = `https://nf-api.onrender.com/api/v1/holidaze/profiles/${user.name}`
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "venueManager": true })
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    alert("Success! You can now create a listing for your venue.")
                    localStorage.setItem(
                        "profile",
                        JSON.stringify({ ...user, venueManager: true })
                    );
                    window.location.reload();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch(error => {
                console.error("There was a problem with the PUT request:", error);
            });

    };
    return (
        <div className={styles.createContainer}>
            <h6>You are not registered as a Venue manager</h6>
            <button onClick={handleUpdate} className={styles.createButton}>Become manager</button>
        </div>
    );
}

export default UpdateVenueManager;
