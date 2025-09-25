import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
    // TODO: Get theme and toggleTheme from context using useTheme hook
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {/* TODO: Show appropriate icon/text based on current theme */}
            {/* Hint: Use a ternary operator */}
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}

export default ThemeToggle