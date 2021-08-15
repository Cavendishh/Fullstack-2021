import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then((r) => setWeather(r.data))
  }, []) //eslint-disable-line

  if (!weather) return <></>

  return (
    <>
      <h3>Weather in {capital}</h3>
      <strong>Temparature: </strong>
      {weather.main.temp} Celsius <br />
      <strong>Humidity: </strong>
      {weather.main.humidity} % <br />
      <strong>Wind: </strong>
      {weather.wind.speed} m/s, direction {weather.wind.deg} degrees
    </>
  )
}

export default Weather
