import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styled from 'styled-components';

const fullWidth = Dimensions.get('window').width;

const ChatListItem = ({ chatRoom }) => {
  const [otherUser, setOtherUser] = useState(null);

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback>
      <Container>
        <LefContainer>
          <MidContainer>
            <Username>{otherUser.name}</Username>
            <LastMessage numberOfLines={2}>{chatRoom.lastMessage}</LastMessage>
          </MidContainer>
        </LefContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  border: 5px;
  border-color: royalblue;
`;
const LefContainer = styled(View)`
  flex-direction: row;
`;
const MidContainer = styled(View)`
  justify-content: space-around;
`;

const Username = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;

const LastMessage = styled(Text)`
  font-size: 16px;
  color: grey;
`;
export default ChatListItem;
