import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import './style.css'

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
