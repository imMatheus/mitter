import React, { useRef, useState, ReactElement } from 'react'
import { Search } from 'react-feather'
import { fs } from '../../firebase'
import User from '../../types/User'

interface Props {
    setQueriedUsers: React.Dispatch<React.SetStateAction<any[]>>
}

export default function SearchBar({ setQueriedUsers }: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null)
    const querySearch = () => {
        if (!searchRef || !searchRef.current || !searchRef.current.value) return
        console.log('searchRef.current.value', searchRef.current.value)

        fs.collection('users')
            .where('disassembledDisplayName', 'array-contains-any', [searchRef.current.value])
            .get()
            .then((users) => {
                if (users.empty) return setQueriedUsers([])
                setQueriedUsers(users.docs.map((user) => user.data()))
                console.log(users)
            })
    }

    return (
        <div className='searchBar-wrapper'>
            <Search />
            <input
                ref={searchRef}
                type='text'
                onChange={() => querySearch()}
                placeholder='Search Mitter'
            />
        </div>
    )
}
