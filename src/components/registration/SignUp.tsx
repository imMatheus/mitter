import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function SignUp() {
    const { signup, login } = useAuth()

    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const displayNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null)
    const [error, setError] = useState('')
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (
                !emailRef.current ||
                !passwordRef.current ||
                !displayNameRef.current ||
                !nameRef.current
            )
                return setError('Oops, something went wrong :) from here')
            if (!profileImage) return setError('Pick a profile image')

            const response = await signup(
                emailRef.current?.value,
                passwordRef.current?.value,
                nameRef.current.value,
                displayNameRef.current.value,
                profileImage
            )
            if (response) {
                setError(response.message)
            }
            console.log('response', response)
        } catch (e) {
            setError('Oops, something went wrong :)')
        }
    }
    const handleSubmit2 = async (e: any) => {
        e.preventDefault()
        if (!emailRef.current || !passwordRef.current)
            return setError('Oops, something went wrong :)')

        const response = await login(emailRef.current.value, passwordRef.current.value)
    }
    const imageUploadImgHandler = async (e: any) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImage(reader.result)
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e?.target?.files[0])
        }
    }
    return (
        <div>
            sign up
            <input type='text' placeholder='email' ref={emailRef} />
            <input type='text' placeholder='password' ref={passwordRef} />
            <input type='text' placeholder='name' ref={nameRef} />
            <input type='text' placeholder='dispaly name' ref={displayNameRef} />
            <input
                type='file'
                id='modelPic'
                accept='image/*'
                style={{ display: ' none' }}
                onChange={imageUploadImgHandler}
            />
            <label htmlFor='modelPic'>
                <div className='text'>Choose Profile Image</div>
            </label>
            <button className='action-btn' onClick={handleSubmit}>
                Sign up
            </button>
            <button className='action-btn' onClick={handleSubmit2}>
                login
            </button>
            <h1>error: {error}</h1>
        </div>
    )
}
