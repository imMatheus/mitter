import React, { ReactElement } from 'react'
import { MoreHorizontal, MessageCircle, Repeat, Heart, Upload } from 'react-feather'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import timeConverter from '../../utils/timeConverter'
import getDateSincePost from '../../utils/getDateSincePost'
interface Props {
    text: string
    name: string
    userName: string
    numberOfComments: number
    numberOfLikes: number
    numberOfRetweets: number
    profileImage: string
    createdAt: firebase.firestore.Timestamp
}

export default function Tweet({
    text,
    name,
    userName,
    numberOfComments,
    numberOfLikes,
    numberOfRetweets,
    profileImage,
    createdAt,
}: Props): ReactElement {
    let postSecs = Math.floor(createdAt.toMillis() / 1000)
    let secsNow = Math.floor(new Date().getTime() / 1000)

    let date = getDateSincePost(postSecs, secsNow)

    return (
        <div className='tweet-container brd-bottom'>
            <div className='tweet-container__profileImage'>
                <img src={profileImage} alt='avatar' />
            </div>
            <div className='tweet-container__content'>
                <div className='header'>
                    <Link to={`/u/${userName}`}>
                        <span>{name}</span>@{userName} . {date}
                    </Link>
                    <div className='options  hover-effect'>
                        <MoreHorizontal />
                    </div>
                </div>
                <p>{text}</p>
                <div className='metadata'>
                    <div className='metadata__holder'>
                        <MessageCircle className='hover-effect-red' />
                        <span>{numberOfComments}</span>
                    </div>
                    <div className='metadata__holder'>
                        <Repeat /> <span>{numberOfRetweets}</span>
                    </div>
                    <div className='metadata__holder'>
                        <Heart /> <span>{numberOfLikes}</span>
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
