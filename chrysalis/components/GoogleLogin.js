import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import database from '@react-native-firebase/database';



// Calling this function will open Google for login.
async function GoogleLogin() {
    try {
      // Add any configuration settings here:
      GoogleSignin.configure(
        {
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '303939570860-v560c7j3vmi210n1foijq5ebau9ucoq3.apps.googleusercontent.com', // required
        }
      );
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      const uid = firebase.auth().currentUser.uid;
      const ref = database().ref(`/users/${uid}`);
      await ref.set({uid, name: firebase.auth().currentUser.displayName});

      
  
      console.info(JSON.stringify(firebaseUserCredential.user.toJSON()));
      return credential;
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  export default GoogleLogin;