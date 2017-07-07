import React, { Component } from 'react'
import openweather from '../../config/weather.json'
import axios from 'axios'
import './WeatherForecastPage.css'

export default class WeatherForecastPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentWeather: null,
      forecastWeather: null
    }
  }

  componentWillMount () {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=870-0152,jp&appid=${openweather.apikey}&units=metric`)
      .then((res) => {
        console.log(new Date(Number(String(res.data.sys.sunrise)+'000')))
        this.setState({
          currentWeather: res.data
        })
      })
      .catch((err) => {
        //do nothing
        console.log(err)
      })
      axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=870-0152,jp&appid=${openweather.apikey}&units=metric`)
        .then((res) => {
          this.setState({
            forecastWeather: res.data
          })
        })
        .catch((err) => {
          //do not
          console.log(err)
        })
  }

  render () {
    return (
      <div>
        {
          this.state.currentWeather == null
          ? null
          : 
          (
            <div>
              <img src={`http://openweathermap.org/img/w/${(this.state.currentWeather.weather)[0].icon}.png`} alt="current weather icon"/>
              <h2>
                {(new Date(Number(String(this.state.currentWeather.dt)+'000'))).toDateString()}<br/>
                {(new Date(Number(String(this.state.currentWeather.dt)+'000'))).toLocaleTimeString()}
              </h2>
              <h3>{(this.state.currentWeather.weather)[0].description}</h3>
              <p>
                Current temperature: {this.state.currentWeather.main.temp}°C<br/>
                Min temperature: {this.state.currentWeather.main.temp_min}°C<br/>
                Max temperature: {this.state.currentWeather.main.temp_max}°C<br/>
                Pressure: {this.state.currentWeather.main.pressure} mBar<br/>
                Humidity: {this.state.currentWeather.main.humidity}%<br/>
                Sunrise at {(new Date(Number(String(this.state.currentWeather.sys.sunrise)+'000'))).toLocaleTimeString()}<br/>
                Sunset at {(new Date(Number(String(this.state.currentWeather.sys.sunset)+'000'))).toLocaleTimeString()}<br/>
              </p>
            </div>
          )
        }
      </div>
    )
  }
}
