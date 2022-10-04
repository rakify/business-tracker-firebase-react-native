import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
// import Admin from './../pages/Admin';
// import Calculation from './../pages/Calculation';
import LoadingScreen from './LoadingScreen';
import Register from '../pages/Register';
import UpdateUser from '../pages/UpdateUser';
// import UpdateUser from '../pages/UpdateUser';
// import UpdateKey from './../pages/UpdateKey';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarHideOnKeyboard: true,
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
        ) : !user.currentUser.customers ? (
          <Tab.Screen name="UpdateUser" component={UpdateUser} options={{}} />
        ) : (
          <Tab.Group>
            <Tab.Screen name="Home" component={Home} />
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
