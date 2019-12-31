import React, { useEffect, useContext } from 'react'
import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import {withNavigation} from 'react-navigation'
import {View } from 'react-native';



const Initial = ({navigation}) => {
  const firebase = useContext(FirebaseContext);
  // calling useEffect with empty brackets in the end means that it calls once
  // on page load
  useEffect(() => {
      try {
       // checks if current user, could be optimized by using firebase
       // .auth.onAuthStateChanged but i had trouble getting that function to resolve
      const user = firebase.auth().currentUser;
      if (user) {
        // if the user has previously logged in
        navigation.navigate('App')
      } else {
        // if the user has previously signed out from the app
        navigation.navigate('Auth')
      }
      
      } catch (error) {
        console.log(error)
      }
  }, []);

  return (<View></View>);

}

export default withNavigation(Initial)
