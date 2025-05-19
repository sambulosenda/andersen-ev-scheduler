import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainTabs from './MainTabs';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {user ? (
        // User is logged in
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      ) : (
        // User is not logged in
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ 
              title: 'Andersen EV',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ 
              title: 'Create Account',
              headerTitleAlign: 'center'
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;