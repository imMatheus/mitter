import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import UserPage from './components/userpage/UserPage'
import SignUp from './components/registration/SignUp'
import Sidebar from './components/sidebar/Sidebar'
import MainFeed from './components/mainfeed/MainFeed'
import MyMessages from './components/messages/MyMessages'
import Chat from './components/messages/Chat'
function App() {
    const { currentUser } = useAuth()
    console.log(currentUser)

    return (
        <AuthProvider>
            <div className='App'>
                <div className='content'>
                    {!currentUser ? (
                        <Router>
                            <Sidebar />

                            <Switch>
                                {/* <SignUp /> */}
                                <Route exact path='/'>
                                    <MainFeed />
                                </Route>
                                <Route exact path='/messages'>
                                    <MyMessages />
                                </Route>
                                <Route exact path='/messages/:chatId'>
                                    <Chat />
                                </Route>
                                <Route exact path='/u/:userId'>
                                    <UserPage />
                                </Route>
                            </Switch>
                            {/* <Sidebar /> */}
                            <Sidebar />
                        </Router>
                    ) : (
                        <SignUp />
                    )}
                </div>
            </div>
        </AuthProvider>
    )
}

export default App
