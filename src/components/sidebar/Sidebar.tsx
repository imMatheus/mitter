import React from 'react'
import { Home, Hash, Bell, Mail, User, MoreHorizontal } from 'react-feather'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
export default function Sidebar() {
    const { logout, currentUser } = useAuth()
    return (
        <div className='sidebar-container brd-right'>
            <div className='option'>
                <Home /> <Link to='/'>Home</Link>
            </div>
            <div className='option'>
                <Hash /> <Link to='/'>Explore</Link>
            </div>
            <div className='option'>
                <Bell /> <Link to='/'>Notifications</Link>
            </div>
            <div className='option'>
                <Mail /> <Link to='/messages'>Messages</Link>
            </div>
            <div className='option'>
                <User /> <Link to={`/u/${currentUser!.displayName}`}>Profile</Link>
            </div>
            <div className='option' onClick={logout}>
                <MoreHorizontal /> <Link to='/'>More</Link>
            </div>
        </div>
    )
}
