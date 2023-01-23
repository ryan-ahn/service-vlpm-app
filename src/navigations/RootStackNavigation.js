/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : stackNavigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import HomeBottomNavigation from '@navigations/HomeBottomNavigation';
import EstimateType from '@screens/EstimateType';
import CreateCall from '@screens/CreateCall';
import CallComplete from '@screens/Complete/CallComplete';
import CreatePost from '@screens/CreatePost';
import Specification from '@screens/Specification';
import SuccessfullDeal from '@screens/SuccessfullDeal';
import SuccessfullDealInfo from '@screens/SuccessfullDealInfo';
import SuccessfullDealSpec from '@screens/SuccessfullDealSpec';
import SaleStore from '@screens/SaleStore';
import StoreInfo from '@screens/StoreInfo';
import MyCall from '@screens/MyCall';
import GroupChannelCreateScreen from '@screens/GroupChannelCreateScreen';
import GroupChannelListScreen from '@screens/GroupChannelListScreen';
import GroupChannelScreen from '@screens/GroupChannelScreen';

export default function RootStackNavigation({ initialRoute }) {
  // Hooks
  const Stack = createNativeStackNavigator();
  const { currentUser } = useSendbirdChat();

  return (
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name={'home'}
        component={HomeBottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'estimateType'}
        component={EstimateType}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'createCall'}
        component={CreateCall}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'callComplete'}
        component={CallComplete}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'specification'}
        component={Specification}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'createPost'}
        component={CreatePost}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'successfullDeal'}
        component={SuccessfullDeal}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'successfullDealInfo'}
        component={SuccessfullDealInfo}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'successfullDealSpec'}
        component={SuccessfullDealSpec}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'saleStore'}
        component={SaleStore}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'storeInfo'}
        component={StoreInfo}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'myCall'}
        component={MyCall}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannelCreate'}
        component={GroupChannelCreateScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannelList'}
        component={GroupChannelListScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannel'}
        component={GroupChannelScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
}
