import React from "react";
import '.././components/Header.css'

function Header ({props}) {
  return (
    <div className="header_container">
      <div className="header_container_item">Current exchange rate :</div>
      <div className="header_container_item">100 UAH = {props[0] * 100} USD</div>
      <div className="header_container_item">100 UAH = {props[1] * 100} EUR</div>
    </div>
  );
};

export default Header;