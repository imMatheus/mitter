import React from 'react'
import { useAuth } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserPage from './components/userpage/UserPage'
import SignUp from './components/registration/SignUp'
import Sidebar from './components/sidebar/Sidebar'
import MainFeed from './components/mainfeed/MainFeed'
import MyMessages from './components/messages/MyMessages'
import Chat from './components/messages/Chat'
function App() {
    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='App'>
                <div className='content'>
                    {currentUser ? (
                        <>
                            <Sidebar />

                            <Switch>
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
                            <Sidebar />
                        </>
                    ) : (
                        <SignUp />
                    )}
                </div>
            </div>
        </Router>
    )
}

export default App
