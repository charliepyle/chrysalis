import React, { useContext, useState, useEffect, Component } from 'react'
import { withNavigation } from 'react-navigation'
import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import PhotoGrid from '../components/PhotoGrid'

const Swap = ({navigation}) => {
  const firebase = useContext(FirebaseContext)
  const [data, setData] = useState({ pics: [] })

  useEffect(() => {
    const pullMemes = async () => {
      const ref = firebase.storage().ref(`memes/3l1r6e.jpg`)
      const url = await ref.getDownloadURL()
      setData({pics: [url]})
    }

    pullMemes()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Select image to face swap!</Text>
      <PhotoGrid photos={data.pics} type="SWAP" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default withNavigation(Swap)
