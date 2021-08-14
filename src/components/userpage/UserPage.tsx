import React, { ReactElement, useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Link, Calendar } from 'react-feather'
import { useParams } from 'react-router'
import { fs } from '../../firebase'
import User from '../../types/User'
import Tweet from '../tweet/Tweet'

interface Props {}

export default function UserPage({}: Props): ReactElement {
    const { userId }: { userId: string } = useParams()
    const [fetchedUser, setFetchedUser] = useState<User | null>(null)
    const [usersTweets, setUsersTweets] = useState<any>([])
    console.log(userId)
    useEffect(() => {
        fs.collection('users')
            .where('displayName', '==', userId)
            .get()
            .then((response) => {
                let g: any
                response.docs.forEach((doc) => {
                    g = { ...doc.data(), uid: doc.id }
                })
                setFetchedUser(g)
            })
    }, [userId])
    useEffect(() => {
        if (!fetchedUser) return console.log('teehee')

        fs.collection('users')
            .doc(fetchedUser.uid)
            .collection('tweets')
            .get()
            .then((querySnapshot) => {
                let g: any = []
                querySnapshot.forEach((doc) => {
                    g.push(doc.data())
                })
                setUsersTweets(g)
            })
    }, [fetchedUser])
    console.log(usersTweets)

    return (
        <div className='users-page center-expand'>
            {/* <div className='center-header'></div> */}
            {fetchedUser ? (
                <>
                    <div className='banner-wrapper'></div>
                    <div className='user-info-container brd-bottom'>
                        <div className='controls'>
                            <div className='profileImage'>
                                <img src={fetchedUser.profileImage} alt='profile' />
                            </div>
                            <div className='controls__buttons'>
                                <button className='action-btn'>Follow</button>
                            </div>
                        </div>
                        <p className='text-bold'>{fetchedUser.name}</p>
                        <p className='text-subtitle'>@{fetchedUser.displayName}</p>
                        <p className='user-bio'>{fetchedUser.bio} </p>
                        <div className='user-metadata-wrapper'>
                            <p className='text-subtitle'>
                                <MapPin />
                                The/Goat
                            </p>
                            <p>
                                <Link />
                                <span className='link'>hejahanif.se</span>
                            </p>
                            <p className='text-subtitle'>
                                <Calendar />
                                Joined July 2012
                            </p>
                        </div>
                        <div className='clout-status'>
                            <p>
                                <span className='text-bold'>994</span>
                                <span className='text-subtitle'>Following</span>
                            </p>
                            <p>
                                <span className='text-bold'>3.9M</span>
                                <span className='text-subtitle'>Followers</span>
                            </p>
                        </div>
                    </div>
                    {usersTweets.map((tweet: any) => {
                        return (
                            <Tweet
                                name={fetchedUser.name}
                                userName={fetchedUser.displayName}
                                profileImage={fetchedUser.profileImage}
                                createdAt={tweet.date}
                                text={tweet.text}
                                likes={tweet.numberOfLikes}
                            />
                        )
                    })}
                </>
            ) : (
                <p>user not found</p>
            )}
            userpage
        </div>
    )
}
