import { createStackNavigator } from 'react-navigation-stack'
import Home from '../views/Home'
import Profile from '../views/Profile'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile }
  },
  {
    initialRouteName: 'Home'
  }
)

export default AppNavigation
