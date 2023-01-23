/**
 * Author : Ryan
 * Date : 2022-07-27
 * Desc : ListFilter
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useFilterStore } from '@libs/zustand';
import CommunityFilterModal from '@components/Modal/CommunityFilterModal';

export default function ListFilter() {
  // Root State
  const { isOpen, modalType, openModal } = useModalStore();
  const { currentValue } = useFilterStore();

  const onPressDropDownBox = useCallback(() => {
    openModal('COMMUNITY_FILTER');
  }, [isOpen, modalType]);

  const renderCurrentText = useCallback(() => {
    switch (currentValue) {
      case 0:
        return '최신 순 ▼';
      case 1:
        return '인기 순 ▼';
    }
  }, [currentValue]);

  return (
    <Wrapper>
      <CommunityFilterModal />
      <ButtonBox onPress={onPressDropDownBox}>
        <CurrentText>{renderCurrentText()}</CurrentText>
      </ButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ButtonBox = styled(TouchableOpacity)``;

const CurrentText = styled(Text)`
  color: #949494;
`;
