import ApiHook from "../../hooks/apiHook";
import VenuesCard from "../../components/cards/VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-bootstrap";
import styles from "../../styles/latest.module.css";

function RecentVenues() {
  const { data, loading, error } = ApiHook(
    "https://api.noroff.dev/api/v1/holidaze/venues"
  );

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (isMobile) {
    return (
      <div className={styles.recentContainer}>
        <h2 className={styles.recent}>Recent venues</h2>
        <Carousel className={styles.carousel}>
          {data.slice(0, 4).map((venue) => {
            return (
              <Carousel.Item key={venue.id}>
                <VenuesCard media={venue.media} id={venue.id} rating={venue.rating} city={venue.location.city} country={venue.location.country} price={venue.price} description={venue.description} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

    );
  }

  return (
    <div>
      <Container>
        <h2>Recently Added Venues</h2>
        <Row className={styles.grid}>
          {data.slice(0, 8).map((venue) => {
            return (
              <Col
                xs={10}
                sm={7}
                md={4}
                lg={3}
                key={venue.id}
                className="col-10 col-sm-7 col-md-4 col-lg-3"
              >
                <VenuesCard media={venue.media} id={venue.id} rating={venue.rating} city={venue.location.city} country={venue.location.country} price={venue.price} description={venue.description} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default RecentVenues;
