import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
    searchResults: any[]
    queryString: string
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
function getMatch(s: string, queryString: string): number {
    let best = 0
    for (let i = 0; i < s.length; i++) {
        let x = 0

        if (s[i]?.toLowerCase() === queryString[0]?.toLowerCase()) {
            let length = 0
            while (
                s[i + length]?.toLowerCase() === queryString[length]?.toLowerCase() &&
                length < queryString.length
            ) {
                x++
                length++
            }
        }

        best = Math.max(x, best)
    }

    return best / s.length
}

export default function SearchResults({
    searchResults,
    queryString,
    loading,
    setLoading,
}: Props): ReactElement {
    function sortResults(arr: any[], queryString: string): any[] {
        console.log('stared sort')

        arr.sort(
            (a, b) => getMatch(b.displayName, queryString) - getMatch(a.displayName, queryString)
        )
        console.log('ended sort')

        setLoading(false)
        return arr
    }

    const history = useHistory()
    sortResults(searchResults, queryString)
    console.log('loading', loading)

    if (loading)
        return (
            <div className='searchResults-container' style={{ backgroundColor: '#f00' }}>
                hello
            </div>
        )
    return (
        <>
            {searchResults.length > 0 || queryString !== '' ? (
                <div className='searchResults-container'>
                    {searchResults.length > 0 ? (
                        searchResults.map((user, index) => {
                            return (
                                <div
                                    className='searchResult-container__row '
                                    key={index}
                                    onClick={() => history.push(`/u/${user.displayName}`)}
                                >
                                    <div className='image'>
                                        <img src={user.profileImage} alt='' />
                                    </div>
                                    <div className='text'>
                                        <div className='text__name'>{user.name}</div>
                                        <div className='text__subtitle'>@{user.displayName}</div>
                                        <div className='text__subtitle'>{user.bio}</div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p>Could not find any users for {queryString}</p>
                    )}
                </div>
            ) : null}
        </>
    )
}
