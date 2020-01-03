import React, { useEffect, useContext } from 'react'
import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import {withNavigation} from 'react-navigation'
import { View } from 'react-native';



const Initial = ({navigation}) => {
  const firebase = useContext(FirebaseContext);
  // calling useEffect with empty brackets in the end means that it calls once
  // on page load
  useEffect(() => {
      try {
        // if you're in remote JS debug mode, you need to click on the screen
        // to execute the code below
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user);
          user ? navigation.navigate('App') : navigation.navigate('Auth');
        })

      } catch (error) {
        console.log(error)
      }
  }, []);

  return (<View></View>);

}

export default withNavigation(Initial)
