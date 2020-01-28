import React, { Component, Fragment, useContext, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from 'react-native-ionicons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import AppLogo from '../components/AppLogo'
import {FirebaseContext} from '../utils/firebase'
import 'firebase/auth';
import GoogleLogin from '../components/GoogleLogin'
import {withNavigation} from 'react-navigation'
import FacebookLogin from '../components/FacebookLogin'
import {QUERY_USER} from '../utils/queries';
import { useLazyQuery } from '@apollo/react-hooks';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

const Login = ({navigation}) => {
  const [passwordVisibility, setVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('ios-eye');
  const firebase = useContext(FirebaseContext);
  const [queryUser, { loading, data }] = useLazyQuery(QUERY_USER);
  // const { authnavigation } = useContext(AuthNavigation);
  // const { globalnavigation } = useContext(GlobalNavigation);

  // replace with navigation context API for consuming
  const goToSignup = () => navigation.navigate('Signup')

  // replace
  const handlePasswordVisibility = () => {
    setVisibility(!passwordVisibility);
    setRightIcon(prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye');
  }


  const handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      // replace with firebase context API
      console.log('test auth: ', firebase);

      /* the code below checks if the user exists in the MySQL instance.
      error handling isn't implemented yet but the query works for the future*/
      queryUser({variables: {
        email: email,
      }});
      if (data) {
        console.log(data);

      } 

      const response = await firebase.auth().signInWithEmailAndPassword(email, password);

        if (response.user) {
          // replace with global navigation (from auth to app)
          navigation.navigate('App')
        }
      
      //console.log(data);
    // .then(response => {
    //   console.log(response)
    // }).catch(e => {
    //   console.log(e)
    // })
      
      
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <HideWithKeyboard style={styles.logoContainer}>
        <AppLogo />
      </HideWithKeyboard>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          handleOnLogin(values, actions)
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting
        }) => (
          <Fragment>
            <FormInput
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Enter email'
              autoCapitalize='none'
              iconName='ios-mail'
              iconColor='#2C384A'
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Enter password'
              secureTextEntry={passwordVisibility}
              iconName='ios-lock'
              iconColor='#2C384A'
              onBlur={handleBlur('password')}
              rightIcon={
                <TouchableOpacity onPress={handlePasswordVisibility}>
                 {/* <Ionicons name={rightIcon} size={28} color='grey' /> */}
                </TouchableOpacity>
              }
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType='outline'
                onPress={handleSubmit}
                title='LOGIN'
                buttonColor='#039BE5'
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
      {/* <TouchableOpacity 
        style={styles.googlebtn}
        onPress={GoogleLogin}>
          <View>
            <Text style={styles.btnTxt}>Sign in with Google</Text>
          </View>
      </TouchableOpacity> */}
      
      <Button
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      />
      {/* need to restyle this with the sign in with google
      https://developers.google.com/identity/branding-guidelines
       */}
      <GoogleLogin/>
      <FacebookLogin/>
      {/* <Button
        title="Sign in with Google"
        onPress={() => {
          GoogleLogin(navigation);

        }
      }
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      /> */}
      
      {/* <Button
        title="Sign in with Facebook"
        onPress={() => {
          console.log("pressed facebook button");
          FacebookLogin();
          

        }
      }
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      /> */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  label: {
    color: '#F57C00',
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
  btnTxt: {
    color: '#fff'
  }
})

export default withNavigation(Login)
