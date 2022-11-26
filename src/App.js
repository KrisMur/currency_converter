import React, {useState, useEffect } from 'react';
import Header from './components/Header';
import Converter from './components/Converter';
import '../src/App.css'


function App() {

  const [appState, setAppState] = useState({ loading: false }) /*текучий стан */

  const [exchangeRateUSD, setExengeRateUSD] = useState(); /*текучий курс валют USD*/
  const [exchangeRateEUR, setExengeRateEUR] = useState(); /*текучий курс валют EUR*/

  const [selectedCurrency1, setSelectedCurrency1State] = useState('USD'); /*вибрана валюта 1*/
  const [selectedCurrency2, setSelectedCurrency2State] = useState('USD'); /*вибрана валюта 2*/

  const [inputAmount1, setinputAmount1] = useState(0); /*вибрана кількіть валюти для конвертації 1*/
  const [inputAmount2, setInputAmount2] = useState(0); /*вибрана кількіть валюти для конвертації 2*/

  /*Отримання дійсного співвідношення курсів валют з API*/
  useEffect(() => {
    setAppState({ loading: true })
    const user = process.env.REACT_APP_CURRENCU_API;
    fetch(user)
      .then((res) => res.json())
      .then((result) => {
        setExengeRateUSD([result.data.USD.value])
        setExengeRateEUR([result.data.EUR.value])
        setAppState({ loading: false});
      });
  }, [setAppState]);


  /*Функція розрахунку відношення курсів валют*/
  function CoverterOnChangeValue (convertibleСurrency, fixedСurrency, value) {
    let result

    switch(convertibleСurrency) {
      case 'UAH':
        fixedСurrency === 'USD' 
          ? result = (value * exchangeRateUSD ) 
          : result = (value * exchangeRateEUR )
      break

      case 'USD':
        fixedСurrency === 'UAH' 
          ? result = (value * (1 / exchangeRateUSD)) 
          : result = (value * (exchangeRateEUR / exchangeRateUSD))
      break
    
    case 'EUR' :
      fixedСurrency === 'UAH' 
        ? result = (value * (1 / exchangeRateEUR)) 
        : result = (value * (exchangeRateUSD / exchangeRateEUR))
      break

      default :
        break
    }

    return result
  };

  /*Дії при зміні значення в полі вводу 1*/
  const onChangeHandlerInput1 = event => {
    let inputValue = event.target.value
    if (inputValue < 0) {
      inputValue = 0
    }
    setinputAmount1(inputValue);

    if (selectedCurrency1 === selectedCurrency2 ) {
      setInputAmount2(inputValue)
    } else {
      setInputAmount2(CoverterOnChangeValue(selectedCurrency1, selectedCurrency2, inputValue))
    }
  };

    /*Дії при зміні значення в полі вводу 2*/
  const onChangeHandlerInput2 = event => {
    let inputValue = event.target.value
    if (inputValue < 0) {
      inputValue = 0
    }
    setInputAmount2(inputValue);

    if (selectedCurrency1 === selectedCurrency2 ) {
      setinputAmount1(inputValue)
    } else {
      setinputAmount1((CoverterOnChangeValue(selectedCurrency2, selectedCurrency1, inputValue)))
    }
  };

    /*Дії при зміні значення в селекторі валют 1*/
  const onChangeHandlerSelector1 = event => {
    const inputCurrency = event.target.value;
    setSelectedCurrency1State(inputCurrency)

    if (inputCurrency === selectedCurrency2 ) {
      setInputAmount2(1)
    } else {
      setInputAmount2(CoverterOnChangeValue(inputCurrency, selectedCurrency2, inputAmount1 ))
    }
  };

    /*Дії при зміні значення в селекторі валют 2*/
  const onChangeHandlerSelector2 = event => {
    const inputCurrency = event.target.value;
    setSelectedCurrency2State(inputCurrency)

    if (selectedCurrency1 === inputCurrency) {
      setinputAmount1(1)
    } else {
      setinputAmount1(CoverterOnChangeValue( inputCurrency, selectedCurrency1, inputAmount2))
    }
  };

    /*Дані для передачі в компоненти*/
  const props = [ exchangeRateUSD, exchangeRateEUR]
  const propsFor1Converter = [onChangeHandlerInput1, inputAmount1, onChangeHandlerSelector1]
  const propsFor2Converter = [onChangeHandlerInput2, inputAmount2, onChangeHandlerSelector2]


  return (
    <div className="app">
      <Header props = { props }/>
      <div className='converter-wrapper'>
        <Converter propsForConverter = {propsFor1Converter}/>
        <Converter propsForConverter = {propsFor2Converter}/>
      </div>


    </div>
  );
}
  export default App;


