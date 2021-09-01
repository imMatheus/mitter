import React, { useRef, ReactElement } from 'react'
import { Search, X } from 'react-feather'

interface Props {
    setQueryString: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ setQueryString }: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null)

    const querySearch = () => {
        if (searchRef.current) {
            setQueryString(searchRef.current.value.toLowerCase())
        }
    }

    return (
        <form className={`searchBar-wrapper`}>
            <Search />
            <input ref={searchRef} type='text' onChange={querySearch} placeholder='Search Mitter' />
            <button
                className='clear-btn'
                onClick={(e) => {
                    e.preventDefault()
                    setQueryString('')
                    searchRef!.current!.value = ''
                }}
            >
                <div className='circle'>
                    <X />
                </div>
            </button>
        </form>
    )
}
