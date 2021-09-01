import React, { useEffect, useRef, useState } from 'react'
import { fs } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router'
import getMessageTime from '../../utils/getMessageTime'

export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any>([])
    const dummyRef = useRef<HTMLDivElement>(null)
    const { currentUser } = useAuth()
    const { chatId }: { chatId: string } = useParams()
    const [userHasAccess, setUserHasAccess] = useState(false)
    console.log(chatId)

    useEffect(() => {
        if (!currentUser) return
        fs.collection('messages')
            .doc(chatId)
            .get()
            .then((response) => {
                const participants = response.data()?.participants
                // if the user is in participants we can fetch the messages
                if (participants?.some((n: string) => n === currentUser.uid)) {
                    setUserHasAccess(true)
                    fs.collection('messages')
                        .doc(chatId)
                        .collection('messages')
                        .orderBy('createdAt')
                        .onSnapshot((snapshot) => {
                            setMessages(snapshot.docs.map((doc) => doc.data()))
                            dummyRef.current?.scrollIntoView()
                        })
                }
            })

        return () => {
            console.log('we leave chat now')
        }
    }, [chatId, currentUser])
    const sendMessage = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!currentUser || message === '') return
        fs.collection('messages').doc(chatId).collection('messages').add({
            text: message,
            senderId: currentUser.uid,
            createdAt: new Date(),
        })

        setMessage('')
        // dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
        dummyRef.current?.scrollIntoView()
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
                                let b = false
                                let c = false
                                if (index < messages.length - 1) {
                                    const { seconds: nextSeconds } = messages[index + 1]?.createdAt
                                    const nextSenderId = messages[index + 1].senderId

                                    // If the next message was sent within one minute
                                    // and the next message is from the same user
                                    if (
                                        Math.abs(seconds - nextSeconds) < 60 &&
                                        nextSenderId === message.senderId
                                    ) {
                                        b = true
                                    }
                                }
                                if (index > 0) {
                                    const { seconds: prevSeconds } = messages[index - 1]?.createdAt
                                    const prevSenderId = messages[index - 1].senderId

                                    // If the next message was sent within one minute
                                    // and the next message is from the same user
                                    if (
                                        Math.abs(seconds - prevSeconds) > 60 ||
                                        prevSenderId !== message.senderId
                                    ) {
                                        c = true
                                    }
                                }

                                return (
                                    <>
                                        <div
                                            className={`message ${state} ${
                                                c || index === 0 ? '' : 'center'
                                            }`}
                                            key={index}
                                        >
                                            {message.text}
                                        </div>
                                        {!b && (
                                            <span className='message__time'>
                                                {getMessageTime(seconds)}
                                            </span>
                                        )}
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
