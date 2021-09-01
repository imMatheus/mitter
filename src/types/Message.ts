import firebase from 'firebase/app'
export default interface Message {
    createdAt: firebase.firestore.Timestamp
    senderId: string
    text: string
}
