import React, { ReactElement } from 'react'
import { fs } from '../../firebase'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function Settings(): ReactElement {
    const { theme, setTheme } = useTheme()
    const { currentUser } = useAuth()

    const changeTheme = async (t: 'light' | 'dimmed' | 'dark') => {
        if (currentUser && theme !== t) {
            setTheme(t)
            fs.collection('users').doc(currentUser.uid).update({ theme: t })
        }
    }
    return (
        <div className='center-expand'>
            theme:{theme}
            <button onClick={() => changeTheme('light')}>Light</button>
            <button onClick={() => changeTheme('dimmed')}>Dimmed</button>
            <button onClick={() => changeTheme('dark')}>Dark</button>
        </div>
    )
}
