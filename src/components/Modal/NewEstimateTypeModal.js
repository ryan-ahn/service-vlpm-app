/**
 * Author : Ryan
 * Date : 2022-06-08
 * Desc : EstimateTypeModal
 */

import React, { useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useCallStore } from '@libs/zustand';

export default function NewEstimateTypeModal({ navigation }) {
  const { isOpen, modalType, closeModal } = useModalStore();
  const {
    estimateType,
    initStore,
    setEstimateType,
    setSequence,
    tempEstimateType,
    setRequestType,
  } = useCallStore();

  const onPressRouteToStack = useCallback(
    button => {
      if (button === 'new') {
        initStore();
        setEstimateType(tempEstimateType);
        switch (tempEstimateType) {
          case 'selectBrand':
            setRequestType('brand');
            setSequence(['brand', 'product', 'model', 'budget', 'delivery', 'last', 'complete']);
            break;
          case 'selectBudget':
            setRequestType('budget');
            setSequence(['budget', 'product', 'model', 'delivery', 'last', 'complete']);
            break;
          case 'selectModel':
            setRequestType('model');
            setSequence(['product', 'model', 'budget', 'delivery', 'last', 'complete']);
            break;
        }
      }
      navigation.navigate('createCall');
      closeModal();
    },
    [estimateType, tempEstimateType],
  );

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'NEW_ESTIMATE_TYPE'}
      >
        <ModalView>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'작성 중인 요청서가 있어요'}</TitleBoldText>
            </TitleTextBox>
            <DescriptionBox>
              <DescriptionText>
                {'새로 만들기를 하시면\n작성 중인 요청서는 삭제됩니다.'}
              </DescriptionText>
            </DescriptionBox>
            <ButtonBox>
              <NewEstimateBox onPress={() => onPressRouteToStack('new')}>
                <NewEstimateText>새로 만들기</NewEstimateText>
              </NewEstimateBox>
              <ToContinueBox onPress={() => onPressRouteToStack('continue')}>
                <ToContinueText>계속 작성하기</ToContinueText>
              </ToContinueBox>
            </ButtonBox>
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

const NewEstimateBox = styled(TouchableOpacity)`
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
