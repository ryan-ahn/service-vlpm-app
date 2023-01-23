/**
 * Author : Ryan
 * Date : 2022-08-08
 * Desc : DecideDealModal
 */

import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore } from '@libs/zustand';

export default function DecideDealModal({ navigation }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'DECIDE_CHAT'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <HighlightButtonBox onPress={() => navigation.navigate('home')}>
              <HighlightButtonText>거래 확정하기</HighlightButtonText>
            </HighlightButtonBox>
            <BasicButtonBox>
              <BasicButtonText>내가 보낸 요청서 보기</BasicButtonText>
            </BasicButtonBox>
            <BasicButtonBox>
              <BasicButtonText>🚨 신고하기</BasicButtonText>
            </BasicButtonBox>
            <BasicButtonBox>
              <BasicButtonText>채팅방 나가기</BasicButtonText>
            </BasicButtonBox>
          </ContentBlock>
        </ModalView>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ModalView = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ContentBlock = styled(View)`
  width: 100%;
  padding: 30px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const HighlightButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  margin-bottom: 10px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const HighlightButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const BasicButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  margin-bottom: 10px;
  border: 1px solid #557fe6;
  border-radius: 14px;
  background-color: white;
`;

const BasicButtonText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
