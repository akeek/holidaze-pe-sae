import React from "react";
import styles from "../../styles/latest.module.css";
import Placeholder from "../../assets/images/placeholder.svg"

function VenuesCard(props) {
  const { id, media, rating, price, description } = props;

  let destination;
  if ((props.city !== "Unknown" && props.city !== "" && props.country !== "Unknown" && props.country !== "")) {
    destination = <p>{props.city}, {props.country}</p>
  } else {
    destination = <p>Unknown location</p>
  }

  const specificId = 'specific/' + id

  return (
    <div className={styles.card}>
      <a href={specificId} className={styles.cardLink}>
        {media.length ?
          <img loading="lazy" src={media[0]} alt="" className={styles.gridImg}  /> : <img src={Placeholder} alt="" className={styles.gridImg} />}
        <div className={styles.cardInfoContainer}>
            <div className={styles.cardinfo}>
              <p>{destination}</p>
              <p>&#9733;{rating}</p>
            </div>
          <p className={styles.descinfo}>{description}</p>
          <p className={styles.priceinfo}>Per night: ${price}</p>
        </div>
      </a>
    </div>
  );
}

export default VenuesCard;
