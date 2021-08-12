import React from 'react'
import Home from './components/Home'
import SignUp from './components/registration/SignUp'
import { AuthProvider } from './context/AuthContext'
function App() {
    return (
        <AuthProvider>
            <div className='App'>
                <SignUp />
                <Home />
            </div>
        </AuthProvider>
    )
}

export default App
