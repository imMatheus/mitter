import React, { useEffect, useState } from 'react'
import { fs } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
export default function MyMessages() {
    const { currentUser } = useAuth()

    const user1 = '14iJU3Jz8sepPcLFqraB9kk8Et42'
    const user2 = '2EUi9oJr0AZI6TVNda0NKEpjXN62'
    const [messages, setMessages] = useState<any>([])
    const [dms, setDms] = useState<any>([])

    useEffect(() => {
        if (!currentUser) return
        fs.collection('messages')
            .where('participants', 'array-contains-any', [currentUser.uid])
            .get()
            .then((messages) => {
                setMessages(
                    messages.docs.map((message) => {
                        const data = message.data()
                        console.log(data)

                        const participants = data.participants.filter(
                            (n: any) => n !== currentUser.uid
                        )
                        return { ...message.data(), id: message.id }
                    })
                )
            })
    }, [])

    useEffect(() => {
        let friends: any[] = []
        for (let i = 0; i < messages.length; i++) {
            friends = friends.concat(messages[i].participants)
        }
        function onlyUnique(value: any, index: any, self: any) {
            return self.indexOf(value) === index
        }
        friends = friends.filter(onlyUnique)
    }, [messages])

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
