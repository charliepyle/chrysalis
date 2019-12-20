import React, { Component } from 'react'
//import { AppLoading } from 'expo'
//import { Asset } from 'expo-asset'
//import * as Font from 'expo-font'
//import * as Icon from '@expo/vector-icons'
import { withFirebaseHOC } from '../config/Firebase'
import {View } from 'react-native';

// could probably be optimized by converting to a functional component
class Initial extends Component {
  state = {
    isAssetsLoadingComplete: false
  }

  componentDidMount = async () => {
    try {
      // previously
    //   this.loadLocalAsync()
      
    // using firebase in props available as it's been passed down.
      await this.props.firebase.checkUserAuth(user => {
        if (user) {
          // if the user has previously logged in
          this.props.navigation.navigate('App')
        } else {
          // if the user has previously signed out from the app
          this.props.navigation.navigate('Auth')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


// commented all of this out below because I ran into problems with Ionicons
//   loadLocalAsync = async () => {
//     return await Promise.all([
//       Asset.loadAsync([
//         require('../assets/flame.png'),
//         require('../assets/icon.png')
//       ]),
//       Font.loadAsync({
//         ...Icon.Ionicons.font
//       })
//     ])
//   }

//   handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error)
//   }

//   handleFinishLoading = () => {
//     this.setState({ isAssetsLoadingComplete: true })
//   }

  render() {
    return (
        <View></View>
        //   <AppLoading
    //     startAsync={this.loadLocalAsync}
    //     onFinish={this.handleFinishLoading}
    //     onError={this.handleLoadingError}
    //   />
    );
  }
}

export default withFirebaseHOC(Initial)
