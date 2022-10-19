import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import LoadingScreen from './LoadingScreen';
import Register from '../pages/Register';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: user.currentUser,
          tabBarHideOnKeyboard: true,
          tabBarIconStyle: {display: 'none'},
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
          },
        }}>
        {!user.currentUser ? (
          <Tab.Group>
            <Tab.Screen
              name="Login"
              component={user.isFetching ? LoadingScreen : Login}
            />
            <Tab.Screen
              name="Register"
              component={user.isFetching ? LoadingScreen : Register}
            />
          </Tab.Group>
        ) : (
          <Tab.Group>
            <Tab.Screen name="Cash Memo" component={Home} />
            {/* <Tab.Screen name="Customers" component={Customers} /> */}
            <Tab.Screen name="Products" component={Products} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
