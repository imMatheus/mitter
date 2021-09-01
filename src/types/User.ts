import firebase from 'firebase/app'

export default interface User extends firebase.User {
    userUID: string
    email: string
    name: string
    displayName: string
    profileImage: string
    bio: string
    location: string
    url: string
    joinedAt: firebase.firestore.Timestamp
    amountOfFollowers: number
    amountOfFollowing: number
}
