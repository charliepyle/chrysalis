import React, { useEffect, useContext } from 'react'
import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import {withNavigation} from 'react-navigation'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';



const Initial = ({navigation}) => {
  const firebase = useContext(FirebaseContext);
  // calling useEffect with empty brackets in the end means that it calls once
  // on page load
  useEffect(() => {
      try {
        // if you're in remote JS debug mode, you need to click on the screen
        // to execute the code below
        firebase.auth().onAuthStateChanged((user) => {
          user ? navigation.navigate('App') : navigation.navigate('Auth');
        })

      } catch (error) {
        console.log(error)
      }
  }, []);

  return (<View style={styles.container}>
    <Text>Loading</Text>
    <ActivityIndicator size="large" />
  </View>);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default withNavigation(Initial)

const ref = firebase.firestore().collection('users').doc(uid);
const doc = ref.get()
.then(doc => {
  if (!doc.exists) {
    console.log('No user'); 
  } else {
    console.log('user found');
    const name = doc.name;
    setData({name: name});
  }
})
.catch(err => {
  console.log('query error: ', err);
})
