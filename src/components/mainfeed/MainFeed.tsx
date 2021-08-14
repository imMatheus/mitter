import React, { ReactElement, useEffect, useState } from 'react'
import DraftWriter from './DraftWriter'
import { useAuth } from '../../context/AuthContext'
import Tweet from '../tweet/Tweet'
import { fs } from '../../firebase'

export default function MainFeed(): ReactElement {
    const { currentUser } = useAuth()
    const [tweets, setTweets] = useState<any>([])
    console.log(currentUser)

    useEffect(() => {
        if (!currentUser) return console.log('hahahahahahahahahah')

        const tweetsRef = fs.collectionGroup('tweets')
        tweetsRef
            .where('text', '>', '')
            .get()
            .then((tweets) => {
                let g: any = []
                tweets.docs.forEach((doc) => {
                    g.push(doc.data())
                })
                console.log(g)
                setTweets(g)
            })
    }, [currentUser])
    return (
        <div className='mainfeed center-expand'>
            <DraftWriter />
            {tweets &&
                tweets.map((tweet: any, index: number) => {
                    return (
                        <Tweet
                            createdAt={tweet.date}
                            profileImage={tweet.profileImage}
                            key={index}
                            text={tweet.text}
                            name={tweet.lastName}
                            likes={tweet.numberOfLikes}
                            userName={tweet.displayName}
                        />
                    )
                })}
        </div>
    )
}
