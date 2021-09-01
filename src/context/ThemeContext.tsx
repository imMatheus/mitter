import React, { createContext, useContext, useEffect, useState } from 'react'

interface Context {
    theme: 'light' | 'dimmed' | 'dark'
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dimmed' | 'dark'>>
}

const ThemeContext = createContext<Context>({
    theme: 'light',
    setTheme: () => null,
})

export function useTheme() {
    return useContext(ThemeContext)
}

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dimmed' | 'dark'>('light')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])
    const value = {
        theme,
        setTheme,
    }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
