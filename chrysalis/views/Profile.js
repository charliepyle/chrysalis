import React, { useContext, useState, useEffect, Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {QUERY_USER, QUERY_USER_IMAGES, QUERY_CACHED_USER} from '../utils/queries';
import { useLazyQuery } from '@apollo/react-hooks';
import {Subscription} from 'react-apollo'
import PhotoGrid from '../components/PhotoGrid'
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag'

const Profile = ({navigation}) => {
  const firebase = useContext(FirebaseContext)
  const [nameData, setData] = useState({ name: "" })
  const [pics, setPics] = useState({ urls: [] })
  const client = useApolloClient();
  let user = {
    id: "",
    email: "",
    firstName: "hello",
    lastName: "world",
  };
  
  // const [localUserData, {localUserDataResults, userLoading}] = useLazyQuery(QUERY_CACHED_USER, {
  //   onCompleted: results => {
  //     console.log(results);
  //   }
  // })

  const [queryUser, { userData, loading }] = useLazyQuery(QUERY_USER, {
    variables: {email: firebase.auth().currentUser.email},
    onCompleted: userQuery => {
      userId = userQuery.user.id
      queryImages({
        variables: { userId: userQuery.user.id }
      })
    }
  });
  const [queryImages, { imagesLoading, imagesData }] = useLazyQuery(QUERY_USER_IMAGES, {
    onCompleted: photoData => {
      pullName(photoData.userImages)
    }
  });
  

  useEffect(() => {
    //localUserData()
    
    const { currentUser } = client.readQuery({
      query: QUERY_CACHED_USER
    });
    setData(user.firstName + " " + user.lastName)
    user = currentUser;
    console.log(user);
    queryUser()
    //console.log('current user from cache: ', currentUser);
  }, [])

  const pullName = async (photoLinks) => {
    let file_names = []
    photoLinks.forEach(pd => {
        file_names.push(`swapped_images/${pd.url}`)
      })
      
      let download_urls = []
      file_names.forEach(async name => {
        const pr = firebase.storage().ref(name)
        const url = await pr.getDownloadURL()
        
        download_urls.push(url)
        console.log(download_urls)
        setPics({ urls: download_urls })
      })
  }

  const handleSignout = async () => {
    try {
      await firebase.auth().signOut()
      client.resetStore();
      navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

    return (
      
        <View style={styles.container}>
          <Subscription subscription={QUERY_USER} variables={{id: "34567"}} onSubscriptionData={opts => {
        console.log(opts.subscriptionData)
        setPics([...pics, opts.subscriptionData])
      }
        }/>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{nameData.name}</Text>
                <Text style={styles.info}>UX Designer / Mobile developer</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              </View>
          </View>
          <Button
            title='Sign Out'
            onPress={handleSignout}
            titleStyle={{
              color: '#F57C00'
            }}
            type='clear'
          />
          <PhotoGrid photos={pics.urls} />
        </View>
      
      // </Subscription>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header:{
    backgroundColor: "#00BFFF",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 
export default withNavigation(Profile)