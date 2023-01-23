import React from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useGroupChannelList } from '@sendbird/uikit-chat-hooks';
import { useFreshCallback } from '@sendbird/uikit-utils';
import {
  createGroupChannelListModule,
  StatusComposition,
  useSendbirdChat,
} from '@sendbird/uikit-react-native';
import { milliSecondsLastTime } from '@libs/utils/validation';
import Icons from '@components/Common/Icons';

const GroupChannelListModule = createGroupChannelListModule(); // new module

export default function GroupChannelListFragment({
  onPressChannel,
  TypeSelectorHeader,
  onPressCreateChannel,
  queryCreator,
  collectionCreator,
  skipTypeSelection = false,
  flatListProps = {},
}) {
  // Hooks
  const { sdk, currentUser } = useSendbirdChat();
  const { groupChannels, next, loading } = useGroupChannelList(sdk, currentUser?.userId, {
    queryCreator,
    collectionCreator,
    enableCollectionWithoutLocalCache: !queryCreator,
  });
  // Value
  const screenWidth = Dimensions.get('window').width;
  const timestamp = new Date().getTime();

  // Render Item
  const renderGroupChannelList = useFreshCallback((channel, onLongPressChannel) => {
    return (
      <ItemWrapper onPress={() => onPressChannel(channel)} onLongPress={() => onLongPressChannel()}>
        <FlexSpaceView>
          <FlexRowView>
            <StoreIconBox>
              <Icons icon={'logoSymbolGray'} width={32} height={20} />
            </StoreIconBox>
            <FlexColumnBox>
              <StoreNameBox style={{ width: screenWidth - 100 }}>
                <StoreNameText>
                  {channel.creator !== null ? channel.creator.nickname : 'Admin'}
                </StoreNameText>
                <CreateAtText>
                  {milliSecondsLastTime(timestamp - channel.lastMessage.createdAt)}
                </CreateAtText>
              </StoreNameBox>
              <LastMessageBox style={{ width: screenWidth - 115 }}>
                <LastMessageText numberOfLines={1}>{channel.lastMessage.message}</LastMessageText>
                <UnreadBox attrHidden={channel.unreadMessageCount === 0}>
                  <UnreadText>{channel.unreadMessageCount}</UnreadText>
                </UnreadBox>
              </LastMessageBox>
            </FlexColumnBox>
          </FlexRowView>
        </FlexSpaceView>
      </ItemWrapper>
    );
  });

  return (
    <GroupChannelListModule.Provider>
      <StatusComposition loading={loading} LoadingComponent={null}>
        <GroupChannelListModule.List
          groupChannels={groupChannels}
          renderGroupChannelPreview={renderGroupChannelList}
          onLoadNext={next}
          flatListProps={{
            ListEmptyComponent: null,
            contentContainerStyle: { flexGrow: 1 },
            ...flatListProps,
          }}
        />
      </StatusComposition>
      <GroupChannelListModule.TypeSelector
        skipTypeSelection={skipTypeSelection}
        Header={TypeSelectorHeader}
        onSelectType={onPressCreateChannel}
      />
    </GroupChannelListModule.Provider>
  );
}

const Wrapper = styled(View)``;

const ItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  width: 100%;
  margin: 20px 0;
`;

const FlexSpaceView = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
`;

const FlexRowView = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const StoreIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-right: 15px;
  border-radius: 21px;
  background-color: #eee;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  height: 42px;
`;

const StoreNameBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-end', 'row')};
`;

const StoreNameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 20)};
`;

const CreateAtText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 400, 18)};
`;

const LastMessageBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
`;

const LastMessageText = styled(Text)`
  width: 100%;
  ${({ theme }) => theme.fontSet(13, 300, 16)};
`;

const SinceText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 400, 18)};
`;

const UnreadBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #f26467;
  ${props =>
    props.attrHidden &&
    css`
      display: none;
    `}
`;

const UnreadText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(9, 700, 13)};
`;
