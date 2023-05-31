import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/newVenue.module.css"
import { useNavigate } from "react-router";

function CreateVenue() {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [animals, setAnimals] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [parking, setParking] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [continent, setContinent] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const today = new Date().toISOString().split("T")[0];
    // eslint-disable-next-line no-unused-vars
    const [venueId, setVenueId] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("profile"));
        const token = (localStorage.getItem("accessToken"))

        if (user.venueManager === false) {
            alert("Become a Venue Manager to create a new Venue");
            return;
        }

        const data = {
            name,
            description,
            price: parseInt(price),
            animals,
            breakfast,
            parking,
            wifi,
            dateTo,
            dateFrom,
            maxGuests: parseInt(maxGuests),
            city,
            address,
            continent,
            country,
            zip,
        };

        try {
            const response = await fetch(
                "https://api.noroff.dev/api/v1/holidaze/venues",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was bad");
            }

            const result = await response.json();

            if (response.ok) {
                setVenueId(result.id);
                alert("Venue created successfully!");
                if (result.id) {
                    navigate(`/specific/${result.id}`);
                }
            }
        } catch (error) {
            console.error("There was a problem with the request:", error);
        }
    };

    return (
        <div className={styles.createVenueForm}>
            <h1>Create New Venue</h1>
            <Form onSubmit={handleSubmit}>
                <div className={styles.name}>
                    <label>Venue Name</label>
                    <Form.Control
                        type="text"
                        placeholder="Ex. Pete's cabin"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className={styles.image}>
                    <label>Venue Image Url</label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: https://ibb.co/hHsZ0G2"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                    />
                </div>

                <div className={styles.description}>
                    <label>Description</label>
                    <Form.Control
                        className={styles.description}
                        type="text"
                        placeholder="Describe your venue"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div className={styles.price}>
                    <label>Price per night</label>
                    <Form.Control
                        className={styles.price}
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>

                <div className={styles.guests}>
                    <label>Max Guests</label>
                    <Form.Control
                        className={styles.price}
                        type="number"
                        placeholder="What is the maxumim number of guests?"
                        value={maxGuests}
                        onChange={(event) => setMaxGuests(event.target.value)}
                    />
                </div>

                <div className={styles.dates}>
                    <h4>Choose Availability</h4>
                    <div className={styles.toFrom}>
                        <div>
                            <label>
                                Available from:
                                <input
                                    type="date"
                                    min={today}
                                    value={dateFrom}
                                    onChange={(event) => setDateFrom(event.target.value)}
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                Available To:
                                <input
                                    type="date"
                                    value={dateTo}
                                    min={dateFrom}
                                    onChange={(event) => setDateTo(event.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.location}>
                    <h4>Location</h4>
                    <div className={styles.adress}>
                        <label>Address</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>

                    <div className={styles.city}>
                        <label>City</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </div>

                    <div className={styles.continent}>
                        <label>Continent</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Continent"
                            value={continent}
                            onChange={(event) => setContinent(event.target.value)}
                        />
                    </div>

                    <div className={styles.country}>
                        <label>Country</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Country"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                        />
                    </div>

                    <div className={styles.zip}>
                        <label>Zip Code</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Zip Code"
                            value={zip}
                            onChange={(event) => setZip(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.facilities}>
                    <h4>Facilites</h4>
                    <div className={styles.animals}>
                        <Form.Check
                            className={styles.checkbox}
                            type="checkbox"
                            label="Pets allowed"
                            checked={animals}
                            onChange={(event) => setAnimals(event.target.checked)}
                        />
                    </div>

                    <div className={styles.breakfast}>
                        <Form.Check
                            className={styles.checkbox}
                            type="checkbox"
                            label="Breakfast"
                            checked={breakfast}
                            onChange={(event) => setBreakfast(event.target.checked)}
                        />
                    </div>

                    <div className={styles.parking}>
                        <Form.Check
                            className={styles.checkbox}
                            type="checkbox"
                            label="Parking"
                            checked={parking}
                            onChange={(event) => setParking(event.target.checked)}
                        />
                    </div>

                    <div className={styles.wifi}>
                        <Form.Check
                            className={styles.checkbox}
                            type="checkbox"
                            label="Wifi"
                            checked={wifi}
                            onChange={(event) => setWifi(event.target.checked)}
                        />
                    </div>

                </div>
            </Form>
            <button onClick={handleSubmit} className={styles.newVenueButton}>Create Venue</button>
        </div>
    );

}

export default CreateVenue;
