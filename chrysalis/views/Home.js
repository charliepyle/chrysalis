import React, { Component } from 'react'
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
//import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import ImagePicker from 'react-native-image-picker';

// had to move styles above variables so it could read them. this should
// be refactored into a style sheet for the actual page. in fact. the individual
// component styles should be modularized even further and moved to utils section
const options = {
  path: 'images'
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

const uploading = 0; 
const  imgSource = '';
const   progress = 0; 
const  images = []; 
const authenticated = 0;
const  windowWidth = Dimensions.get('window').width;
const  disabledStyle = uploading ? styles.disabledBtn : {};
const  actionBtnStyles = [styles.btn, disabledStyle];


class Home extends Component {
  
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('An error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`images/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );
    
    
    this.upload(filename);
  };
  
  upload = async (filename) => { 
    // const ref = database().ref(`/images/${filename}`); 
    // await ref.set({filename, filename: true}); 
    try {
      const ref = database().ref(`/images/123`);
    await ref.set({filename, filename: true});
    } catch (e) {
      console.error(e);
    }
    
  };
  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={actionBtnStyles}
            onPress={this.pickImage}
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
                onPress={this.uploadImage}
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
                popImage={() => this.removeImage(index)}
              />
            )}
            keyExtractor={index => index}
          />
        </View>
      </ScrollView>
        <Text>Home</Text>
        <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </View>
    )
  }
}



export default withFirebaseHOC(Home)
