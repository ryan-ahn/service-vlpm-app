/**
 * Author : Ryan
 * Date : 2022-11-05
 * Desc : index
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createGroupChannelCreateFragment } from '@sendbird/uikit-react-native';

const GroupChannelCreateFragment = createGroupChannelCreateFragment();

export default function GroupChannelCreateScreen() {
  const navigation = useNavigation();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async channel => {
        // Navigate to GroupChannel function.
        navigation.replace('groupChannel', {
          serializedChannel: channel.serialize(),
        });
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
    />
  );
}
