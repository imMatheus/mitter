import React, { useEffect, useRef, useState } from 'react'
import { fs, auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import timeConverter from '../../utils/timeConverter'
import getDateSincePost from '../../utils/getDateSincePost'
export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any>([])
    const dummyRef = useRef<HTMLDivElement>(null)
    const { currentUser } = useAuth()
    const url = '6yUJV5LTz8DyjLtfUu5C'
    useEffect(() => {
        fs.collection('messages')
            .doc(url)
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        return () => {}
    }, [])
    const sendMessage = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!currentUser || message === '') return
        console.log(currentUser)
        fs.collection('messages')
            .doc(url)
            .collection('messages')
            .add({
                text: message,
                senderId: currentUser.uid,
                createdAt: new Date(),
                state: Math.random() > 0.5 ? 'sent' : 'received',
            })

        setMessage('')
        dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className='chat-container center-expand'>
            im chat
            <div className='messages-container'>
                {messages &&
                    messages.map((message: any) => {
                        let { seconds } = message.createdAt
                        // console.log(seconds)
                        let x = new Date()
                        console.log(getDateSincePost(seconds))
                        // console.log(timeConverter(seconds))

                        return (
                            <div className={`message ${message.state || 'sent'}`}>
                                {message.text}
                                <span>{getDateSincePost(seconds)}</span>
                            </div>
                        )
                    })}
            </div>
            <span className='dummyContainer' ref={dummyRef}></span>
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
        </div>
    )
}
