import React from "react";

const Footer = ({ isNavOpen }) => {
  return (
    <>
      <div className="footerContainer">
        <footer className={isNavOpen ? "footer blur-background" : "footer"}>
          {" "}
          &copy; www.<span>Beat</span>Music.com. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Footer;
