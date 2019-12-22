import React, { useContext, useState, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import uuid from 'react-native-uuid'
import {withNavigation} from 'react-navigation'
import {FirebaseContext} from '../utils/firebase'
// not sure if i need these two imports below
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

//import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';

// had to move styles above variables so it could read them. this should
// be refactored into a style sheet for the actual page. in fact. the individual
// component styles should be modularized even further and moved to utils section
const options = {
  path: 'images'
}	 

const Home = ({navigation}) => {
  
  // context and local state
  const firebase = useContext(FirebaseContext);
  const [uploading, setUploading] = useState(false);
  const [imgSource, setImgSource] = useState('');
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imgUri, setImgUri] = useState('');
  const [authenticated, setAuthenticated] = useState(0);
  const disabledStyle = uploading ? styles.disabledBtn : {};
  const windowWidth = Dimensions.get('window').width;
  const actionBtnStyles = [styles.btn, disabledStyle];

  const handleSignout = async () => {
    try {
      await firebase.signOut();
      navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  const pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('An error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImgSource(source);
        setImgUri(response.uri);
      }
    });
  };
  /**
   * Upload image method
   */
  const uploadImage = () => {
    const ext = imgUri.split('.').pop(); // Extract image extension
    const filename = `${uuid.v1()}.${ext}`; // Generate unique name
    setUploading(true);
    firebase
      .storage()
      .ref(`images/${filename}`)
      .putString(imgUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // calculate progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // this has changed from old class strategy and to be honest might need to change again
          if (progress === firebase.storage.TaskState.SUCCESS) {
            setImages(oldImages => [...oldImages, snapshot.downloadURL]);
            setUploading(false);
            setImgSource('');
            setImgUri('');
            setProgress(0);
            // this thing below is causing errors and should probably get rid of it
            AsyncStorage.setItem('images', JSON.stringify(images));
          }
        },
        error => {
          unsubscribe();
          console.log('error: ', error);
          alert('Sorry, Try again.');
        }
      );
    
    
    upload(filename);
  };
  
  const upload = async (filename) => { 
    // const ref = database().ref(`/images/${filename}`); 
    // await ref.set({filename, filename: true}); 
    try {
      // need to update thi DB reference
      const ref = firebase.firestore().collection('images').doc('imgUri');
    await ref.set({filename, filename: true});
    } catch (e) {
      console.error(e);
    }
    
  };




  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={actionBtnStyles}
          onPress={pickImage}
          disabled={uploading}
        >
          <View>
            <Text style={styles.btnTxt}>Pick image</Text>
          </View>
        </TouchableOpacity>
        {/** Display selected image */}
        {imgSource !== '' && (
          <View>
            <Image source={imgSource} style={styles.image} />
            {uploading && (
              <View
                style={[styles.progressBar, { width: `${progress}%` }]}
              />
            )}
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={uploadImage}
              disabled={uploading}
            >
              <View>
                {uploading ? (
                  <Text style={styles.btnTxt}>Uploading ...</Text>
                ) : (
                  <Text style={styles.btnTxt}>Upload image</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View>
          <Text
            style={{
              fontWeight: '600',
              paddingTop: 20,
              alignSelf: 'center'
            }}
          >
            {images.length > 0
              ? 'Your uploaded images'
              : 'There is no image you uploaded'}
          </Text>
        </View>
        <FlatList
          numColumns={2}
          style={{ marginTop: 20 }}
          data={images}
          renderItem={({ item: image, index }) => (
            <ImageRow
              windowWidth={windowWidth}
              image={image}
              popImage={() => removeImage(index)}
            />
          )}
          keyExtractor={index => index}
        />
      </View>
    </ScrollView>
      <Text>Home</Text>
      <Button
        title='Signout'
        onPress={handleSignout}
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
  justifyContent: 'center'
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  googlebtn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 134)',
    marginTop: 400,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});



export default withNavigation(Home)
