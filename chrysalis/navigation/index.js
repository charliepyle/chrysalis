import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Initial from '../views/Initial'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'

// initial contains the logic as to whether it should go to the home page
// of the app or to the login page of the app. react-navigation is how you 
// structure pages like a stack.
const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'Initial'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
