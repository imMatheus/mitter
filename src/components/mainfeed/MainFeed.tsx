import React, { ReactElement } from 'react'
import DraftWriter from './DraftWriter'
import { useAuth } from '../../context/AuthContext'
import Tweet from '../tweet/Tweet'

export default function MainFeed(): ReactElement {
    const { currentUser } = useAuth()

    return (
        <div className='mainfeed'>
            <DraftWriter />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
        </div>
    )
}
