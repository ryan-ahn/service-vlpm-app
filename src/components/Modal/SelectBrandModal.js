/**
 * Author : Ryan
 * Date : 2022-06-05
 * Desc : SelectBrandModal
 */

import React, { useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { useModalStore, useCallStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';

export default function SelectBrandModal({ data }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { brand, estimateAll, nextStep, setEstimateAll } = useCallStore();

  const onPressNextStep = useCallback(() => {
    closeModal();
    nextStep();
  }, []);

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'SELECT_BRAND'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <TitleTextBox>
              <TitleRegularText>
                <TitleBoldText>
                  {brand === 'samsung' ? '삼성디지털프라자' : 'LG베스트샵'}
                </TitleBoldText>
                {'에서\n견적서를 작성해 드립니다.'}
              </TitleRegularText>
            </TitleTextBox>
            <AllEstimateBox>
              <CheckBox attrCheck={estimateAll} onPress={() => setEstimateAll()}>
                {estimateAll ? <Icons icon={'checkBoxWhite'} width={14} height={8.6} /> : null}
              </CheckBox>
              <CheckBoxText>하이마트, 전자랜드에서도 모두 견적 받기</CheckBoxText>
            </AllEstimateBox>
            <NextButtonBox onPress={onPressNextStep}>
              <ButtonText>다음</ButtonText>
            </NextButtonBox>
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
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  margin-bottom: 20px;
`;

const TitleRegularText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(22, 400, 33)};
  text-align: center;
`;

const TitleBoldText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(22, 700, 33)};
  text-align: center;
`;

const AllEstimateBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-bottom: 38px;
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
      border: 1px solid #557fe6;
      background-color: #557fe6;
    `}
`;

const CheckBoxText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 23)};
`;

const NextButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const ButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
