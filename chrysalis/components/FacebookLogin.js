import React from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import firebase from 'react-native-firebase';
import database from '@react-native-firebase/database';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import {withNavigation} from 'react-navigation'

const FacebookLogin = ({navigation}) => {
    const login = async() => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                // handle this however suites the flow of your app
                return console.log("user cancelled sign in request");
            }
            
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                alert('Issue obtaining access token');
            }
            const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            
            const uid = firebase.auth().currentUser.uid;
            const email = firebase.auth().currentUser.email;
            const ref = database().ref(`/users/${uid}`);
            await ref.set({uid, email, name: firebase.auth().currentUser.displayName});
            console.info(JSON.stringify(firebaseUserCredential.user.toJSON()));
            navigation.navigate('App');
            return credential;
            
            //alert("Login was successful with permissions: " + result.grantedPermissions)
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }    
    return (
        <View>
          <Button title="Sign in with Facebook" 
          titleStyle={{color: '#F57C00'}}
          type='clear'
          onPress={() => {
            console.log(login());
          }}>
            
          </Button>
        </View>
      );
}

export default withNavigation(FacebookLogin);
