import ApiHook from "../../hooks/apiHook"
import { profileUrl } from "../constants"
import styles from "../../styles/profile.module.css";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";

function ProfileVenues() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const { name } = userInfo;
    const getVenuesUrl = profileUrl + name + "?_venues=true&sort=created";
    const { data } = ApiHook(getVenuesUrl);
    console.log(data)

    const breakfast = <FaUtensils />
    const parking = <FaParking />
    const pets = <FaDog />
    const wifi = <FaWifi />

    return (
        <div className={styles.venueInfoContainer}>
            <h2>My venues</h2>
            {data.venues && data.venues.length ? (
                data.venues.map((venue) => (
                    <a href={`specific/${venue.id}`} key={venue.id}>
                        <div key={venue.id} className={styles.venueCard}>
                            {venue.media.length ? <div className={styles.imageWidth}> <img src={venue.media[0]} alt={venue.name} className={styles.venueImg} /> </div> : <p>Empty</p>}
                            <div className={styles.venueInfo}>
                                <h5>{venue.name}</h5>
                                <p>Location: {venue.location.city}, {venue.location.country}</p>
                                <div className={styles.facilities}>
                                    {venue.meta && venue.meta.wifi ? <div>
                                        {wifi}
                                        <p>Wifi</p>
                                    </div> : null}
                                    {venue.meta && venue.meta.parking ? <div>
                                        {parking}
                                        <p>Parking</p>
                                    </div> : null}
                                    {venue.meta && venue.meta.breakfast ? <div>
                                        {breakfast}
                                        <p>Breakfast included</p>
                                    </div> : null}
                                    {venue.meta && venue.meta.pets ? <div>
                                        {pets}
                                        <p>Pets allowed</p>
                                    </div> : null}
                                    {venue.meta && !venue.meta.pets && !venue.meta.breakfast && !venue.meta.parking && !venue.meta.wifi ? <div>
                                        <p>No extra facilities</p></div> : null}
                                </div>
                                <p className={styles.priceInfo}>Price per night: ${venue.price}</p>
                            </div>
                        </div>
                    </a>)))
                : <p>You have no listed venues</p>}
        </div>
    );
}

export default ProfileVenues;