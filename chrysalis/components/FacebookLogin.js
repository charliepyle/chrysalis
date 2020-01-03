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
            console.log("entered facebook login");
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                // handle this however suites the flow of your app
                alert("User cancelled request");
            }
            
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                alert('Issue obtaining access token');
            }
            const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            
            const uid = firebase.auth().currentUser.uid;
            const ref = database().ref(`/users/${uid}`);
            await ref.set({uid, name: firebase.auth().currentUser.displayName});
            console.info(JSON.stringify(firebaseUserCredential.user.toJSON()));
            navigation.navigate('App');
            return credential;
            
            //alert("Login was successful with permissions: " + result.grantedPermissions)
        }
        catch (e) {
            console.error(e);
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
        
        // <View>
        //     <LoginButton
        //     publishPermissions={["email"]}
        //     onLoginFinished={
        //         (error, result) => {
        //             if (error) {
        //                 alert("Login failed with error: " + error.message);
        //             } else if (result.isCancelled) {
        //                 alert("Login was cancelled");
        //             } else {
        //                 try {
        //                     const data = await AccessToken.getCurrentAccessToken();

        //                     if (!data) {
        //                         alert('Issue obtaining access token');
        //                     }
        //                     const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                            
        //                     const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
                            
        //                     const uid = firebase.auth().currentUser.uid;
        //                     const ref = database().ref(`/users/${uid}`);
        //                     await ref.set({uid, name: firebase.auth().currentUser.displayName});
        //                     navigation.navigate('App');
        //                     console.info(JSON.stringify(firebaseUserCredential.user.toJSON()));
        //                     //alert("Login was successful with permissions: " + result.grantedPermissions)
        //                 }
        //                 catch (e) {
        //                     console.error(e);
        //                 }
                        
        //             }
        //         }
        //     }
        //     onLogoutFinished={() => alert("User logged out")}/>
        // </View> 
}

export default withNavigation(FacebookLogin);
