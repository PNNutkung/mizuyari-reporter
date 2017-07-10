import React, { Component } from 'react'
import apixu from '../../config/weather.json'
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap'

export default class WeatherForecastPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentWeather: null,
      location: null
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
          currentWeather: res.data.current,
          location: res.data.location
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
            <div className='card'>
              <ProgressBar active now={100} />
            </div>
          )
          : 
          (
            <div className='card weather-forecast'>
              <div className="location">
                {this.state.location.name}
              </div>
              <div className="date">
                {(new Date(Number(String(this.state.location.localtime_epoch)+'000'))).toLocaleTimeString()} {(new Date(Number(String(this.state.location.localtime_epoch)+'000'))).toDateString()}
              </div>
              <div className="description">
                {this.state.currentWeather.condition.text}
              </div>
              <div className='current'>
                <div className="visual">
                  <img className='icon' src={`https:${this.state.currentWeather.condition.icon}`} alt="current weather icon"/>
                  <div className="temperature">
                    <span className="value">{this.state.currentWeather.temp_c}</span>
                    <span className="scale">°C</span>
                  </div>
                </div>
                <div className="description">
                    <div className="feelslike">
                      {this.state.currentWeather.feelslike_c}°C
                    </div>
                    <div className="humidity">
                      {this.state.currentWeather.humidity}%
                    </div>
                    <div className="wind">
                      <span className="value">{this.state.currentWeather.wind_kph}</span>
                      <span className="scale"> kph </span>
                      <span className="direction">{this.state.currentWeather.wind_degree}</span>°
                    </div>
                  </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
