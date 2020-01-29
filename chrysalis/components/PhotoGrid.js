import React, { useContext, useEffect } from 'react'

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
import { useMutation } from '@apollo/react-hooks';
import {UPLOAD_IMAGE} from '../utils/mutations';
import {QUERY_USER} from '../utils/queries';
import { useLazyQuery } from '@apollo/react-hooks';

import axios from 'axios'

const PhotoGrid = ({ photos, type, ...rest }) => {

  const firebase = useContext(FirebaseContext)
  let uid  = firebase.auth().currentUser.uid
  const [uploadImage, { gqlResults }] = useMutation(UPLOAD_IMAGE);

  const windowWidth = Dimensions.get('window').width
  const IMAGES_PER_ROW = 3

  let userId;

  const [queryUser, { userData, loading }] = useLazyQuery(QUERY_USER)

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


        uploadImage({variables: {
          url: `${pic_id}.jpg`,
          id: userId,
      }})
        // firebase.firestore().collection('images').doc(`${pic_id}`).set(picData).then(res => {
        //   console.log(res)
        // })
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

  useEffect(() => {
    queryUser({
      onCompleted: result => {
        userId = result.id;
      }
    })
  }, [])

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