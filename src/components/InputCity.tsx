import React, { useState } from "react";

interface InputCityProps {
  onCitySubmit: (city: string) => void;
}

export const InputCity: React.FC<InputCityProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCitySubmit(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите город..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
        Получить
      </button>
    </form>
  );
};
