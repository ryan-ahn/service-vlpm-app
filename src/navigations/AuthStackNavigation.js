/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : stackNavigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import PostCode from '@screens/PostCode';
import SignUpComplete from '@screens/Complete/SignUpComplete';

export default function AuthStackNavigation({ initialRoute }) {
  // Hooks
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'signIn'}>
      <Stack.Screen
        name={'signUp'}
        component={SignUp}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'signIn'}
        component={SignIn}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'postCode'}
        component={PostCode}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'signUpComplete'}
        component={SignUpComplete}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
}
