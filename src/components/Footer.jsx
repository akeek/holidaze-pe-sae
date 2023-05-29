import React from "react";
import { useMediaQuery } from "react-responsive";

function Footer() {

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  if (isMobile) {
    return <p></p>
  }

  return (
    <footer>
      <p className="footerText">This project was made using React as a JS Framework</p>
    </footer>
  );
}

export default Footer;
