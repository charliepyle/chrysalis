import React, { useContext } from 'react'

import {
  Dimensions,
  Image,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import uuid from 'react-native-uuid'

import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import axios from 'axios'

const PhotoGrid = ({ photos, type, ...rest }) => {

  const firebase = useContext(FirebaseContext)
  let uid  = firebase.auth().currentUser.uid

  const windowWidth = Dimensions.get('window').width
  const IMAGES_PER_ROW = 3

  const calculatedSize = () => {
    let size = windowWidth / IMAGES_PER_ROW
    return {width: size, height: size}
  }

  // Probably not the best way to do this
  const onImagePress = (image) => {
    if (type === "SWAP") {
      let pic_id = uuid.v1()
      axios.post('http://localhost:5000/swap_photo_temp', {
        url: image,
        filename: pic_id
      })
      .then(function (response) {
        picData = {
          filename: `${pic_id}.jpg`, 
          uid: uid,
          timestamp: new Date().getTime()
        }

        firebase.firestore().collection('images').doc(`${pic_id}`).set(picData).then(res => {
          console.log(res)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const renderImages = () => {
    return photos.map((image, index) => {
      return (
        <View key={index} style={[calculatedSize(),
        index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0},
        {marginBottom: 2}
        ]}>
          <TouchableHighlight style={{flex: 1}} onPress={onImagePress.bind(this, image)}>
            <Image style={{flex: 1, width: undefined, height: undefined}}
              source={{uri: image}}
            />
          </TouchableHighlight>  
        </View>
      )
    })
  }

  return (
    <ScrollView contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap'}}>
      {renderImages()}
    </ScrollView>
  );


  /*return (
    <FlatList
      numColumns={IMAGES_PER_ROW}
      data={photos}
      renderItem={({item, index, separators}) => (
        <Image key={index} style={[calculatedSize()]} source={{uri: item}} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );*/
}

export default PhotoGrid