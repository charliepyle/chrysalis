import { createStackNavigator } from 'react-navigation-stack'
import Login from '../views/Login'
import Signup from '../views/Signup'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

export default AuthNavigation
