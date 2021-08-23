import React, { ReactElement, useState } from 'react'
import { Image, BarChart2, Smile, Calendar } from 'react-feather'
import { useAuth } from '../../context/AuthContext'
import { fs } from '../../firebase'
export default function DraftWriter(): ReactElement {
    const { currentUser } = useAuth()
    const [tweet, setTweet] = useState('')
    if (!currentUser) return <h1>please log in</h1>
    const tweetHandler = async () => {
        fs.collection('users')
            .doc(currentUser.uid)
            .collection('tweets')
            .add({
                senderId: currentUser.uid,
                text: tweet,
                date: new Date(),
                numberOfLikes: 12,
                numberOfComments: 21,
                numberOfRetweets: 102,
                profileImage: currentUser.profileImage,
                name: currentUser.name,
                displayName: currentUser.displayName,
            })
            .then(() => {
                setTweet('')
            })
    }

    return (
        <div className='mainfeed__draft brd-top brd-bottom'>
            <div className='mainfeed__draft__profileImage'></div>
            <div className='mainfeed__draft__content'>
                {/* <div className='draft' contentEditable='true'>
                    Hello, World!
                </div> */}
                <div className='draft'>
                    <input type='text' value={tweet} onChange={(e) => setTweet(e.target.value)} />
                </div>
                <div className='actions'>
                    <div className='actions__media'>
                        <div className='icon hover-effect'>
                            <Image />
                        </div>
                        <div className='icon hover-effect'>
                            <BarChart2 />
                        </div>
                        <div className='icon hover-effect'>
                            <Smile />
                        </div>
                        <div className='icon hover-effect'>
                            <Calendar />
                        </div>
                    </div>
                    <button className='action-btn' onClick={tweetHandler}>
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    )
}
