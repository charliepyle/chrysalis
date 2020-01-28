import React, {useContext}from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import database from '@react-native-firebase/database';
import {withNavigation} from 'react-navigation'
import {ADD_OR_UPDATE_USER} from '../utils/mutations';
import {FirebaseContext} from '../utils/firebase'
import { useMutation } from '@apollo/react-hooks';




// Calling this function will open Google for login.
const GoogleLogin = ({navigation}) => {
  const firebase = useContext(FirebaseContext)
  const [addUser, { gqlResults }] = useMutation(ADD_OR_UPDATE_USER);
  const login = async() => {
    try {
      // Add any configuration settings here:
      
      await GoogleSignin.configure(
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
      console.log('google data: ', data.user)

      console.log('addUser results: ', addUser({variables: {
        firstName: data.user.givenName,
        lastName: data.user.familyName,
        email: data.user.email,
        password: "testPassword3"
    }}));

      const uid = firebase.auth().currentUser.uid;
      const email = firebase.auth().currentUser.email;
      const ref = database().ref(`/users/${uid}`);
      await ref.set({uid, email, name: firebase.auth().currentUser.displayName});
  
      
  
      console.info(JSON.stringify(firebaseUserCredential.user.toJSON()));
      navigation.navigate('App');
      return credential;
    } catch (e) {
      return e;
    }
  }

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <GoogleSigninButton 
        style={{ width: 312, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => { console.log(login()) }}
      />
      {/* <Button title="Sign in with Google" 
      titleStyle={{color: '#F57C00'}}
      type='clear'
      onPress={() => {
        console.log(login());
      }}>
        
      </Button> */}
    </View>
  );   
}

  export default withNavigation(GoogleLogin);