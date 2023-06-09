import React, { useState } from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from "@mui/material";
import { venuesUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/newVenue.module.css"
import StarIcon from '@mui/icons-material/Star';

const schema = yup
    .object({
        name: yup
            .string()
            .min(3, "You need 3 or more characters")
            .max(30, "Maximum 30 characters")
            .required("Enter a title/name for your venue"),
        description: yup
            .string()
            .required("A description is required"),
        media: yup
            .string()
            .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, "Enter a valid url")
            .required("Enter a valid url"),
        mediaOptional1: yup
            .string()
            .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,)
            .transform((value, originalValue) => {
                if (!value) {
                    return null;
                }
                return originalValue;
            })
            .nullable()
            .optional(),
        city: yup
            .string()
            .required("In what city is your venue located at?"),
        country: yup
            .string()
            .required("In what country is your venue located at?"),
        price: yup
            .number()
            .typeError("Enter a number")
            .required("Enter a price per night"),
        maxGuests: yup
            .number()
            .typeError("Enter a number")
            .min(1, "Venue must room at least 1 guest")
            .max(100, "Please enter number of guests 100 or less")
            .required("Enter maximum amount of guests"),
        meta: yup
            .boolean(),
    })
    .required();

/**
 * Creates the form for for creating a new venue, with validation
 */
function NewVenueForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState([]);
    const [priceNumber, setPriceNumber] = useState("");
    const price = Number(priceNumber);
    const [maxGuestsValue, setMaxGuestsValue] = useState("");
    const maxGuests = parseInt(maxGuestsValue);
    const [meta, setMeta] = useState({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    });
    const { wifi, parking, breakfast, pets } = meta;
    const [location, setLocation] = useState({
        city: "",
        country: "",
    });
    const { city, country } = location;
    const navigate = useNavigate();

    async function onSubmit(e) {
        const venue = { name, description, media, price, maxGuests, meta, location }
        const method = "post";
        const token = localStorage.getItem("accessToken");
        const body = JSON.stringify(venue);

        if (media.length) {
            const response = await fetch(venuesUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method,
                body
            })

            if (response.ok) {
                alert("Your venue is published!");
                navigate("/profile");
            } else {
                alert("Something went wrong, try again")
            }
        } else {
            alert("The media - required field must be added")
        }
    }

    function checkPattern(check) {
        return (
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(check)
        )
    }

    const [media1, setMedia1] = useState("");
    const [disabled1, setDisabled1] = useState(false);

    const handleMedia1Field = () => {
        if (checkPattern(media1)) {
            setMedia(existMedia => [...existMedia, media1])
            document.getElementById("media1").disabled = "true";
            setDisabled1(true);
        } else {
            alert("Paste valid url")
        }
    }

    const changeLocation = (e) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value,
        });
    };

    const updateMeta = (e) => {
        setMeta({
            ...meta,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <div>
            <h1>New listing</h1>
            <div>
                <p>- Fill in this form to create a new venue</p>
                <TextField
                    id="name"
                    label="Name your venue"
                    value={name}
                    fullWidth
                    {...register(`name`)}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>{errors.name?.message}</p>
            </div>
            <div>
                <TextField
                    id="description"
                    label="Describe your venue"
                    className={styles.input}
                    value={description}
                    multiline
                    rows={3}
                    fullWidth
                    {...register(`description`)}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p>{errors.description?.message}</p>
            </div>

            <div>
                <TextField
                    id="city"
                    label="Ex. Los Angeles"
                    value={city}
                    fullWidth
                    {...register(`city`)}
                    onChange={changeLocation}
                />
                <p>{errors.city?.message}</p>
            </div>
            <div>
                <TextField
                    id="country"
                    label="Ex. Norway"
                    value={country}
                    fullWidth
                    {...register(`country`)}
                    onChange={changeLocation}
                />
                <p>{errors.country?.message}</p>
            </div>
            <div>
                <TextField
                    id="price"
                    label="Name your venues daily rate"
                    type="number"
                    value={priceNumber}
                    fullWidth
                    {...register(`price`)}
                    onChange={(e) => setPriceNumber(e.target.value)}
                />
                <p>{errors.price?.message}</p>
            </div>
            <div>
                <TextField
                    id="maxGuests"
                    label="How many guests can you host?"
                    type="number"
                    value={maxGuestsValue}
                    fullWidth
                    {...register(`maxGuests`)}
                    onChange={(e) => setMaxGuestsValue(e.target.value)}
                />
                <p>{errors.maxGuests?.message}</p>
            </div>

            <div className={styles.mediaMessage}>
                <TextField
                    id="media1"
                    label="Ex: https://ibb.co/dKm1vrY"
                    className={styles.input}
                    name="media"
                    type="url"
                    defaultValue=""
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <IconButton disabled={disabled1} onClick={handleMedia1Field}>
                                <StarIcon />
                            </IconButton>
                        )
                    }}
                    {...register(`media`)}
                    onChange={(e) => setMedia1(e.target.value)}
                />
                <p>Press the star to confirm media-url</p>
                <p>{errors.media?.message}</p>
            </div>
            <hr></hr>
            <div>
                <FormControl>
                    <FormLabel>Check the included facilities</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={wifi} onChange={updateMeta} name="wifi" />}
                            label="Wifi"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={parking} onChange={updateMeta} name="parking" />}
                            label="Parking"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={breakfast} onChange={updateMeta} name="breakfast" />}
                            label="Breakfast"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={pets} onChange={updateMeta} name="pets" />}
                            label="Pets"
                        />
                    </FormGroup>
                </FormControl>
            </div>
            <button onClick={handleSubmit(onSubmit)} className={styles.postButton}>Post venue</button>
        </div >
    )
}

export default NewVenueForm;