import React, { useEffect, useState } from 'react'
import { fs } from '../../firebase'
export default function MyMessages() {
    const user1 = '14iJU3Jz8sepPcLFqraB9kk8Et42'
    const user2 = '2EUi9oJr0AZI6TVNda0NKEpjXN62'
    const [messages, setMessages] = useState<any>([])
    console.log(messages)

    useEffect(() => {
        fs.collection('messages')
            .where('participants', 'array-contains-any', [user1, user2])
            .get()
            .then((messages) =>
                setMessages(
                    messages.docs.map((message) => {
                        return message.data()
                    })
                )
            )
        console.log(1)
    }, [])

    const addMessage = () => {
        fs.collection('messages').add({
            participants: [user1, user2],
        })
    }
    return (
        <div className='myMessages-container center-expand'>
            my messages
            <button onClick={addMessage}>add message</button>
        </div>
    )
}
