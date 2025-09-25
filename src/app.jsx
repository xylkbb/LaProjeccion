import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './components/Dashboard.jsx'

// Main App component that wraps everything with ThemeProvider.jsx
const App = () => {
    return (
        <ThemeProvider>
            <div className="app">
                <Dashboard />
            </div>
        </ThemeProvider>
    )
}

export default App