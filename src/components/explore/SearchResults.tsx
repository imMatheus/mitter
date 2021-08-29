import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
    searchResults: any[]
    queryString: string
}

export default function SearchResults({ searchResults, queryString }: Props): ReactElement {
    const history = useHistory()
    return (
        <div className='searchResults-container'>
            {searchResults.length > 0 ? (
                searchResults.map((user) => {
                    return (
                        <div
                            className='searchResult-container__row '
                            onClick={() => history.push(`/u/${user.displayName}`)}
                        >
                            <div className='image'>
                                <img src={user.profileImage} alt='' />
                            </div>
                            <div className='text'>
                                <div className='text__name'>Adam</div>
                                <div className='text__subtitle'>@{user.displayName}</div>
                                <div className='text__subtitle'>
                                    Adam ahskjaskjdbak jdbakjsbdkjabsd sheet Adam ahskjaskjdbak
                                    jdbakjsbdkjabsd sheet
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>Could not find any users for {queryString}</p>
            )}
        </div>
    )
}
