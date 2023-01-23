import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const ChatMessage = ({ myId, item }) => {
  const isMyMessage = () => {
    return item.userId === myId;
  };

  return (
    <Container>
      <MessageBox
        style={[
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage() ? <Name>딜러</Name> : <Name>나</Name>}
        <Text>{item.message}</Text>
      </MessageBox>
    </Container>
  );
};

const Container = styled(View)`
  padding: 10px;
`;

const MessageBox = styled(View)`
  border-radius: 5px;
  padding: 10px;
`;

const Name = styled(Text)`
  color: #f0f;
  margin-bottom: 5px;
`;

export default ChatMessage;
