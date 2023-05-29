import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import styles from "../../styles/specificVenue.module.css";
import { Carousel } from "react-bootstrap";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";

async function handleBooking({ venueId, dateFrom, dateTo, guests }) {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
        const response = await fetch(
            "https://api.noroff.dev/api/v1/holidaze/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
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
    const { media, name, description, price, bookings } = venue;
    const [bookingStatus, setBookingStatus] = useState("");
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);

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
        if (
            window.confirm(
                "Are you sure you want to book the venue for the selected dates?"
            )
        ) {
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
                alert("Venue is Booked");
            } else {
                alert("The venue is not available for the selected dates.");
            }
        }
    }

    let destination;
    if (venue.location && (venue.location.city !== "Unknown" && venue.location.city !== "" && venue.location.country !== "Unknown" && venue.location.country !== "")) {
        destination = <p>{venue.location.city}, {venue.location.country}</p>
    } else {
        destination = <p>Unknown location</p>
    }

    const totalNights = Math.ceil(Math.abs(checkinDate - checkoutDate) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * price;

    return (
        <div className={styles.info}>
            <div className={styles.heading}>
                <h2>{name}</h2>
            </div>
            <div className={styles.inline}>
                <div className={styles.block}>
                    <div className={styles.locationInfo}>
                        {destination}
                    </div>
                    <Carousel className={styles.carousel}>
                        {media.map((img) => (
                            <Carousel.Item key={img}>
                                <img
                                    src={img}
                                    className={styles.venueImg}
                                    alt={name}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className={styles.facilities}>
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
                            locale={enGB}
                            className={styles.dateWidth}
                        />
                    </div>
                </div>
                <div className={styles.priceInfo}>
                    <div>Price per night: ${price}</div>
                    <div>Total nights: {totalNights < 19539 ? totalNights : ""}</div>
                    <div>Total price: ${totalPrice < 27159210 ? totalPrice : ""}</div>
                    <button className={styles.venueBtn} onClick={handleCheckAvailability}>
                        Book Venue
                    </button>
                </div>

            </div>

        </div>
    );
}

export default SpecificCard;
