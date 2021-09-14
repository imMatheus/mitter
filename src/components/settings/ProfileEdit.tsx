import React, { ReactElement, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { fs } from '../../firebase'

export default function ProfileEdit(): ReactElement {
    const { currentUser } = useAuth()
    const [name, setName] = useState(currentUser!.name || '')
    const [bio, setBio] = useState(currentUser!.bio || '')
    const [location, setLocation] = useState(currentUser!.location || '')
    const [error, setError] = useState('')
    const UpdateProfile = async () => {
        try {
            if (currentUser!.name !== name) await updateName()
            if (currentUser!.bio !== bio) await updateBio()
            if (currentUser!.location !== location) await updateLocation()
        } catch (error) {
            console.log(error)
            return setError('Oops, something went wrong')
        }
        setError('')
    }

    const updateName = async () => {
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
    const updateBio = async () => {
        if (currentUser) {
            console.log('started')

            await fs.collection('users').doc(currentUser.uid).update({
                bio: bio,
            })

            console.log('ened')
        }
    }
    const updateLocation = async () => {
        if (currentUser) {
            console.log('started')

            await fs.collection('users').doc(currentUser.uid).update({
                location: location,
            })

            console.log('ened')
        }
    }
    return (
        <div className='settings-section profileEdit-wrapper'>
            <h2>
                Edit profile
                <div>
                    <button onClick={UpdateProfile} className='action-btn'>
                        Update profile
                    </button>
                </div>
            </h2>
            <h5>{error}</h5>

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
                            max={50}
                            maxLength={50}
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
                            max={160}
                            maxLength={160}
                            value={bio}
                            onChange={(e: any) => setBio(e.target.value)}
                        />
                    </div>
                </label>
            </div>
            <div className='input-field'>
                <label htmlFor='location'>
                    <div className='title'>
                        <span className='legend'>Location</span>
                        <span className='tracker'>{location.length} / 30</span>
                    </div>

                    <div className='input'>
                        <input
                            type='text'
                            name='location'
                            id='location'
                            max={30}
                            maxLength={30}
                            value={location}
                            onChange={(e: any) => setLocation(e.target.value)}
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}
