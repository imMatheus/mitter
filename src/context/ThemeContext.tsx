import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import useLocalStorage from '../hooks/useLocalStorage'
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
    const { currentUser } = useAuth()
    console.log(currentUser)

    const [theme, setTheme] = useLocalStorage<'light' | 'dimmed' | 'dark'>(
        'theme',
        (currentUser && currentUser.theme) || 'light'
    )

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])
    useEffect(() => {
        if (currentUser) setTheme(currentUser.theme)
    }, [currentUser])
    const value = {
        theme,
        setTheme,
    }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
