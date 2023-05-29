import React from "react";
import RecentVenues from "./latest";
import styles from "../../styles/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <div className={styles.homeBanner}>
          <div className={styles.blur}>
            <p className={styles.adventure}>YOUR ADVENTURE STARTS HERE</p>
            <Link to="/venues">
              <button className={styles.bannerBtn}>Discover venues</button>
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <RecentVenues />
    </div>
  );
}

export default Home;
