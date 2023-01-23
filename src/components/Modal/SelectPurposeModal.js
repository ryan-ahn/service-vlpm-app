/**
 * Author : Ryan
 * Date : 2022-06-05
 * Desc BrandModal
 */

import React, { useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useCallStore } from '@libs/zustand';
import { PURCHASE_PURPOSE } from '@asset/data';

export default function SelectPuropseModal({ data }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { purpose, setPurpose } = useCallStore();

  const onPressPurchaseType = useCallback(
    type => {
      setPurpose(type);
      closeModal();
    },
    [purpose],
  );

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'SELECT_PURPOSE'}
      >
        <ModalView>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'구입 목적이\n어떻게 되시나요? 💍'}</TitleBoldText>
            </TitleTextBox>
            {PURCHASE_PURPOSE.map(item => (
              <PurchaseTypeBox key={item.id} onPress={() => onPressPurchaseType(item.text)}>
                <PurchaseTypeText>{item.text}</PurchaseTypeText>
              </PurchaseTypeBox>
            ))}
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
  height: 380px;
  padding: 30px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TitleTextBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  margin-bottom: 20px;
`;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
`;

const PurchaseTypeBox = styled(TouchableOpacity)`
  padding: 13px 0;
`;

const PurchaseTypeText = styled(Text)`
  width: 100%;
  height: 30px;
  ${({ theme }) => theme.fontSet(19, 400, 28)};
`;
