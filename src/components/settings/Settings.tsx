import React, { ReactElement } from 'react'
import { fs } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import ThemeToggler from './ThemeToggler'
import ProfileEdit from './ProfileEdit'

export default function Settings(): ReactElement {
    const { currentUser } = useAuth()

    return (
        <div className='center-expand settings-container'>
            <ProfileEdit />
            <ThemeToggler />
        </div>
    )
}
