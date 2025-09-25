import { createContext, useContext, useState, useEffect } from 'react'

// Create a context for theme management
const ThemeContext = createContext()

// Custom hook to use the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    // TODO: Initialize theme state with 'light' as default
    // Hint: Check localStorage for saved theme preference
    const [theme, setTheme] = useState('light')

    // TODO: Create a function to toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        }else setTheme('light')
    }

    // TODO: Use useEffect to:
    // 1. Apply theme class to document.body
    // 2. Save theme preference to localStorage
    useEffect(() => {
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme)
    }, [theme])

    // TODO: Load saved theme from localStorage on mount
    useEffect(() => {
        // Your code here
    }, [])

    const value = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}