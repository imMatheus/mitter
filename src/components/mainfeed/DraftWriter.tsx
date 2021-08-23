import React, { ReactElement } from 'react'
import { Image, BarChart2, Smile, Calendar } from 'react-feather'
import { fs } from '../../firebase'
import { firedumAdd, firedumCreateUser } from 'firedum'
export default function DraftWriter(): ReactElement {
    const tweetHandler = async () => {
        // firedumAdd({
        //     collectionReference: fs.collection('users').doc(currentUser!.uid).collection('tweets'),
        //     fields: {
        //         firstName: '',
        //         userName: '',
        //         text: '',
        //         createdAt: new Date(),
        //         avatar: '',
        //         likes: Math.floor(Math.random() * 100),
        //     },
        //     numberOfDocuments: 1,
        // })
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
            amountOfUsers: 1,
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
                        },
                        numberOfDocuments: 3,
                    })
                })
            )
        })
    }

    return (
        <div className='mainfeed__draft brd-top brd-bottom'>
            <div className='mainfeed__draft__profileImage'></div>
            <div className='mainfeed__draft__content'>
                {/* <div className='draft' contentEditable='true'>
                    Hello, World!
                </div> */}
                <div className='draft'>Hello, World!</div>
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
