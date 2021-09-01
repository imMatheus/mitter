import React, { ReactElement, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { fs } from '../../firebase'

export default function ProfileEdit(): ReactElement {
    const { currentUser } = useAuth()
    const [name, setName] = useState(currentUser!.name || '')
    const [bio, setBio] = useState(currentUser!.bio || '')
    console.log('currentUser', currentUser)
    const changeName = async () => {
        if (currentUser) {
            console.log('started')

            await fs.collection('users').doc(currentUser.uid).update({
                name: name,
            })
            await fs
                .collection('users')
                .doc(currentUser.uid)
                .collection('tweets')
                .get()
                .then(async (querySnapshot) => {
                    querySnapshot.forEach(async function (doc) {
                        fs.collection('users')
                            .doc(currentUser.uid)
                            .collection('tweets')
                            .doc(doc.id)
                            .update({ name: name })
                    })
                })
            console.log('ened')
        }
    }
    const changeBio = async () => {
        if (currentUser) {
            console.log('started')

            await fs.collection('users').doc(currentUser.uid).update({
                bio: bio,
            })

            console.log('ened')
        }
    }
    return (
        <div className='settings-section profileEdit-wrapper'>
            <h2>Edit profile</h2>
            <button onClick={changeName}>change</button>
            <button onClick={changeBio}>change</button>
            <div className='input-field'>
                <label htmlFor='name'>
                    <div className='title'>
                        <span className='legend'>Name</span>
                        <span className='tracker'>{name.length} / 50</span>
                    </div>

                    <div className='input'>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </div>
                </label>
            </div>
            <div className='input-field'>
                <label htmlFor='bio'>
                    <div className='title'>
                        <span className='legend'>Bio</span>
                        <span className='tracker'>{bio.length} / 160</span>
                    </div>

                    <div className='input'>
                        <input
                            type='text'
                            name='bio'
                            id='bio'
                            value={bio}
                            onChange={(e: any) => setBio(e.target.value)}
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}
