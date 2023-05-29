import React, { useState } from "react";
import ApiHook from "../../hooks/apiHook";
import VenuesCard from "../../components/cards/VenueCard";
import styles from "../../styles/venues.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



function Venues() {
    const { data, isLoading, isError } = ApiHook(
        "https://api.noroff.dev/api/v1/holidaze/venues?limit=40"
    );

    const [search, setSearch] = useState("");

    const filteredData = data.filter((venue) => {
        return (
            venue.location.continent.toLowerCase().startsWith(search.toLowerCase()) ||
            venue.location.country.toLowerCase().startsWith(search.toLowerCase()) ||
            venue.location.city.toLowerCase().startsWith(search.toLowerCase())
        )
    });

    console.log(data);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError) {
        return <div>Oooops... An error there has been</div>;
    }

    return (
        <div>
            <div className={styles.search}>
                <div className={styles.searchContainer}>
                    <h1>
                        Search to find a venue
                    </h1>
                    <div>
                        <input
                            className={styles.searchBar}
                            type="text"
                            placeholder="Ex: Europe, USA, Buskerud..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <Container>
                {filteredData.length > 0 ? (
                    <Row>
                        <h3>The latest listings</h3>
                        {filteredData.map((venue) => {
                            return (
                                <Col
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={venue.id}
                                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                                >
                                    <VenuesCard media={venue.media} id={venue.id} rating={venue.rating} city={venue.location.city} price={venue.price} description={venue.description} />
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <div>
                        <p className={styles.novenue}> Ooops... No venues match your searchword</p>
                    </div>
                )
                }

            </Container>
        </div>
    );
}

export default Venues;
