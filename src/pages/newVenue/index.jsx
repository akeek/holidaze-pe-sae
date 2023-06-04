import React from "react";
import NewVenueForm from "../../components/form/NewVenue"
import styles from "../../styles/newVenue.module.css"


function NewVenue() {

    return (
        <div className={styles.createVenueForm}>
            <NewVenueForm />
        </div>);
}

export default NewVenue;