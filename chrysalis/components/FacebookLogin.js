import React, {useContext}from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import database from '@react-native-firebase/database';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import {withNavigation} from 'react-navigation'
import {FirebaseContext} from '../utils/firebase'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

const ADD_TODO = gql`
    mutation createUserMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id
            firstName
            lastName
        }
    }
`;


const FacebookLogin = ({navigation}) => {
    const firebase = useContext(FirebaseContext)
    const [addTodo, { gqlResults }] = useMutation(ADD_TODO);
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
            console.log(data);
            const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            console.log('credential: ', credential)
            
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            
            const uid = firebase.auth().currentUser.uid;
            const email = firebase.auth().currentUser.email;

            console.log('1')

            console.log(addTodo({variables: {
                firstName: "testFirstName2",
                lastName: "testLastName2",
                email: "testEmail2",
                password: "testPassword2"
            }}));
            
            console.log('graphql results ', gqlResults)
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
