import React from "react";
import './Converter.css'

function Converter ({propsForConverter}) {
  return (
      <div className="converter">
      <div className="converter-item-text">*Enter the amount to exchange</div>
      <input
        type="number"
        min='0'
        onChange={propsForConverter[0]}
        value={propsForConverter[1]}>
      </input>

      <div className="converter-item-text">*Select the currency to exchange</div>
      <select
        name="selected selectedCurrency1"
        required="required"
        onChange={propsForConverter[2]}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="PLN">PLN</option>
      </select>
    </div>
  );
};

export default Converter