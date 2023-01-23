/**
 * Author : Ryan
 * Date : 2022-06-10
 * Desc : EstimateUpload
 */

import React, { useCallback, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useToast } from 'react-native-toast-notifications';
import { useModalStore, useCallStore } from '@libs/zustand';

export default function SelectEtcModal({ navigation }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const {
    requestType,
    brand,
    budget,
    purpose,
    address,
    memo,
    categoryList,
    uploadImage,
    bestSeller,
    display,
    allRegion,
    setBestSeller,
    setDisplay,
    setAllRegion,
    initCallError,
    fetchCall,
    errorMessage,
    isFetchedCall,
    hasErrorsCall,
  } = useCallStore();
  // Hooks
  const toast = useToast();

  const onPressFetchCall = useCallback(() => {
    fetchCall({
      type: requestType,
      brand: brand,
      budget: budget * 10000,
      purpose: purpose,
      address: address,
      memo: memo,
      category: categoryList,
      fileUrl: uploadImage,
      etc: {
        bestSeller: bestSeller,
        display: display,
        allRegion: allRegion,
      },
    });
  }, [
    requestType,
    brand,
    budget,
    purpose,
    address,
    memo,
    categoryList,
    uploadImage,
    bestSeller,
    display,
    allRegion,
  ]);

  useEffect(() => {
    if (hasErrorsCall) {
      toast.show(errorMessage);
      initCallError();
    }
  }, [hasErrorsCall, errorMessage]);

  useEffect(() => {
    if (isFetchedCall) {
      navigation.reset({ routes: [{ name: 'callComplete' }] });
    }
  }, [isFetchedCall]);

  // Render Content
  const renderCheckBoxList = useCallback(() => {
    return (
      <CheckBoxWrapper>
        <FlexRowBox>
          <CheckBox attrCheck={bestSeller} onPress={() => setBestSeller(!bestSeller)}>
            <CheckCircle attrCheck={bestSeller} />
          </CheckBox>
          <CheckBoxText>많이 찾는 모델로 요청</CheckBoxText>
        </FlexRowBox>
        <FlexRowBox>
          <CheckBox attrCheck={display} onPress={() => setDisplay(!display)}>
            <CheckCircle attrCheck={display} />
          </CheckBox>
          <CheckBoxText>매장 전시 진열 제품도 좋아요</CheckBoxText>
        </FlexRowBox>
        <FlexRowBox>
          <CheckBox attrCheck={allRegion} onPress={() => setAllRegion(!allRegion)}>
            <CheckCircle attrCheck={allRegion} />
          </CheckBox>
          <CheckBoxText>지역 상관없이 모든 견적 비교</CheckBoxText>
        </FlexRowBox>
      </CheckBoxWrapper>
    );
  }, [bestSeller, display, allRegion]);

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'SELECT_ETC'}
      >
        <ModalView>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'견적을 요청할까요?🚀'}</TitleBoldText>
              <DescriptionText>{'(중복 선택 가능)'}</DescriptionText>
            </TitleTextBox>
            <CheckBoxBlock>{renderCheckBoxList()}</CheckBoxBlock>
            <CallButtonBox onPress={onPressFetchCall}>
              <CallButtonText>요청하기</CallButtonText>
            </CallButtonBox>
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
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
`;

const DescriptionText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(12, 400, 20)};
`;

const CallButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const CallButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const CheckBoxBlock = styled(View)`
  margin: 10px 0 20px 0;
`;

const CheckBoxWrapper = styled(View)`
  padding: 0 10px;
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 50px;
`;

const CheckBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 23px;
  height: 23px;
  margin-right: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 12.5px;
  background-color: white;
  ${props =>
    props.attrCheck &&
    css`
      border: 1.5px solid #557fe6;
    `}
`;

const CheckCircle = styled(View)`
  width: 11px;
  height: 11px;
  border-radius: 5.5px;
  ${props =>
    props.attrCheck &&
    css`
      background-color: #557fe6;
    `}
`;

const CheckBoxText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 23)};
`;
