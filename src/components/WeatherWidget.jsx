import { useState, useEffect } from 'react'

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [city, setCity] = useState('New York')
    const [inputCity, setInputCity] = useState('')

    // Free weather API (no key required): https://open-meteo.com/
    // Or use OpenWeatherMap with free API key: https://openweathermap.org/api

    // TODO: Function to fetch weather data
    const fetchWeather = async (cityName) => {
        setLoading(true)
        setError(null)

        try {
            // Example using Open-Meteo API (no key required):
            // 1. First get coordinates for the city
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`

            // TODO: Fetch geocoding data
            const geoResponse = await fetch(geoUrl)
            const geoData = await geoResponse.json()

            // TODO: Check if city was found
            if (!geoData.results || geoData.results.length === 0) {
               throw new Error('City not found')
            }

            // TODO: Get weather for the coordinates
            const { latitude, longitude } = geoData.results[0]
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

            // TODO: Fetch weather data
            const weatherResponse = await fetch(weatherUrl)
            const weatherData = await weatherResponse.json()

            // TODO: Set weather data
            setWeather({
               city: geoData.results[0].name,
               temperature: weatherData.current_weather.temperature,
               description: getWeatherDescription(weatherData.current_weather.weathercode),
               windSpeed: weatherData.current_weather.windspeed
             })

            // Placeholder data (remove when implementing real API)

        } catch (err) {
            setError(err.message || 'Failed to fetch weather')
        } finally {
            setLoading(false)
        }
    }

    // Helper function to convert weather codes to descriptions
    const getWeatherDescription = (code) => {
        // Weather codes from Open-Meteo API
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            61: 'Slight rain',
            71: 'Slight snow',
            95: 'Thunderstorm'
        }
        return weatherCodes[code] || 'Unknown'
    }

    // TODO: Fetch weather on component mount
    useEffect(() => {
        fetchWeather(city)
    }, [])

    // TODO: Handle city search
    const handleSearch = (e) => {
        e.preventDefault()
        if (inputCity.trim()) {
            setCity(inputCity)
            fetchWeather(inputCity)
            setInputCity('')
        }
    }

    return (
        <div className="weather-widget">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="weather-search">
                <input
                    type="text"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="weather-input"
                />
                <button type="submit" className="weather-search-btn">
                    Search
                </button>
            </form>

            {/* Weather Display */}
            {loading && <p className="weather-loading">Loading weather...</p>}

            {error && <p className="weather-error">Error: {error}</p>}

            {weather && !loading && (
                <div className="weather-info">
                    <h3>{weather.city}</h3>
                    <div className="weather-temp">
                        {Math.round(weather.temperature)}°F
                    </div>
                    <div className="weather-description">
                        {weather.description}
                    </div>
                    <div className="weather-wind">
                        Wind: {weather.windSpeed} mph
                    </div>
                </div>
            )}

            {/* Refresh Button */}
            <button
                onClick={() => fetchWeather(city)}
                className="weather-refresh"
                disabled={loading}
            >
                Refresh
            </button>
        </div>
    )
}

export default WeatherWidget