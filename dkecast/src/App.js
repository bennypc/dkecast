import './App.css';
import React, { useState, useEffect } from 'react';

function Logo() {
  return(
    <div className='flex text-center w-full justify-center'>
      <img 
      src={require('./images/dkecast.gif')}
      alt="logo" />
    </div>
  )
}

function getDirection(angle) {
  var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
}


function GetWeather() {
  const [state, setState] = useState({
    temp: '',
    temp_min: '',
    temp_max: '',
    feelsLike: '',
    humidity: '',
    description: '',
    wind_speed: '',
    wind_direction: '',
    name: '',
    country: ''
  });

  useEffect(()=>{
    (async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=vancouver&APPID=f9866d2c0c308ed41a101b078dd14ae9`,
          { mode: "cors" }
        );
    
        const cityData = await response.json();
    
        const data = cityData.main;
        const wind = cityData.wind;
        const status = cityData.weather[0];
        const location = cityData.sys;


        setState({
          temp: Math.round(data.temp - 273),
          temp_min: Math.round(data.temp_min - 273),
          temp_max: Math.round(data.temp_max - 273),
          feelsLike: Math.round(data.feels_like - 273),
          humidity: data.humidity,
          description: status.description,
          wind: wind.speed,
          wind_direction: getDirection(wind.deg),
          name: cityData.name,
          country: location.country
          })
      }
      catch {
        console.log('catch error');
      }

       
     })()
 }, [])

  if(!state) {
    return(
      <div>Loading..</div>
    )
  }
  return(
    
    <div>
        <div className="data_container flex text-center w-full justify-center">
          <p className="temp"></p>
          <div className="data text-white">
            <br></br>
            <p>better than the fucking iphone weather app</p>
            <br></br>
            <p className="temp text-4xl">{"TEMPERATURE: " + JSON.stringify(state.temp) + " DEGREES"}</p>
            <br></br>
            <p className="feels_like temp text-2xl">{"FEELS LIKE " + JSON.stringify(state.feelsLike) + " DEGREES"}</p>
            <br></br>
            <p className="temp_min temp text-2xl">{"MINIMUM: " + JSON.stringify(state.temp_min) + " DEGREES"}</p>
            <p className="temp_max temp text-2xl">{"MAXMIMUM: " + JSON.stringify(state.temp_max) + " DEGREES"}</p>
            <br></br>
            <p className="wind  text-2xl">{"WIND SPEED: " + JSON.stringify(state.wind) + "M/S"}</p>
            <p className="wind_direction text-2xl">{"WIND DIRECTION: " + JSON.stringify(state.wind_direction).replace(/\"/g, "").toUpperCase()}</p>
            <br></br>
            <p className="humidity text-2xl">{"HUMIDITY: " + JSON.stringify(state.humidity) + "%"}</p>
            <br></br>
            <p className="conditions">{"CONDITIONS: " + JSON.stringify(state.description.replace(/\"/g, "")).toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}

  
function App() {
  return (
    <div>
      <Logo />
      <GetWeather/>
    </div>
  );
}

export default App;
