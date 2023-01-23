/**
 * Author : Ryan
 * Date : 2022-11-05
 * Desc : index
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import GroupChannelListFragment from './GroupChannelListFragment';

export default function GroupChannelListScreen() {
  const navigation = useNavigation();

  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
        // Navigate to GroupChannelCreate function.
        navigation.navigate('groupChannelCreate', { channelType });
      }}
      onPressChannel={channel => {
        // Navigate to GroupChannel function.
        navigation.navigate('groupChannel', {
          serializedChannel: channel.serialize(),
        });
      }}
    />
  );
}
