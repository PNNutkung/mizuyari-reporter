import React from 'react'
import { shallow } from 'enzyme'
import WeatherForecastPage from '../WeatherForecastPage'
import data from './weatherForecastData.json'

describe('<WeatherForecastPage />', () => {
  it('renders with progress-bar', () => {
    const forecast = shallow(
      <WeatherForecastPage />
    )
    expect(forecast.find('div.weather-forecast-progress-bar')).toHaveClassName('weather-forecast-progress-bar')
  })
})
