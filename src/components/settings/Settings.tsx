import React, { ReactElement } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function Settings(): ReactElement {
    const { theme, setTheme } = useTheme()
    return (
        <div className='center-expand'>
            theme:{theme}
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dimmed')}>Dimmed</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
        </div>
    )
}
