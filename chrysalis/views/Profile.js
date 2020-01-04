import React, { useContext, useState, useEffect, Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import PhotoGrid from '../components/PhotoGrid'

const Profile = ({navigation}) => {
  const firebase = useContext(FirebaseContext)
  const [data, setData] = useState({ name: "" })
  const [pics, setPics] = useState({ urls: [] })

  let uid  = firebase.auth().currentUser.uid

  useEffect(() => {
    const pullName = async () => {
      const ref = firebase.firestore().collection('users').doc(uid)
      const doc = ref.get().then(doc => {
        if (!doc.exists) {
          console.log('No user');
        } else {
          console.log('User Found')
          const name = doc.data().name

          setData({name: name})
        }
      }).catch(err => {
        console.log('query error: ', err)
      })

      const pic_ref = firebase.firestore().collection('images').where("uid", "==", uid)
      const pic_doc = pic_ref.onSnapshot(pic_doc => {
        let file_names = []
        pic_doc.forEach(pd => {
          file_names.push(`swapped_images/${pd.data().filename}`)
        })
        
        let download_urls = []
        file_names.forEach(async name => {
          const pr = firebase.storage().ref(name)
          const url = await pr.getDownloadURL()
          
          download_urls.push(url)
          console.log(download_urls)
          setPics({ urls: download_urls })
        })
      })
    }

    pullName()
  }, [])

  const handleSignout = async () => {
    try {
      await firebase.auth().signOut()
      navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
          </View>
      </View>
      <Button
        title='Sign Out'
        onPress={handleSignout}
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      />
      <PhotoGrid photos={pics.urls} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header:{
    backgroundColor: "#00BFFF",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 
export default withNavigation(Profile)