import React, {useState, useEffect} from "react";
import "./App.css";
import { oneForecastPerDay } from "./utils";
import { cities } from "./utils";

import Forecast from "./components/forecast";
import Weather from "./components/weather";


const App = () => {

  const apiKey = process.env.REACT_APP_MY_API_ID;

  const [weather, setWeather] = useState("null");

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => setWeather(json))
  }

  const [city, setCity] = useState('Prague');
    useEffect(() => {
      fetchWeather();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])

  const [forecast, setForecast] = useState(null);
  const fetchFiveDaysWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
      // .then(json => setForecast(json)) 
    .then(json => setForecast(oneForecastPerDay(json.list, 8))) 
    }
    useEffect(() => {
    fetchFiveDaysWeather();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weather])


  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App</h1>

        <div className="select-wrapper">
          <select
            className="select"
            name="cityselect"
            id="cityselect"
            value={city}
            onChange={({target}) => setCity(target.value)}>
            {cities.map(city => <option value={city} key={city}>{city}</option>)}
          </select>
        </div>

        <div className="weather">
            <Weather weather = {weather}/>
          
            <div className="weather__forecast" id="predpoved">
            <Forecast forecast = {forecast} />
            </div>
        
        </div>

        
      </div>
    </div>
  );
};

export default App;
