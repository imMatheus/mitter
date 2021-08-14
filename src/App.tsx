import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import UserPage from './components/userpage/UserPage'
import SignUp from './components/registration/SignUp'
import Sidebar from './components/sidebar/Sidebar'
import MainFeed from './components/mainfeed/MainFeed'
function App() {
    return (
        <AuthProvider>
            <div className='App'>
                <div className='content'>
                    <Router>
                        <Sidebar />

                        <Switch>
                            {/* <SignUp /> */}
                            <Route exact path='/'>
                                <MainFeed />
                            </Route>
                            <Route exact path='/:userId'>
                                <UserPage />
                            </Route>
                        </Switch>
                        <Sidebar />
                    </Router>
                </div>
            </div>
        </AuthProvider>
    )
}

export default App
