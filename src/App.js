import React, {useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';



function App() {

  const [appState, setAppState] = useState({ loading: false })  /*текучий стан */

  const [exchangeRateUSD, setExengeRateUSD] = useState(); /*текучий курс валют USD*/
  const [exchangeRateEUR, setExengeRateEUR] = useState(); /*текучий курс валют EUR*/

  const [currency1, setCurrency1State] = useState('UAH');  /*вибрана валюта */
  const [currency2, setCurrency2State] = useState('USD');

  const [inputValueToConvert1, setInputValueToConvert1] = useState(); /*вибрана кількіть валюти для конвертації*/
  const [inputValueToConvert2, setInputValueToConvert2] = useState();

  const props = [ exchangeRateUSD, exchangeRateEUR]

  useEffect(() => {
    setAppState({ loading: true })
    const user = `https://api.currencyapi.com/v3/latest?apikey=SBb83G1UVBv8Fr2ng27DrmSegTFdpilXqGZOAuNC&currencies=EUR%2CUSD&base_currency=UAH`;
    fetch(user)
      .then((res) => res.json())
      .then((result) => {
        setExengeRateUSD([result.data.USD.value])
        setExengeRateEUR([result.data.EUR.value])
        setAppState({ loading: false});
      });
  }, [setAppState]);



  function CoverterOnChangeValue (currencyActive, currencyRresult, value) {
    let result

    switch(currencyActive) {
      case 'UAH':
        currencyRresult === 'USD' 
          ? result = (value * exchangeRateUSD ) 
          : result = (value * exchangeRateEUR )
      break

      case 'USD':
        currencyRresult === 'UAH' 
          ? result = (value * (1 / exchangeRateUSD)) 
          : result = (value * (exchangeRateEUR / exchangeRateUSD))
      break
    
    case 'EUR' :
      currencyRresult === 'UAH' 
        ? result = (value * (1 / exchangeRateEUR)) 
        : result = (value * (exchangeRateUSD / exchangeRateEUR))
      break

      default :
        break
    }

    return result
  };

  const onChangeHandlerInput1 = event => {
    let inputValue = event.target.value
    if (inputValue < 0) {
      inputValue = 0
    }
    setInputValueToConvert1(inputValue);

     if (currency1 === currency2 ) {
      setInputValueToConvert2(inputValue)
     } else {
      setInputValueToConvert2(CoverterOnChangeValue(currency1, currency2, inputValue))
     }
  };

  const onChangeHandlerInput2 = event => {
    let inputValue = event.target.value
    if (inputValue < 0) {
      inputValue = 0
    }
    setInputValueToConvert2(inputValue);

    if (currency1 === currency2 ) {
      setInputValueToConvert1(inputValue)
    } else {
      setInputValueToConvert1((CoverterOnChangeValue(currency2, currency1, inputValue)))
    }
  };


  const onChangeHandlerSelector1 = event => {
    const inputCurrency = event.target.value;
    setCurrency1State(inputCurrency)

    if (inputCurrency === currency2 ) {
      setInputValueToConvert2(inputValueToConvert1)
    } else {
      setInputValueToConvert2(CoverterOnChangeValue(inputCurrency, currency2, inputValueToConvert1 ))
    }
    
  };

  const onChangeHandlerSelector2 = event => {
    const inputCurrency = event.target.value;
    setCurrency2State(inputCurrency)

    if (currency1 === inputCurrency) {
      setInputValueToConvert2(inputValueToConvert1)
    } else {
      setInputValueToConvert1(CoverterOnChangeValue(currency1, inputCurrency, inputValueToConvert2))
    }
    
  };



  return (
    <div className="App">

      <Header props = { props }/>


       <input type="number" min = '0' onChange={onChangeHandlerInput1} value={inputValueToConvert1}></input>

       <div>Currency code of the currency you would like to convert</div>

        <select 
        name="selected currency1" 
        required="required" 
        onChange={onChangeHandlerSelector1}>

          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option selected value="UAH">UAH</option>

        </select> 

         <div></div>

        <input type="number" min='0' onChange={onChangeHandlerInput2} value={inputValueToConvert2}></input>
        <div>Currency code of the currency you would like to convert</div>

        <select
          name="selected currency2" 
          required="required"
          onChange={onChangeHandlerSelector2}>

          <option selected value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>

        </select>

       <div>Result</div>
    </div>
  );
}

  export default App;