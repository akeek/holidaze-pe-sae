import React from "react";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileVenues from "../../components/profile/Venues";
import ProfileBookings from "../../components/profile/Bookings";
import styles from "../../styles/profile.module.css"


function Profile() {
    return (
        <div className={styles.profileContainer}>
            <ProfileInfo />
            <hr></hr>
            <div className={styles.inline}>
                <ProfileVenues />
                <hr></hr>
                <ProfileBookings />
            </div>

        </div>
    );
}

export default Profile;
