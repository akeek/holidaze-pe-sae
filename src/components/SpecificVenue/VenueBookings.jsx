import React from "react";
import { useParams } from "react-router-dom";
import ApiHook from "../../hooks/apiHook";
import { venuesUrl } from "../constants";
import styles from "../../styles/specificVenue.module.css"

function VenueBookings() {
    let { id } = useParams();
    const specific = id + '?_bookings=true';
    const { data, isLoading, isError } = ApiHook(venuesUrl + specific);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    const bookings = data.bookings;
    let sorted = [];
    function sorting() {
        if (bookings) {
            sorted = bookings.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
        }
    }
    sorting()

    if (isLoading) {
        return <div>Loading</div>;
    }
    if (isError) {
        return <p>Oops, something seems to have gone wrong here..</p>;
    }

    return (
        <div>
            <h5 className={styles.h5bookings}>Others have booked you venue</h5>
            {sorted && sorted.length ?
                (sorted.map((d) => {
                    const filteredDates = new Date(d.dateFrom) >= new Date()
                    if (!filteredDates) {
                        return null;
                    }
                    return (
                        <div key={d.id} className={styles.bookingsContainer}>
                            <div className={styles.inlineBooking}>
                                <p className={styles.greyBooking}>Dates: </p>
                                <p>{(new Date(d.dateFrom).toLocaleDateString('no-NO', options))} - {(new Date(d.dateTo).toLocaleDateString('no-NO', options))}</p>
                            </div>
                            <div className={styles.inlineBooking}>
                                <p className={styles.greyBooking}>Guests: </p>
                                <p>{d.guests} </p>
                            </div>
                            <div className={styles.inlineBooking}>
                                <p className={styles.greyBooking}>Booked on: </p>
                                <p>{(new Date(d.updated).toLocaleDateString('no-NO', options))}, {(new Date(d.created).toLocaleTimeString('no-NO'))}</p>
                            </div>
                        </div>
                    )
                }))
                : <p>No bookings yet</p>}
        </div>
    )
}

export default VenueBookings;