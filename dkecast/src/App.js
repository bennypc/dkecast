import './App.css';
import React, { useState, useEffect } from 'react';



function GetWeather() {
  const [state, setState] = useState({
    temp: '',
    temp_min: '',
    temp_max: '',
    feelsLike: '',
    humidity: '',
    description: '',
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
        const status = cityData.weather[0];
        const location = cityData.sys;


        setState({
          temp: Math.round(data.temp - 273),
          temp_min: Math.round(data.temp_min - 273),
          temp_max: Math.round(data.temp_max - 273),
          feelsLike: Math.round(data.feels_like - 273),
          humidity: data.humidity,
          description: status.description,
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
        <div className="data_container">
          <p className="temp"></p>
          <div className="data text-white">
            <p className="temp">{"city: " + JSON.stringify(state.name)}</p>
            <p className="temp">{"country: " + JSON.stringify(state.country)}</p>
            <br></br>
            <p className="temp">{"temp: " + JSON.stringify(state.temp) + " celcius"}</p>
            <p className="feels_like">{"feels like " + JSON.stringify(state.feelsLike) + " celcius"}</p>
            <p className="temp_min">{"min: " + JSON.stringify(state.temp_min) + " celcius"}</p>
            <p className="temp_max">{"max: " + JSON.stringify(state.temp_max) + " celcius"}</p>
            <p className="humidity">{"humidity: " + JSON.stringify(state.humidity) + "%"}</p>
            <br></br>
            <p className="humidity">{"conditions: " + JSON.stringify(state.description)}</p>
        </div>
      </div>
    </div>
  )
}

  
function App() {
  return (
    <div>
      <GetWeather/>
    </div>
  );
}

export default App;
