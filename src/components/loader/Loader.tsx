import React, { ReactElement } from 'react'

interface Props {}

export default function Loader({}: Props): ReactElement {
    return <div className='loader-circle'></div>
}
