import React from "react";
import UpdateVenueManager from "../../components/SpecificVenue/VenueManager";
import styles from "../../styles/profile.module.css"


function NewVenue() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { venueManager } = user

    return (
        <div>
            {venueManager ?
                <div className={styles.createContainer}>
                    <a href="/newVenue" className={styles.createButton}>Create venue</a>
                </div> :
                <div>
                    <UpdateVenueManager />
                </div>
            }
        </div>);
}

export default NewVenue;