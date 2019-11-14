import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Initial from '../views/Initial'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'


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
