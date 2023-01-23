/**
 * Author : Ryan
 * Date : 2022-06-12
 * Desc : EstimateToContinueModal
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore } from '@libs/zustand';

export default function EstimateToContinueModal({ navigation }) {
  const { isOpen, closeModal, modalType } = useModalStore();

  const onPressRouteToStack = useCallback(button => {
    switch (button) {
      case 'home':
        closeModal();
        navigation.navigate('home');
        break;
      case 'continue':
        closeModal();
    }
  }, []);

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'ESTIMATE_CONTINUE'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'계속 작성할까요?'}</TitleBoldText>
            </TitleTextBox>
            <DescriptionBox>
              <DescriptionText>
                {'몇가지 정보만 더 알려주시면\n견적을 받을 수 있어요.'}
              </DescriptionText>
            </DescriptionBox>
            <ButtonBox>
              <GoToHomeBox onPress={() => onPressRouteToStack('home')}>
                <NewEstimateText>홈으로</NewEstimateText>
              </GoToHomeBox>
              <ToContinueBox onPress={() => onPressRouteToStack('continue')}>
                <ToContinueText>작성하기</ToContinueText>
              </ToContinueBox>
            </ButtonBox>
            <AlertBox>작성한 부분까지 자동저장됩니다.</AlertBox>
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
  height: 275px;
  padding: 30px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TitleTextBox = styled(View)`
  margin-bottom: 20px;
`;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
  text-align: center;
`;

const DescriptionBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
`;

const DescriptionText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 23)};
  text-align: center;
`;

const ButtonBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  margin-top: 30px;
`;

const GoToHomeBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 48.5%;
  height: 56px;
  border: 1px solid #557fe6;
  border-radius: 12px;
`;

const NewEstimateText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const ToContinueBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 48.5%;
  height: 56px;
  background-color: #557fe6;
  border-radius: 12px;
`;

const ToContinueText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const AlertBox = styled(Text)`
  margin-top: 8px;
  color: #666;
  ${({ theme }) => theme.fontSet(13, 100, 20)};
  text-align: center;
`;
