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

    useEffect(() => {
        fs.collection('messages')
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                console.log('hello', snapshot)

                setMessages(snapshot.docs.map((doc) => doc.data()))
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
            <div className='messages-container'>
                {messages &&
                    messages.map((message: any) => {
                        let { seconds } = message.createdAt
                        let x = new Date()
                        console.log(getDateSincePost(seconds))
                        console.log(message)
                        const state = message.senderId === currentUser?.uid ? 'sent' : 'received'

                        return (
                            <div className={`message ${state}`}>
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
