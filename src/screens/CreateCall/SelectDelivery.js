/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : SelectDelivery
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { STACK_TITLE } from '@asset/data';
import { useCallStore, useModalStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';
import SelectPuropseModal from 'components/Modal/SelectPurposeModal';
import SelectDeliveryModal from '@components/Modal/SelectDeliveryModal';

export default function SelectDelivery() {
  // Root State
  const { purpose, address } = useCallStore();
  const { openModal, modalType } = useModalStore();

  const onPressDropDownBox = useCallback(
    type => {
      switch (type) {
        case 'purpose':
          openModal('SELECT_PURPOSE');
          break;
        case 'delivery':
          openModal('SELECT_DELIVERY');
          break;
      }
    },
    [modalType],
  );

  return (
    <Wrapper>
      <SelectPuropseModal />
      <SelectDeliveryModal />
      <StackTitle title={STACK_TITLE.selectDelivery.title} description={false} />
      <ContentBlock>
        <DropdownBox onPress={() => onPressDropDownBox('purpose')}>
          <PurchaseBox>
            <LabelText>구입목적</LabelText>
            <PlaceholderBox>
              <ItemText attrExistType={purpose.length !== 0}>
                {purpose.length !== 0 ? purpose : '구입목적 선택하기'}
              </ItemText>
            </PlaceholderBox>
          </PurchaseBox>
        </DropdownBox>
        <DropdownBox onPress={() => onPressDropDownBox('delivery')}>
          <PurchaseBox>
            <LabelText>입주 및 배송지역</LabelText>
            <PlaceholderBox>
              <ItemText attrExistType={address.length !== 0}>
                {address.length !== 0 ? address : '예 : 서울 강동구'}
              </ItemText>
            </PlaceholderBox>
          </PurchaseBox>
        </DropdownBox>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ContentBlock = styled(View)`
  margin-top: 45px;
  padding: 25px;
`;

const DropdownBox = styled(TouchableOpacity)`
  height: 84px;
  margin-bottom: 15px;
  border-radius: 22px;
  background-color: #f2f4f6;
`;

const PurchaseBox = styled(View)`
  padding: 15px 25px;
`;

const LabelText = styled(Text)`
  color: #557fe6;
  color: #999a9d;
`;

const PlaceholderBox = styled(View)`
  padding: 11px 0;
`;

const ItemText = styled(Text)`
  color: #d1d1d1;
  ${({ theme }) => theme.fontSet(21, 400, 25)};
  ${props =>
    props.attrExistType &&
    css`
      color: black;
    `}
`;
