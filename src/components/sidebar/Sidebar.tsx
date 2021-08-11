import React from 'react'
import { Home, Hash, Bell, Mail, User, MoreHorizontal } from 'react-feather'
export default function Sidebar() {
    return (
        <div className='sidebar-container brd-right'>
            <div className='option'>
                <Home /> <span>Home</span>
            </div>
            <div className='option'>
                <Hash /> <span>Explore</span>
            </div>
            <div className='option'>
                <Bell /> <span>Notifications</span>
            </div>
            <div className='option'>
                <Mail /> <span>Messages</span>
            </div>
            <div className='option'>
                <User /> <span>Profile</span>
            </div>
            <div className='option'>
                <MoreHorizontal /> <span>More</span>
            </div>
        </div>
    )
}
