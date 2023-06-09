import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ApiHook from "../../hooks/apiHook";
import DatePicker from "react-datepicker";
import { venuesUrl } from "../constants";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import styles from "../../styles/specificVenue.module.css";
import { Carousel } from "react-bootstrap";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";
import UpdateOptions from "./UpdateOptions";
import VenueBookings from "./VenueBookings";

async function handleBooking({ venueId, dateFrom, dateTo, guests }) {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await fetch(
            "https://api.noroff.dev/api/v1/holidaze/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ venueId, dateFrom, dateTo, guests }),
            }
        );
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

function SpecificCard(props) {
    const { venueId, venue } = props;
    const { media, description, price, bookings } = venue;

    // eslint-disable-next-line no-unused-vars
    const [bookingStatus, setBookingStatus] = useState("");
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);

    let { id } = useParams();
    const specific = id + '?_owner=true'
    const { data } = ApiHook(venuesUrl + specific);


    if (!Array.isArray(media)) {
        return null;
    }

    const breakfast = <FaUtensils />
    const parking = <FaParking />
    const pets = <FaDog />
    const wifi = <FaWifi />

    const unavailableDates = bookings
        .map((booking) => {
            const start = new Date(booking.dateFrom);
            const end = new Date(booking.dateTo);
            const dates = [];
            const currentDate = new Date(start);
            while (currentDate <= end) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        })
        .flat();

    function filterDate(date) {
        return !unavailableDates.some(
            (unavailableDate) =>
                date.getFullYear() === unavailableDate.getFullYear() &&
                date.getMonth() === unavailableDate.getMonth() &&
                date.getDate() === unavailableDate.getDate()
        );
    }

    async function handleCheckAvailability() {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (!profile) {
            alert("You need to be logged in to book a venue");
            return;
        }
        if (data.owner.name === profile.name) {
            alert("You are now booking your own venue");
        }
        if (window.confirm("Are you sure you want to book the venue for the selected dates?")) {
            if (!checkinDate || !checkoutDate) {
                alert("Please select both check-in and check-out dates.");
                return;
            }

            if (!Array.isArray(bookings)) {
                alert("Bookings date is not available.");
                return;
            }

            const isAvailable = bookings.every((booking) => {
                const bookingStart = new Date(booking.dateFrom);
                const bookingEnd = new Date(booking.dateTo);
                const checkin = new Date(checkinDate);
                const checkout = new Date(checkoutDate);

                if (checkin >= bookingStart && checkin <= bookingEnd) {
                    return false;
                }
                if (checkout >= bookingStart && checkout <= bookingEnd) {
                    return false;
                }
                return true;
            });
            if (isAvailable) {
                const bookingStatus = await handleBooking({
                    venueId,
                    dateFrom: checkinDate,
                    dateTo: checkoutDate,
                    guests: 1,
                });
                setBookingStatus(bookingStatus);
                alert("The venue is booked in your name");
            } else {
                alert("Something has gone wrong");
            }
        }
    }

    let destination;
    if (venue.location && (venue.location.city !== "Unknown" && venue.location.city !== "" && venue.location.country !== "Unknown" && venue.location.country !== "")) {
        destination = <p className={styles.destination}>{venue.location.city}, {venue.location.country}</p>
    } else {
        destination = <p>Unknown location</p>
    }

    const totalNights = Math.ceil(Math.abs(checkinDate - checkoutDate) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * price;

    let updateOptions;
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
        updateOptions = <div className={styles.updateOptionsContainer}>
            {data.owner && data.owner.name === profile.name ?
                <UpdateOptions className={styles.updateOptions} /> : null
            }</div>
    }

    let venueBookings;
    if (profile) {
        venueBookings = <div className={styles.inlineBookingBottom}>
            {data.owner && data.owner.name === profile.name && profile.venueManager ?
                <VenueBookings /> : null
            }</div>
    }

    return (
        <div className={styles.info}>
            <div className={styles.heading}>
                <div className={styles.locationInfo}>
                    <h2 className={styles.h2}>{venue.name}</h2>
                    {destination}
                </div>
                {updateOptions}
            </div>

            <div className={styles.inline}>
                <div className={styles.facilitiesBigscreen}>
                    <h4>Facilities</h4>
                    <div>
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

                </div>
                <div className={styles.block}>
                    {media.length <= 1 ? <img
                        src={media}
                        className={styles.venueImg}
                        alt={data.name} />
                        : <Carousel className={styles.carousel}>
                            {media.map((img) => (
                                <Carousel.Item key={img}>
                                    <img
                                        src={img}
                                        className={styles.venueImg}
                                        alt={data.name}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>}
                </div>
                <div className={styles.facilitiesMediaq}>
                    <h4>Facilities</h4>
                    <div>
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
                </div>
            </div>
            <div className={styles.descContainer}>
                <h5>Description</h5>
                <p className={styles.des}>{description}</p>
            </div>
            <div className={styles.availabilityContainer}>
                <div className={styles.availability}>
                    <div className={styles.datepicker}>
                        <h4>Check-In</h4>
                        <DatePicker
                            selected={checkinDate}
                            onChange={(date) => setCheckinDate(date)}
                            filterDate={filterDate}
                            minDate={new Date(Date.now() + (3600 * 1000 * 24))}
                            maxDate={checkoutDate}
                            placeholderText="Press to see avalibilty"
                            locale={enGB}
                            className={styles.dateWidth}
                        />
                    </div>
                    <div className={styles.datepicker}>
                        <h4>Check-Out</h4>
                        <DatePicker
                            selected={checkoutDate}
                            onChange={(date) => setCheckoutDate(date)}
                            filterDate={filterDate}
                            minDate={checkinDate}
                            placeholderText="Press to see avalibilty"
                            locale={enGB}
                            className={styles.dateWidth}
                        />
                    </div>
                </div>
                <div className={styles.priceInfo}>
                    <div>Price per night: ${price}</div>
                    <div>Total nights: {totalNights < 100 ? totalNights : ""}</div>
                    <div>Total price: {totalPrice > 1000000 ? <span>Calculating</span> : <span>${totalPrice}</span>}</div>
                    <button className={styles.venueBtn} onClick={handleCheckAvailability}>
                        Book Venue
                    </button>
                </div>
            </div>
            {venueBookings}
        </div>
    );
}

export default SpecificCard;
