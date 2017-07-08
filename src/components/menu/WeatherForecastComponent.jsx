import React, { Component } from 'react'
import apixu from '../../config/weather.json'
import axios from 'axios'

export default class WeatherForecastPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentWeather: null
    }
  }

  componentWillMount () {
    axios.get(apixu.CURRENT_URL, {
      params: {
        key: apixu.API_KEY,
        q: apixu.LOCATION
      }
    })
      .then((res) => {
        this.setState({
          currentWeather: res.data.current
        })
      })
      .catch((err) => {
        //do nothing
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        {
          this.state.currentWeather == null
          ? (
            <div>
              <h1>Please connect to the Internet.</h1>
            </div>
          )
          : 
          (
            <div>
              <img src={`https:${this.state.currentWeather.condition.icon}`} alt="current weather icon"/>
              <h2>
                {(new Date(Number(String(this.state.currentWeather.last_updated_epoch)+'000'))).toDateString()}<br/>
                {(new Date(Number(String(this.state.currentWeather.last_updated_epoch)+'000'))).toLocaleTimeString()}
              </h2>
              <h3>{this.state.currentWeather.text}</h3>
              <p>
                Current temperature: {this.state.currentWeather.temp_c}°C<br/>
                Feels like: {this.state.currentWeather.feelslike_c}°C<br/>
                Pressure: {this.state.currentWeather.pressure_mb} mBar<br/>
                Humidity: {this.state.currentWeather.humidity}%<br/>
              </p>
            </div>
          )
        }
      </div>
    )
  }
}
