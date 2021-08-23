import React, { useEffect, useRef, useState } from 'react'
import { fs } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import getDateSincePost from '../../utils/getDateSincePost'
import { useParams } from 'react-router'
export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any>([])
    const dummyRef = useRef<HTMLDivElement>(null)
    const { currentUser } = useAuth()
    const { chatId }: { chatId: string } = useParams()
    const [userHasAccess, setUserHasAccess] = useState(false)

    useEffect(() => {
        if (!currentUser) return
        fs.collection('messages')
            .doc(chatId)
            .get()
            .then((response) => {
                const participants = response.data()?.participants
                if (participants?.some((n: string) => n === currentUser.uid)) {
                    setUserHasAccess(true)
                    console.log(response.data())
                    fs.collection('messages')
                        .doc(chatId)
                        .collection('messages')
                        .orderBy('createdAt')
                        .onSnapshot((snapshot) => {
                            console.log('hello', snapshot)

                            setMessages(snapshot.docs.map((doc) => doc.data()))
                        })
                }
            })

        return () => {
            console.log('we leave chat now')
        }
    }, [])
    const sendMessage = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!currentUser || message === '') return
        fs.collection('messages').doc(chatId).collection('messages').add({
            text: message,
            senderId: currentUser.uid,
            createdAt: new Date(),
        })

        setMessage('')
        dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className='chat-container center-expand'>
            im chat
            {userHasAccess ? (
                <>
                    <div className='messages-container'>
                        {messages &&
                            messages.map((message: any, index: number) => {
                                let { seconds } = message.createdAt
                                const state =
                                    message.senderId === currentUser?.uid ? 'sent' : 'received'

                                return (
                                    <>
                                        <div className={`message ${state}`} key={index}>
                                            {message.text}
                                        </div>
                                        <span className='message__time'>
                                            {getDateSincePost(seconds)}
                                        </span>
                                    </>
                                )
                            })}
                    </div>
                    <form onSubmit={(e: any) => sendMessage(e)} className='inputField brd-top'>
                        <input
                            type='text'
                            value={message}
                            placeholder='Start a new message'
                            onChange={(e: any) => {
                                setMessage(e.target.value)
                            }}
                        />
                        <button className='action-btn'>Send</button>
                    </form>
                    <span className='dummyContainer' ref={dummyRef}></span>
                </>
            ) : (
                <h1>you are not allow</h1>
            )}
        </div>
    )
}
