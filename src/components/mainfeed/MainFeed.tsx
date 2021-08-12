import React, { ReactElement, useEffect, useState } from 'react'
import DraftWriter from './DraftWriter'
import { useAuth } from '../../context/AuthContext'
import Tweet from '../tweet/Tweet'
import { fs } from '../../firebase'

export default function MainFeed(): ReactElement {
    const { currentUser } = useAuth()
    const [tweets, setTweets] = useState<any>([])

    useEffect(() => {
        if (!currentUser) return
        fs.collection('users')
            .doc(currentUser!.uid)
            .collection('tweets')
            .onSnapshot((snapshot) => {
                console.log(snapshot)

                let g: any = []
                snapshot.forEach((tweet) => g.push(tweet.data()))
                console.log(g)

                setTweets(g)
            })
    }, [currentUser])
    return (
        <div className='mainfeed'>
            <DraftWriter />
            {tweets.map((tweet: any, index: number) => {
                return (
                    <Tweet
                        createdAt={tweet.createdAt}
                        profileImage={tweet.avatar}
                        key={index}
                        text={tweet.sentence}
                        name={tweet.lastName}
                        likes={index}
                        userName={tweet.zipCode}
                    />
                )
            })}
        </div>
    )
}
