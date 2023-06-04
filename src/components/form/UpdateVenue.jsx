import React, { useState, useEffect } from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from "@mui/material";
import { venuesUrl } from "../../components/constants";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/updateVenue.module.css"
import StarIcon from '@mui/icons-material/Star';
import ApiHook from "../../hooks/apiHook";

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


function UpdateVenueForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
    let { id } = useParams();
    const { data } = ApiHook(venuesUrl + id);
    const [name, setName] = useState("");

    useEffect(() => {
        if (data) {
            setName(data.name)
        }
    }, [data]);

    const [description, setDescription] = useState("");
    useEffect(() => {
        if (data) {
            setDescription(data.description);
        }
    }, [data]);

    const [media, setMedia] = useState([]);

    const [priceNumber, setPriceNumber] = useState("");
    useEffect(() => {
        if (data) {
            setPriceNumber(data.price);
        }
    }, [data]);
    const price = Number(priceNumber);

    const [maxGuestsValue, setMaxGuestsValue] = useState("");
    useEffect(() => {
        if (data) {
            setMaxGuestsValue(data.maxGuests);
        }
    }, [data]);
    const maxGuests = parseInt(maxGuestsValue);

    const [meta, setMeta] = useState({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    });
    useEffect(() => {
        if (data) {
            setMeta({ ...data.meta });
        }
    }, [data]);
    const { wifi, parking, breakfast, pets } = meta;

    const [location, setLocation] = useState({
        city: "",
        country: "",
    });
    useEffect(() => {
        if (data) {
            setLocation({ ...data.location })
        }
    }, [data]);
    const { city, country } = location;

    const navigate = useNavigate();

    async function onSubmit(e) {
        const venue = { name, description, media, price, maxGuests, meta, location }
        const method = "put";
        const token = localStorage.getItem("accessToken");
        const body = JSON.stringify(venue);

        if (media.length) {
            const response = await fetch(venuesUrl + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method,
                body
            })

            if (response.ok) {
                alert("Your have successfully updated your venue");
                navigate(`/profile`);
            } else {
                alert("Ooooops... Something went wrong, try again")
            }
        } else {
            alert("Take another look at the media/picture-field please")
        }
    }

    function checkPattern(check) {
        return (
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(check)
        )
    }

    const [media1, setMedia1] = useState("");
    const [disabled1, setDisabled1] = useState(false);

    const updateMediaField = () => {
        if (checkPattern(media1)) {
            setMedia(existMedia => [...existMedia, media1])
            document.getElementById("media1").disabled = "true";
            setDisabled1(true);
        } else {
            alert("Use a valid url")
        }
    }

    const updateMeta = (e) => {
        setMeta({
            ...meta,
            [e.target.name]: e.target.checked,
        });
    };

    const changeLocation = (e) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <div>
                <h5>Fill in this form to update your venue</h5>
                <p className={styles.italic}>- You need to edit every field before pressing "Update Venue"</p>
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
                    multiline
                    rows={3}
                    value={description}
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
                    fullWidth
                    value={priceNumber}
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
                    fullWidth
                    value={maxGuestsValue}
                    {...register(`maxGuests`)}
                    onChange={(e) => setMaxGuestsValue(e.target.value)}
                />
                <p>{errors.maxGuests?.message}</p>
            </div>

            <div className={styles.mediaMessage}>
                <TextField
                    id="media1"
                    label="Ex: https://ibb.co/dKm1vrY"
                    name="media"
                    className={styles.input}
                    type="url"
                    value={media1}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <IconButton disabled={disabled1} onClick={updateMediaField}>
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
                            control={<Checkbox checked={pets} onChange={updateMeta} name="pets" />}
                            label="Pets"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={wifi} onChange={updateMeta} name="wifi" />}
                            label="Wifi"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={breakfast} onChange={updateMeta} name="breakfast" />}
                            label="Breakfast"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={parking} onChange={updateMeta} name="parking" />}
                            label="Parking"
                        />
                    </FormGroup>
                </FormControl>
            </div>
            <button onClick={handleSubmit(onSubmit)} className={styles.updateButton}>Update venue</button>
        </div >
    )
}

export default UpdateVenueForm;