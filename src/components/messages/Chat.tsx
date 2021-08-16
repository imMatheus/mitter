import React, { useEffect, useState } from 'react'
import { fs, auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any>([])
    const { currentUser } = useAuth()
    const url = '6yUJV5LTz8DyjLtfUu5C'
    useEffect(() => {
        fs.collection('messages')
            .doc(url)
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                console.log(snapshot)
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        return () => {}
    }, [])
    const sendMessage = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!currentUser) return
        console.log(currentUser)
        fs.collection('messages').doc(url).collection('messages').add({
            text: message,
            senderId: currentUser.uid,
            createdAt: new Date(),
        })
        setMessage('')
    }
    return (
        <div className='chat-container center-expand'>
            im chat
            <div className='messages-container'>
                {messages &&
                    messages.map((message: any) => {
                        let x = Math.random() > 0.5 ? 'sent' : 'received'
                        return <div className={`message ${x}`}>{message.text}</div>
                    })}
            </div>
            <form onSubmit={(e: any) => sendMessage(e)} className='inputField'>
                <input
                    type='text'
                    value={message}
                    placeholder='placeholder'
                    onChange={(e: any) => {
                        setMessage(e.target.value)
                    }}
                />
                <button className='action-btn'>Send</button>
            </form>
        </div>
    )
}
