/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : stackNavigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Permissions from '@screens/Permissions';

export default function PermissionsNavigation({ initialRoute }) {
  // Hooks
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'permissions'}>
      <Stack.Screen
        name={'permissions'}
        component={Permissions}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
}
