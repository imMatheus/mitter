import React from 'react'
import MainFeed from './mainfeed/MainFeed'
import Sidebar from './sidebar/Sidebar'
export default function Home() {
    return (
        <div className='home-container'>
            <div className='content'>
                <Sidebar />
                <MainFeed />
                <Sidebar />
            </div>
        </div>
    )
}
