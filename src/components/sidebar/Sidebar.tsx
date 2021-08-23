import React from 'react'
import { Home, Hash, Bell, Mail, User, MoreHorizontal } from 'react-feather'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
export default function Sidebar() {
    const { logout, currentUser } = useAuth()
    return (
        <div className='sidebar-container brd-right'>
            <Link to='/'>
                <div className='option'>
                    <Home />
                    Home
                </div>
            </Link>
            <Link to='/'>
                <div className='option'>
                    <Hash />
                    Explore
                </div>
            </Link>
            <Link to='/'>
                <div className='option'>
                    <Bell />
                    Notifications
                </div>
            </Link>
            <Link to='/messages'>
                <div className='option'>
                    <Mail />
                    Messages
                </div>
            </Link>
            <Link to={`/u/${currentUser!.displayName}`}>
                <div className='option'>
                    <User />
                    Profile
                </div>
            </Link>
            <Link to='/'>
                <div className='option' onClick={logout}>
                    <MoreHorizontal />
                    More
                </div>
            </Link>
        </div>
    )
}
