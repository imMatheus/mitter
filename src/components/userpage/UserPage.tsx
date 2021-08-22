import { ReactElement, useEffect, useState } from 'react'
import { MapPin, Link, Calendar, Mail } from 'react-feather'
import { useParams } from 'react-router'
import { fs } from '../../firebase'
import User from '../../types/User'
import Tweet from '../tweet/Tweet'
import timeConverter from '../../utils/timeConverter'
import { useAuth } from '../../context/AuthContext'

export default function UserPage(): ReactElement {
    const { userId }: { userId: string } = useParams()
    const { currentUser } = useAuth()

    const [fetchedUser, setFetchedUser] = useState<User | null>(null)
    const [usersTweets, setUsersTweets] = useState<any>([])

    const startConversation = () => {
        if (!fetchedUser || !currentUser) return
        fs.collection('messages')
            .where('participants', 'array-contains', [fetchedUser.uid, currentUser.uid].sort())
            .get()
            .then((snapshot) => console.log(snapshot))
    }
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
                                <button className='circular-btn'>
                                    <Mail />
                                </button>
                                <button className='circular-btn' onClick={startConversation}>
                                    <Mail />
                                </button>
                                <button className='action-btn'>Follow</button>
                            </div>
                        </div>
                        <p className='text-bold'>{fetchedUser.name}</p>
                        <p className='text-subtitle'>@{fetchedUser.displayName}</p>
                        <p className='user-bio'>{fetchedUser.bio} </p>
                        <div className='user-metadata-wrapper'>
                            <p className='text-subtitle'>
                                <MapPin />
                                {fetchedUser.location}
                            </p>
                            <p>
                                <Link />
                                <a className='link' href={fetchedUser.url}>
                                    {fetchedUser.url}
                                </a>
                            </p>
                            <p className='text-subtitle'>
                                <Calendar />
                                Joined {timeConverter(fetchedUser.joinedAt.seconds)}
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
                                numberOfComments={tweet.numberOfComments}
                                numberOfRetweets={tweet.numberOfRetweets}
                                userName={fetchedUser.displayName}
                                profileImage={fetchedUser.profileImage}
                                createdAt={tweet.date}
                                text={tweet.text}
                                numberOfLikes={tweet.numberOfLikes}
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
