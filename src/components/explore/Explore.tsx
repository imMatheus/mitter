import React, { useState } from 'react'
import SearchBar from './SearchBar'

export default function Explore() {
    const [queriedUsers, setQueriedUsers] = useState<any[]>([])
    console.log(queriedUsers)

    return (
        <div className='explore-wrapper'>
            <SearchBar setQueriedUsers={setQueriedUsers} />
            explode
        </div>
    )
}
