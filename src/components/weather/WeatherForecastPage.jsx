import React, { Component } from 'react'
import apixu from '../../config/weather.json'
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap'
import './WeatherForecastPage.css'

export default class WeatherForecastPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null,
      currentWeather: null,
      forecastWeather: null
    }
  }

  componentWillMount () {
    axios.get(apixu.FORECAST_URL, {
      params: {
        key: apixu.API_KEY,
        q: apixu.LOCATION,
        days: 8
      }
    })
      .then((res) => {
        this.setState({
          location: res.data.location,
          currentWeather: res.data.current,
          forecastWeather: res.data.forecast.forecastday.slice(1)
        })
      })
      .catch((err) => {
        //do not
        console.log(err)
      })
  }

  render () {
    let days = ['日', '月', '火', '水', '木', '金', '土']
    let future = []
    if (this.state.forecastWeather) {
       this.state.forecastWeather.forEach(item => {
        future.push(
          <div className='oneday' key={item.date_epoch}>
            <div className='date'>{days[(new Date(Number(String(item.date_epoch)+'000'))).getDay()]}</div>
            <div className='icon'>
              <img className='icon' src={`https:${item.day.condition.icon}`} alt='Weather icon' />
            </div>
            <div className='temp-high'>
              <span className='value'>{item.day.maxtemp_c}</span>°
            </div>
            <div className='temp-low'>
              <span className='value'>{item.day.mintemp_c}</span>°
            </div>
          </div>
        )
      })
    }
    return (
      <div id='weather-forecast-page'>
        {
          this.state.currentWeather == null
          ? (
            <div>
              <ProgressBar active now={100} />
            </div>
          )
          : 
          (
            <div className='weather-forecast'>
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
              <div className='future'>
                {future}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
