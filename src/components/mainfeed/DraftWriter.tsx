import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Image, BarChart2, Smile, Calendar } from 'react-feather'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
interface Props {}

export default function DraftWriter({}: Props): ReactElement {
    const [editorState, seteditorState] = useState('')
    const draftChangedHandler = (e: any) => {
        console.log(e)
    }
    return (
        <div className='mainfeed__draft brd-top brd-bottom'>
            <div className='mainfeed__draft__profileImage'></div>
            <div className='mainfeed__draft__content'>
                <div className='draft' contentEditable='true' onChange={draftChangedHandler}>
                    Hello, World!
                </div>
                <div className='actions'>
                    <div className='actions__media'>
                        <div className='icon'>
                            <Image />
                        </div>
                        <div className='icon'>
                            <BarChart2 />
                        </div>
                        <div className='icon'>
                            <Smile />
                        </div>
                        <div className='icon'>
                            <Calendar />
                        </div>
                    </div>
                    <button className='action-btn'>Tweet</button>
                </div>
            </div>
        </div>
    )
}
