import { useState } from 'react'
import { InputCity } from './components/InputCity'
import { WeatherCard } from './components/WeatherCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { fetchCoordinates, fetchWeather } from './api/weatherApi'
import { WeatherData } from './types/weather'

const App: React.FC = () => {
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([])
  const [selectedMetric, setSelectedMetric] = useState<'temp' | 'pressure' | 'humidity' | 'wind'>(
    'temp'
  )

  const handleCitySubmit = async (city: string) => {
    const coordinates = await fetchCoordinates(city)
    if (coordinates) {
      const weatherData = await fetchWeather(coordinates.lat, coordinates.lon)
      if (weatherData) {
        setWeatherDataList((prev) => [...prev, weatherData])
      } else {
        alert('Не удалось получить данные о погоде')
      }
    } else {
      alert('Город не найден')
    }
  }

  const removeCity = (index: number) => {
    setWeatherDataList((prev) => prev.filter((_, i) => i !== index))
  }

  const chartData = weatherDataList.map((data) => ({
    name: data.name,
    temp: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  }))

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🌤️ Сравнение погоды в городах
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <InputCity onCitySubmit={handleCitySubmit} />

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Выберите метрику:</label>
          <select
            value={selectedMetric}
            onChange={(e) =>
              setSelectedMetric(e.target.value as 'temp' | 'pressure' | 'humidity' | 'wind')
            }
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="temp">Температура (°C)</option>
            <option value="pressure">Давление (hPa)</option>
            <option value="humidity">Влажность (%)</option>
            <option value="wind">Ветер (м/с)</option>
          </select>
        </div>

        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg overflow-auto">
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 5 }}
            />
          </LineChart>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {weatherDataList.map((data, index) => (
            <WeatherCard key={index} data={data} onRemove={() => removeCity(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
