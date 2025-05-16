export const getApiKey = (): string => {
  const key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
  if (!key) {
    throw new Error('VITE_OPENWEATHERMAP_API_KEY не установлен')
  }
  return key
}
