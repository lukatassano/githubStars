import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

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
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{title: 'Usuários'}}
        />
        <Stack.Screen name="User" component={User} options={{title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
