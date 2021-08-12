import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function SignUp() {
    const { signup, login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const response = await signup(email, password, displayName)
        console.log(response)
    }
    const handleSubmit2 = async (e: any) => {
        e.preventDefault()

        const response = await login(email, password)
        console.log(response)
    }
    return (
        <div>
            sign up
            <input
                type='text'
                value={email}
                placeholder='email'
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <input
                type='text'
                placeholder='password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            <input
                type='text'
                placeholder='dispaly name'
                value={displayName}
                onChange={(e: any) => setDisplayName(e.target.value)}
            />
            <button className='action-btn' onClick={handleSubmit}>
                Submit
            </button>
            <button className='action-btn' onClick={handleSubmit2}>
                Submit
            </button>
        </div>
    )
}
