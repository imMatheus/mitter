import React from 'react'
import { useAuth } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserPage from './components/userpage/UserPage'
import SignUp from './components/registration/SignUp'
import Sidebar from './components/sidebar/Sidebar'
import MainFeed from './components/mainfeed/MainFeed'
import MyMessages from './components/messages/MyMessages'
import Chat from './components/messages/Chat'
import Explore from './components/explore/Explore'
import Settings from './components/settings/Settings'
import { useTheme } from './context/ThemeContext'

function App() {
    const { currentUser } = useAuth()
    const { theme } = useTheme()

    return (
        <Router>
            <div className={`App ${theme}`}>
                <div className='content'>
                    {currentUser ? (
                        <>
                            <Sidebar />

                            <Switch>
                                <Route exact path='/'>
                                    <MainFeed />
                                </Route>
                                <Route exact path='/settings'>
                                    <Settings />
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
                            <Explore />
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
