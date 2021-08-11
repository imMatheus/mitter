import React, { ReactElement } from 'react'
import DraftWriter from './DraftWriter'

interface Props {}

export default function MainFeed({}: Props): ReactElement {
    return (
        <div className='mainfeed'>
            <DraftWriter />
        </div>
    )
}
