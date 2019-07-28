import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDtciQXj-Cw9CftMd6jcE0NXrtlNVOtk-8',
    authDomain: 'react30-9ebe0.firebaseapp.com',
    databaseURL: 'https://react30-9ebe0.firebaseio.com',
    projectId: 'react30-9ebe0',
    storageBucket: '',
    messagingSenderId: '146597253385',
    appId: '1:146597253385:web:645ece10fd246b02',
}
firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(additionalData)
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {displayName, email} = userAuth

        const createdAt = new Date()

        try {
            await userRef.set({displayName, email, createdAt, ...additionalData})
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default firebase
