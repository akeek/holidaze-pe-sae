import React, { useState } from "react";
import styles from "../../styles/register.module.css";
import "react-toastify/dist/ReactToastify.css";
import { schemaReg } from "../../components/SchemaReg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";


function Register() {
    const [alert, setAlert] = useState(false);
    const [venueManager, setVenueManager] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        avatar: "",
        password: "",
        venueManager: false,
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(
                "https://api.noroff.dev/api/v1/holidaze/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...values,
                        venueManager: venueManager,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAlert(true);
                toast.success("You have registered", {
                    position: toast.POSITION.TOP_CENTER,
                });
                console.log(data);
            } else {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_CENTER,
                });
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body>
            <Formik
                validationSchema={schemaReg}
                onSubmit={handleSubmit}
                initialValues={initialValues}
            >
                {(formik) => {
                    const { handleSubmit, values } = formik;
                    return (
                        <div className={styles.registerContainer}>
                            <div className={styles.headerContainer}>
                                <h1>Register</h1>
                            </div>
                            <div className={styles.registerForm}>
                                <Form onSubmit={handleSubmit} className={styles.form}>
                                    <div>
                                        <label>Full name</label>
                                        <Field
                                            className={styles.input}
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={values.name}
                                            readOnly={false}
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="span"
                                            className="error"
                                        />
                                    </div>

                                    <div>
                                        <label>Email</label>
                                        <Field
                                            className={styles.input}
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={values.email}
                                            readOnly={false}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="error"
                                        />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <Field
                                            className={styles.input}
                                            type="text"
                                            name="password"
                                            placeholder="Enter your desired password"
                                            value={values.password}
                                            readOnly={false}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="error"
                                        />
                                    </div>
                                    <div>
                                        <label>Avatar</label>
                                        <Field
                                            className={styles.input}
                                            type="text"
                                            name="avatar"
                                            placeholder="Enter a valid Url"
                                            value={values.avatar}
                                            readOnly={false}
                                        />
                                        <ErrorMessage
                                            name="avatar"
                                            component="span"
                                            className="error"
                                        />
                                    </div>
                                    <div className={styles.checkContainer}>
                                        <label className={styles.checkLabel}>
                                            Check if you want to become a Venue Manager
                                        </label>
                                        <Field
                                            className={styles.checkbox}
                                            type="checkbox"
                                            name="venueManager"
                                            checked={venueManager}
                                            onChange={() => setVenueManager(!venueManager)}
                                            readOnly={false}
                                        />
                                        <ErrorMessage
                                            name="avatar"
                                            component="span"
                                            className="error"
                                        />
                                    </div>
                                    <br></br>
                                    <button type="submit" className={styles.formBtn}>
                                        Submit
                                    </button>
                                </Form>
                                <ToastContainer position="top-right" autoClose={1500} />
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </body>
    );
}

export default Register;
