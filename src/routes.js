import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import RepoBrowser from './pages/RepoBrowser';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#7159c1'},
          animationEnabled: true,
          headerTitleStyle: {
            marginHorizontal: 50,
            fontWeight: '100',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{title: 'Usuários'}}
        />
        <Stack.Screen name="User" component={User} options={{title: ''}} />
        <Stack.Screen
          name="RepoBrowser"
          component={RepoBrowser}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
