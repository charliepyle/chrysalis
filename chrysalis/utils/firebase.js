import React, {createContext} from 'react'
import app from 'firebase/app'
import Config from 'react-native-config'

const FirebaseContext = createContext(null)
export { FirebaseContext }

const FirebaseProvider = ({children}) => {
  //console.log('api key: ', Config.REACT_APP_FIREBASE_API_KEY);
  if (!app.apps.length) {
        app.initializeApp({
          apiKey: Config.REACT_APP_FIREBASE_API_KEY,
          authDomain: Config.REACT_APP_FIREBASE_AUTH_DOMAIN,
          databaseURL: Config.REACT_APP_FIREBASE_DATABASE_URL,
          projectId: Config.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: Config.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: Config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: Config.REACT_APP_FIREBASE_APP_ID,
        })
      }
    // const loginWithEmail = (email, password) => {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    // };
    // const signupWithEmail =  (email, password) => {
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // };
    // const signOut =  () => {
    // firebase.auth().signOut()
    // };
    // const checkUserAuth = (user) => {
    // firebase.auth().onAuthStateChanged(user)
    // };

    // // firestore
    // const createNewUser = (userData) => {
    // firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(`${userData.uid}`)
    //     .set(userData)
    // }
    return (
    <FirebaseContext.Provider value={ app }>
        { children }
    </FirebaseContext.Provider>
    )
}

export default FirebaseProvider