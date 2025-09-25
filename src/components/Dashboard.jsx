import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import TaskManager from './TaskManager'
import WeatherWidget from './WeatherWidget'
import QuoteCollection from './QuoteCollection'

const Dashboard = () => {
    // You can add any dashboard-level state here if needed
    const [userName] = useState('User')

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome to Your Personal Dashboard, {userName}!</h1>
                <ThemeToggle />
            </header>

            <main className="dashboard-main">
                <div className="dashboard-grid">
                    {/* Task Manager Section */}
                    <section className="dashboard-section task-section">
                        <h2>📝 Task Manager</h2>
                        <TaskManager />
                    </section>

                    {/* Weather Widget Section */}
                    <section className="dashboard-section weather-section">
                        <h2>🌤️ Weather</h2>
                        <WeatherWidget />
                    </section>

                    {/* Quote Collection Section */}
                    <section className="dashboard-section quote-section">
                        <h2>💭 Quote Collection</h2>
                        <QuoteCollection />
                    </section>
                </div>
            </main>

            <footer className="dashboard-footer">
                <p>© 2024 Personal Dashboard - Built with React & Vite</p>
            </footer>
        </div>
    )
}

export default Dashboard