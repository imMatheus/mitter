import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import { fs } from '../../firebase'
import useDebounce from '../../hooks/useDebounce'

export default function Explore() {
    const [queriedUsers, setQueriedUsers] = useState<any[]>([])
    const [queryString, setQueryString] = useState<string>('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [queryString])

    useDebounce(
        async () => {
            await fs
                .collection('users')
                .where('disassembledDisplayName', 'array-contains-any', [queryString])
                .get()
                .then((users) => {
                    if (users.empty) return setQueriedUsers([])
                    setQueriedUsers(users.docs.map((user) => user.data()))
                    console.log(users)
                })
            setLoading(false)
        },
        400,
        [queryString]
    )

    return (
        <div className='explore-wrapper'>
            <SearchBar setQueryString={setQueryString} />
            <SearchResults
                queryString={queryString}
                searchResults={queriedUsers}
                loading={loading}
            />
        </div>
    )
}
