import React from 'react'

import {
  Dimensions,
  Image,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import axios from 'axios'

const PhotoGrid = ({ photos, type, ...rest }) => {

  const windowWidth = Dimensions.get('window').width
  const IMAGES_PER_ROW = 3

  const calculatedSize = () => {
    let size = windowWidth / IMAGES_PER_ROW
    return {width: size, height: size}
  }

  // Probably not the best way to do this
  const onImagePress = (image) => {
    if (type === "SWAP") {
      axios.post('http://localhost:5000/swap_photo_temp', {
        url: image,
        filename: "sample_file"
      })
      .then(function (response) {
        console.log(response);
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