/**
 * Author : Ryan
 * Date : 2022-06-10
 * Desc : EstimateUpload
 */

import React, { useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useFilterStore } from '@libs/zustand';

export default function CommunityFilterModal() {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { setFilter } = useFilterStore();

  const onPressSortPosting = useCallback(async type => {
    switch (type) {
      case 'recent':
        setFilter(0);
        closeModal();
        break;
      case 'popular':
        setFilter(1);
        closeModal();
        break;
    }
  }, []);

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'COMMUNITY_FILTER'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <RecentButtonBox onPress={() => onPressSortPosting('recent')}>
              <RecentButtonText>최신 순으로 정렬하기</RecentButtonText>
            </RecentButtonBox>
            <PopularButtonBox onPress={() => onPressSortPosting('popular')}>
              <PopularButtonText>인기 순으로 정렬하기</PopularButtonText>
            </PopularButtonBox>
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

const RecentButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const RecentButtonText = styled(Text)`
  color: #888;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const PopularButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  border-radius: 14px;
  background-color: white;
`;

const PopularButtonText = styled(Text)`
  color: #888;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
