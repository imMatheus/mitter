import React, { ReactElement } from 'react'
import { fs } from '../../firebase'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { Check } from 'react-feather'

export default function ThemeToggler(): ReactElement {
    const { theme, setTheme } = useTheme()
    const { currentUser } = useAuth()

    const changeTheme = async (t: 'light' | 'dimmed' | 'dark') => {
        if (currentUser && theme !== t) {
            setTheme(t)
            fs.collection('users').doc(currentUser.uid).update({ theme: t })
        }
    }
    return (
        <div className='settings-section brd-top'>
            <h2>Background</h2>
            <div className='buttons-container '>
                <div
                    className={`theme-btn light ${theme === 'light' ? 'selected' : ''}`}
                    onClick={() => changeTheme('light')}
                >
                    <div className='circle-wrapper'>
                        <div className='circle'>{theme === 'light' && <Check />}</div>
                    </div>
                    <div className='title'>Default</div>
                </div>
                <div
                    className={`theme-btn dimmed ${theme === 'dimmed' ? 'selected' : ''}`}
                    onClick={() => changeTheme('dimmed')}
                >
                    <div className='circle-wrapper'>
                        <div className='circle'>{theme === 'dimmed' && <Check />}</div>
                    </div>
                    <div className='title'>Dim</div>
                </div>
                <div
                    className={`theme-btn dark ${theme === 'dark' ? 'selected' : ''}`}
                    onClick={() => changeTheme('dark')}
                >
                    <div className='circle-wrapper'>
                        <div className='circle'>{theme === 'dark' && <Check />}</div>
                    </div>
                    <div className='title'>Lights out</div>
                </div>
            </div>
        </div>
    )
}
