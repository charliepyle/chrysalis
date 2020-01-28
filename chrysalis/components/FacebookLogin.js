import React, {useContext}from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import database from '@react-native-firebase/database';
import { AccessToken, LoginManager, GraphRequest } from 'react-native-fbsdk';
import {ADD_OR_UPDATE_USER} from '../utils/mutations';
import {withNavigation} from 'react-navigation'
import {FirebaseContext} from '../utils/firebase'
import { useMutation } from '@apollo/react-hooks';

const initUser = (data) => {
    const {accessToken} = data
    console.log('alldata: ', data);
    console.log('init token: ', accessToken)
    return new Promise((resolve, reject) => {
        fetch('https://graph.facebook.com/v5.0/me?fields=email,first_name,last_name,friends&access_token=' + accessToken)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        }).catch(e => {
            reject(console.error('Error getting facebook data: ', e))
        })
    })
    
}


const FacebookLogin = ({navigation}) => {
    const firebase = useContext(FirebaseContext)
    const [addUser, { gqlResults }] = useMutation(ADD_OR_UPDATE_USER);
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
            initUser(data).then(json => {
                console.log('addUser results: ', addUser({variables: {
                    firstName: json.first_name,
                    lastName: json.last_name,
                    email: json.email,
                    password: "testPassword3"
                }}));
            });
            

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
          titleStyle={{color: 'blue'}}
          type='clear'
          onPress={() => {
            console.log(login());
          }}>
            
          </Button>
        </View>
      );
}

export default withNavigation(FacebookLogin);
