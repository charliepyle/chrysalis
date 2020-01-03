import React, { useContext, useState, Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import PhotoGrid from '../components/PhotoGrid'

const Profile = ({navigation}) => {

  let pics = ['https://i.imgur.com/LLzTFMU.png', 
  'https://i.imgur.com/dURBThe.jpg', 
  'https://i.imgur.com/xs3373j.jpg',
  'https://i.imgur.com/LLzTFMU.png', 
  'https://i.imgur.com/dURBThe.jpg', 
  'https://i.imgur.com/xs3373j.jpg',
  'https://i.imgur.com/LLzTFMU.png', 
  'https://i.imgur.com/dURBThe.jpg', 
  'https://i.imgur.com/xs3373j.jpg',
  'https://i.imgur.com/LLzTFMU.png', 
  'https://i.imgur.com/dURBThe.jpg', 
  'https://i.imgur.com/xs3373j.jpg',
  'https://i.imgur.com/LLzTFMU.png', 
  'https://i.imgur.com/dURBThe.jpg', 
  'https://i.imgur.com/xs3373j.jpg'
  ]

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
            <Text style={styles.name}>John Doe</Text>
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
      <PhotoGrid photos={pics} />
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