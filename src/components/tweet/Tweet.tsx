import React, { ReactElement } from 'react'
import { MoreHorizontal, MessageCircle, Repeat, Heart, Upload } from 'react-feather'
import firebase from 'firebase/app'
interface Props {
    text: string
    name: string
    userName: string
    likes: number
    profileImage: string
    createdAt: firebase.firestore.Timestamp
}

export default function Tweet({
    text,
    name,
    userName,
    likes,
    profileImage,
    createdAt,
}: Props): ReactElement {
    function timeConverter(UNIX_timestamp: number) {
        var a = new Date(UNIX_timestamp * 1000)
        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        var year = a.getFullYear()
        var month = months[a.getMonth()]
        var date = a.getDate()
        return date + ' ' + month + ' ' + year
    }
    let postSecs = Math.floor(createdAt.toMillis() / 1000)
    let secsNow = Math.floor(new Date().getTime() / 1000)
    const getDateSincePost = (postSecs: number, secsNow: number) => {
        let diff = Math.abs(secsNow - postSecs)
        if (diff < 15) return 'NOW' // within 1 minute
        if (diff < 60) return diff + ' secs' // within 1 minute
        if (diff < 3600) return Math.floor(diff / 60) + ' min' // within 1 hour
        if (diff < 86400) return Math.floor(diff / 3600) + ' hours' // within 1 day
        if (diff < 259200) return Math.floor(diff / 24) + ' days' // within 3 minute
        return timeConverter(postSecs) // just returns date
    }
    let date = getDateSincePost(postSecs, secsNow)

    return (
        <div className='tweet-container brd-bottom'>
            <div className='tweet-container__profileImage'>
                <img src={profileImage} alt='avatar' />
            </div>
            <div className='tweet-container__content'>
                <div className='header'>
                    <div>
                        <span>{name}</span>@{userName} . {date}
                    </div>
                    <div className='options  hover-effect'>
                        <MoreHorizontal />
                    </div>
                </div>
                <p>{text}</p>
                <div className='metadata'>
                    <div className='metadata__holder'>
                        <MessageCircle className='hover-effect-red' />
                        <span>3</span>
                    </div>
                    <div className='metadata__holder'>
                        <Repeat /> <span>{likes}</span>
                    </div>
                    <div className='metadata__holder'>
                        <Heart /> <span>69</span>
                    </div>
                    <div className='metadata__holder'>
                        <Upload />
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
