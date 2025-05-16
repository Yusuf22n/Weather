import React from 'react'
import { WeatherData } from '../types/weather'

interface Props {
  data: WeatherData
  onRemove: () => void
}

export const WeatherCard: React.FC<Props> = ({ data, onRemove }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{data.name}</h2>
    <div className="space-y-2 text-gray-600">
      <p>🌡 Температура: {data.main.temp}°C</p>
      <p>🌪 Давление: {data.main.pressure} hPa</p>
      <p>💧 Влажность: {data.main.humidity}%</p>
      <p>💨 Ветер: {data.wind.speed} м/с</p>
    </div>
    <button
      onClick={onRemove}
      className="mt-4 p-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
    >
      Удалить
    </button>
  </div>
)
