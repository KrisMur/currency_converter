import React from "react";
import '.././components/Header.css'

function Header ({props}) {
  return (
    <div className="header_container">
      <div className="header_container_item">Current exchange rate :</div>
      <div className="header_container_item">1 PLN = {Math.round(parseFloat(props[0]) * 1000) / 1000} USD</div>
      <div className="header_container_item">1 PLN = {Math.round(parseFloat(props[1]) * 1000) / 1000} EUR</div>
    </div>
  );
};

export default Header;