import React from "react";

function Header ({props}) {

  return (
    <div>
      100 UAH = {props[0] * 100} USD
      100 UAH = {props[1] * 100} EUR
    </div>

  );
};

export default Header;