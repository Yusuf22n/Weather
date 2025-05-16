import axios from 'axios'
import { WeatherData } from '../types/weather'
import { getApiKey } from '../utils/env'

export const fetchCoordinates = async (city: string) => {
  try {
    const apiKey = getApiKey()
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    )
    if (response.data.length === 0) {
      throw new Error('Город не найден')
    }
    return response.data[0]
  } catch (error) {
    console.error('Ошибка при получении координат:', error)
    return null
  }
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const apiKey = getApiKey()
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка при получении погоды:', error)
    return null
  }
}
