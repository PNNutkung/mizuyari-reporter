import React, { Component } from 'react'
import apixu from '../../config/weather.json'
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
    axios.get(apixu.FORECAST_URL, {
      params: {
        key: apixu.API_KEY,
        q: apixu.LOCATION,
        days: 8
      }
    })
      .then((res) => {
        this.setState({
          currentWeather: res.data.current,
          forecastWeather: res.data.forecast.forecastday
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
              <h1>Please connect to the Internet.</h1>
            </div>
          )
          : 
          (
            <div className='weather-forecast'>
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
