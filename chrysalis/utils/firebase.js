import React, {createContext} from 'react'
import app from 'firebase/app'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'

const FirebaseContext = createContext(null)
export { FirebaseContext }

const FirebaseProvider = ({children}) => {
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
  // fonts initialized here so they're global
  Icon.loadFont();
  Icon1.loadFont();
    return (
    <FirebaseContext.Provider value={ app }>
        { children }
    </FirebaseContext.Provider>
    )
}

export default FirebaseProvider