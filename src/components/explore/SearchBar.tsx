import React, { useRef, ReactElement, useState, useEffect } from 'react'
import { Search, X } from 'react-feather'

interface Props {
    setQueryString: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ setQueryString }: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null)
    const [active, setActive] = useState(false)
    const querySearch = () => {
        if (searchRef.current) {
            setQueryString(searchRef.current.value)
        }
    }
    useEffect(() => {
        window.addEventListener('click', () => {
            setActive((c) => !c)
            console.log('jhgfg')
        })
    }, [])
    return (
        <form
            className={`searchBar-wrapper ${active ? 'active' : ''}`}
            onClick={() => {
                setActive((c) => !c)
            }}
        >
            <Search />
            <input ref={searchRef} type='text' onChange={querySearch} placeholder='Search Mitter' />
            <div
                className='clear-btn'
                onClick={() => {
                    setQueryString('')
                    searchRef!.current!.value = ''
                }}
            >
                <div className='circle'>
                    <X />
                </div>
            </div>
        </form>
    )
}
