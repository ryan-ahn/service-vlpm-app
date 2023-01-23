/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : HomeNavigation
 */

import React, { useEffect } from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useConnection, useSendbirdChat } from '@sendbird/uikit-react-native';
import { useUserStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import HomeTab from '@screens/Home/HomeTab';
import EstimateTab from '@screens/Home/EstimateTab';
import CommunityTab from '@screens/Home/CommunityTab';
import MyPageTab from '@screens/Home/MyPageTab';

export default function HomeBottomNavigation() {
  // Roote State
  const { userDetail } = useUserStore();
  // Hooks
  const Tab = createBottomTabNavigator();
  const { connect } = useConnection();
  const { currentUser } = useSendbirdChat();

  useEffect(() => {
    if (!currentUser && userDetail) {
      connect(userDetail.id, { nickname: userDetail.name });
    }
  }, [currentUser, userDetail]);

  return (
    <Tab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: Platform.OS === 'ios' ? 80 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 15,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={'homeTab'}
        component={HomeTab}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? '#353C49' : '#8E94A0',
                fontSize: 11,
              }}
            >
              홈
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons icon={'homeActive'} width={20} height={20} />
            ) : (
              <Icons icon={'homeDeactive'} width={20} height={20} />
            ),
        }}
      />
      <Tab.Screen
        name={'EstimateTab'}
        component={EstimateTab}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#353C49' : '#8E94A0', fontSize: 11 }}>견적상담</Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons icon={'estimateActive'} width={20} height={20} />
            ) : (
              <Icons icon={'estimateDeactive'} width={20} height={20} />
            ),
        }}
      />
      {/* <Tab.Screen
        name={'CommunityTab'}
        component={CommunityTab}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#353C49' : '#8E94A0', fontSize: 11 }}>커뮤니티</Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons icon={'communityActive'} width={20} height={20} />
            ) : (
              <Icons icon={'communityDeactive'} width={20} height={20} />
            ),
        }}
      /> */}
      <Tab.Screen
        name={'MyPageTab'}
        component={MyPageTab}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#353C49' : '#8E94A0', fontSize: 11 }}>마이페이지</Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons icon={'mypageActive'} width={20} height={20} />
            ) : (
              <Icons icon={'mypageDeactive'} width={20} height={20} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
