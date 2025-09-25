import {createContext, useContext, useState, useEffect} from 'react'

const ThemeContext = createContext()


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({children}) => {
    // TODO: Initialize theme state with 'light' as default
    const [theme, setTheme] = useState('light')

    // TODO: Create a function to toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else setTheme('light')
    }

    // TODO: Use useEffect to:

    useEffect(() => {
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme)
    }, [theme])

    // TODO: Load saved theme from localStorage on mount
    useEffect(() => {
        const savedThemes = localStorage.getItem('mount')
        if (savedThemes) {
            JSON.parse(savedThemes)
        }
    })

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