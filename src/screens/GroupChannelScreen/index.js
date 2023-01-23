/**
 * Author : Ryan
 * Date : 2022-11-05
 * Desc : index
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSendbirdChat, createGroupChannelFragment } from '@sendbird/uikit-react-native';

const GroupChannelFragment = createGroupChannelFragment();

export default function GroupChannelScreen() {
  // State
  const [channel, setChannel] = useState(null);
  // Hooks
  const navigation = useNavigation();
  const { params } = useRoute();
  const { sdk } = useSendbirdChat();

  const asyncChannel = useCallback(async () => {
    const getChannel = await sdk.groupChannel.getChannel(params.channelUrl);
    setChannel(getChannel);
  }, []);

  useEffect(() => {
    if (params.serializedChannel) {
      setChannel(sdk.groupChannel.buildGroupChannelFromSerializedData(params.serializedChannel));
    } else {
      asyncChannel();
    }
  }, []);

  if (channel !== null) {
    return (
      <GroupChannelFragment
        channel={channel}
        onChannelDeleted={() => {
          // Navigate to GroupChannelList function.
          navigation.navigate('groupChannelList');
        }}
        onPressHeaderLeft={() => {
          // Go back to the previous screen.
          navigation.goBack();
        }}
        // onPressHeaderRight={() => {
        //   // Navigate to GroupChannelSettings function.
        //   navigation.navigate('groupChannelSettings', {
        //     serializedChannel: params.serializedChannel,
        //   });
        // }}
      />
    );
  } else {
    return (
      <EmptyWrapper>
        <ActivityIndicator size="small" color="#557FE6" />
      </EmptyWrapper>
    );
  }
}

const EmptyWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100px;
`;
