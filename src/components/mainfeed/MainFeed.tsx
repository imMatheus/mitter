import React, { ReactElement, useEffect, useRef, useState, useLayoutEffect } from 'react'
import DraftWriter from './DraftWriter'
import { useAuth } from '../../context/AuthContext'
import Tweet from '../tweet/Tweet'
import app, { fs } from '../../firebase'
import firdeum, { firedumAdd, firedumCreateUser } from 'firedum'
import firebase from 'firebase/app'
import getNameCombinations from '../../utils/getNameCombinations'

firdeum(app)

export default function MainFeed(): ReactElement {
    const { currentUser } = useAuth()
    const listInnerRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(false)
    const scrolls = useRef(0)
    const lastTweetRef = useRef<any>(null)
    console.log(currentUser)

    const PAGINATION_LIMIT = 15
    const [tweets, setTweets] = useState<any>([])

    useLayoutEffect(() => {
        if (tweets.length > 0 || loading) return
        window.addEventListener('scroll', () => {
            if (!listInnerRef.current) return
            const scrollY = window.scrollY
            const { clientHeight } = listInnerRef.current
            scrolls.current += 1
            if (clientHeight - scrollY < 800 && !loading) {
                setLoading(true)
            }
        })
        return () =>
            window.removeEventListener('scroll', () => {
                console.log('remove scroll listener')
            })
    }, [])
    useEffect(() => {
        if (!currentUser) return console.log('hahahahahahahahahah')
        const tweetsRef = fs.collectionGroup('tweets')
        console.log('use Effect')

        if (lastTweetRef.current) {
            tweetsRef
                .orderBy('numberOfLikes', 'desc')
                .startAfter(lastTweetRef.current)
                .limit(PAGINATION_LIMIT)
                .get()
                .then(async (documentSnapshots) => {
                    let g: firebase.firestore.DocumentData[] = []
                    documentSnapshots.docs.forEach((doc) => {
                        g.push(doc.data())
                    })
                    lastTweetRef.current = documentSnapshots.docs[documentSnapshots.docs.length - 1]
                    setTweets((c: any) => c.concat(g))
                    setLoading(false)
                })
        } else {
            tweetsRef
                .orderBy('numberOfLikes', 'desc')
                .limit(PAGINATION_LIMIT)
                .get()
                .then(async (documentSnapshots) => {
                    let g: firebase.firestore.DocumentData[] = []
                    documentSnapshots.docs.forEach((doc) => {
                        g.push(doc.data())
                    })
                    lastTweetRef.current = documentSnapshots.docs[documentSnapshots.docs.length - 1]
                    setTweets((c: any) => c.concat(g))
                    setLoading(false)
                })
        }
    }, [currentUser, loading])

    console.log(tweets)

    const addUsers = async () => {
        console.log('adding users...')

        await firedumCreateUser({
            collectionReference: fs.collection('users'),
            fields: {
                name: ':firstName',
                displayName: ':userName',
                profileImage: ':avatar',
                bio: ':sentence',
                location: ':city',
                url: ':url',
                joinedAt: new Date(),
                amountOfFollowers: ':number',
                amountOfFollowing: ':number',
            },
            amountOfUsers: 10,
        }).then(async ({ ids, reference, data }) => {
            if (!ids) return

            await Promise.all(
                ids.map(async (id: string, index: number) => {
                    await firedumAdd({
                        collectionReference: reference.doc(id).collection('tweets'),
                        fields: {
                            text: ':sentence',
                            date: ':recent',
                            numberOfComments: ':number',
                            numberOfRetweets: ':number',
                            numberOfLikes: ':number',
                            displayName: data[index].displayName,
                            name: data[index].name,
                            profileImage: data[index].profileImage,
                            createdAt: ':recent',
                        },
                        numberOfDocuments: 6,
                    })
                })
            )
        })
        console.log('done')
    }

    const addSearch = async () => {
        console.log('started')

        await fs
            .collection('users')
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach(async function (doc) {
                    fs.collection('users').doc(doc.id).update({
                        theme: 'dimmed',
                        // disassembledDisplayName: getNameCombinations(doc.data().displayName),
                    })
                })
            })
        console.log('ending')
    }

    return (
        <div className='mainfeed center-expand'>
            <DraftWriter />
            <button onClick={addUsers}>add user</button>
            <button onClick={addSearch}>add search</button>

            <div ref={listInnerRef}>
                {tweets &&
                    tweets.map((tweet: any, index: number) => {
                        return (
                            <Tweet
                                createdAt={tweet.date}
                                profileImage={tweet.profileImage}
                                key={index}
                                text={tweet.text}
                                name={tweet.name}
                                numberOfComments={tweet.numberOfComments}
                                numberOfRetweets={tweet.numberOfRetweets}
                                numberOfLikes={tweet.numberOfLikes}
                                userName={tweet.displayName}
                            />
                        )
                    })}
                {loading ? <p>loading.......</p> : <p>we aint loading sheeet</p>}
            </div>
        </div>
    )
}
