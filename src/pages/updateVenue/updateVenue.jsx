import React from "react";
import UpdateVenueForm from "../../components/form/UpdateVenue";
import styles from "../../styles/updateVenue.module.css"

function UpdateVenue() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const { venueManager } = user;

  return (
    <div className={styles.updateVenueForm}>
      {venueManager ?
        <div>
          <h1>Update your venue</h1>
          <UpdateVenueForm />
        </div> :
        <div>
          <h1>You can only edit your own venues</h1>
          <a href="/profile">
            <p>Return to profilepage</p>
          </a>
        </div>}
    </div>
  )
}

export default UpdateVenue;