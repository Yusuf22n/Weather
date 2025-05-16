import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

interface InputCityProps {
  onCitySubmit: (city: string) => void
}

const cityOptions = ['Berlin', 'London', 'Paris', 'Rome', 'Madrid', 'Moscow']

export const InputCity: React.FC<InputCityProps> = ({ onCitySubmit }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (inputValue.trim()) {
      onCitySubmit(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        freeSolo
        options={cityOptions}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField {...params} label="Введите город" variant="outlined" fullWidth />
        )}
      />
    </form>
  )
}
