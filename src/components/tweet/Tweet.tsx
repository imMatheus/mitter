import React, { ReactElement } from 'react'
import { MoreHorizontal } from 'react-feather'

interface Props {}

export default function Tweet({}: Props): ReactElement {
    return (
        <div className='tweet-container brd-bottom'>
            <div className='tweet-container__profileImage'></div>
            <div className='tweet-container__content'>
                <div className='header'>
                    <div>
                        <span>matheus</span>
                        @matehus39992400 . 5m
                    </div>
                    <div className='options  hover-effect'>
                        <MoreHorizontal />
                    </div>
                </div>
                <p>hello world</p>
            </div>
        </div>
    )
}
