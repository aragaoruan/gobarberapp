import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/**
 * NAO LOGADO
 */
import SingIn from '~/pages/SingIn';
import SingUp from '~/pages/SingUp';

/**
 * LOGADO
 */
import Dashboard from '~/pages/Dashboard';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SingIn,
          SingUp,
        }),
        App: createBottomTabNavigator({
          Dashboard,
        }),
      },
      { initialRouteName: signedIn ? 'App' : 'Sign' }
    )
  );
