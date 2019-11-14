import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ScrollView
  } from 'react-native';



function HomeScreen({navigation}) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      );
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
      title: 'Home'
    };
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      marginTop: 20,
      paddingLeft: 5,
      paddingRight: 5
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


export default HomeScreen;