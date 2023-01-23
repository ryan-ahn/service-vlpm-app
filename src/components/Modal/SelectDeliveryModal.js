/**
 * Author : Ryan
 * Date : 2022-06-05
 * Desc : SelectBrandModal
 */

import React, { useCallback } from 'react';
import { Modal, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { DELIVERY_CITY } from '@asset/data';
import { useModalStore, useCallStore } from '@libs/zustand';

export default function SelectDeliveryModal({ data }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { address, setAddress } = useCallStore();

  const onPressDeliveryDetination = useCallback(
    type => {
      setAddress(type);
      closeModal();
    },
    [address],
  );

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'SELECT_DELIVERY'}
      >
        <ModalView>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'입주 및 배송\n지역이 어디신가요? 📦'}</TitleBoldText>
            </TitleTextBox>
            <ListWrapper>
              {DELIVERY_CITY.map(menu => (
                <ItemBox key={menu.id} onPress={() => onPressDeliveryDetination(menu.name)}>
                  <ItemText>{menu.name}</ItemText>
                </ItemBox>
              ))}
            </ListWrapper>
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

const ListWrapper = styled(ScrollView)``;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
`;

const ItemBox = styled(TouchableOpacity)`
  padding: 13px 0;
`;

const ItemText = styled(Text)`
  width: 100%;
  height: 30px;
  ${({ theme }) => theme.fontSet(19, 400, 28)};
`;
