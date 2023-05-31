import ApiHook from "../../hooks/apiHook"
import { profileUrl } from "../constants"
import styles from "../../styles/profile.module.css";

function ProfileBookings() {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    const { name } = userInfo;
    const getBookingsUrl = profileUrl + name + "/bookings?&sort=dateFrom&sortOrder=asc&_venue=true";
    const { data } = ApiHook(getBookingsUrl);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className={styles.bookingInfoContainer}>
            <h2 className={styles.h3}>My upcoming bookings</h2>
            {data && data.length ? (
                data.map((booking) => {
                    const filteredDates = new Date(booking.dateFrom) >= new Date()
                    if (!filteredDates) {
                        return null;
                    }
                    return (
                        <a key={booking.id} className={styles.link} href={`/specific/${booking.venue.id}`}>
                            <div className={styles.venueCard}>
                                {booking.venue.media && booking.venue.media.length ? <div className={styles.imageWidth}> <img src={booking.venue.media[0]} alt={booking.venue.name} className={styles.venueImg} /> </div> : <p>Empty</p>}
                                <div className={styles.venueInfo}>
                                    <h5>{booking.venue.name}</h5>
                                    <p>Dates: {(new Date(booking.dateFrom).toLocaleDateString('en-GB', options))} - {(new Date(booking.dateTo).toLocaleDateString('en-GB', options))} </p>
                                    <p className={styles.priceInfo}>Total Price: ${Math.ceil(Math.abs(new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24)) * booking.venue.price},-</p>
                                </div>
                            </div>
                        </a>
                    )
                })
            )
                :
                <div className={styles.noVenue}>
                    <p className={styles.createContainer}>You have no bookings</p>
                    <a href="/venues" className={styles.venuesButton}>See venues</a>
                </div>

            }
        </div >
    )
}

export default ProfileBookings;