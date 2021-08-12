import React, { ReactElement, useEffect } from 'react'
import { Image, BarChart2, Smile, Calendar } from 'react-feather'
import { fs, auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { firedumAdd } from 'firedum'
interface Props {}

export default function DraftWriter({}: Props): ReactElement {
    const { currentUser } = useAuth()
    console.log('auth', auth)
    console.log('currentUser', currentUser)

    const tweetHandler = () => {
        firedumAdd({
            collectionReference: fs.collection('users').doc(currentUser!.uid).collection('tweets'),
            fields: {
                lastName: '',
                zipCode: '',
                sentence: '',
                createdAt: new Date(),
                avatar: '',
            },
            numberOfDocuments: 1,
        })
    }

    return (
        <div className='mainfeed__draft brd-top brd-bottom'>
            <div className='mainfeed__draft__profileImage'></div>
            <div className='mainfeed__draft__content'>
                <div className='draft' contentEditable='true'>
                    Hello, World!
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
