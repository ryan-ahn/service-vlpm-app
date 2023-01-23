/**
 * Author : Ryan
 * Date : 2022-08-09
 * Desc : index
 */

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Animated, Dimensions, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useCallStore } from '@libs/zustand';
import { validateCreateAt } from '@libs/utils/validation';
import { validationMillion } from '@libs/utils/validation';
import StackHeader from '@components/Common/Header/StackHeader';
import Icons from '@components/Common/Icons';

const REQUEST_TYPE = {
  brand: '브랜드로 추천받기 🏷',
  budget: '예산으로 추천받기 💳',
  model: '모델명으로 추천받기 📺',
};

const SELECTED_BRAND = {
  samsung: '삼성전자 (하이마트, 전자랜드)',
  lg: 'LG전자 (하이마트, 전자랜드)',
};

export default function MyCallScreen({ navigation, route }) {
  // Root State
  const { callList, fetchCallList } = useCallStore();
  // State
  const [toggleArray, setToggleArray] = useState([]);
  // Value
  const screenHeight = Dimensions.get('window').height;

  const onPressToggleItem = useCallback(
    id => {
      const copiedToggleArray = [...toggleArray];
      if (copiedToggleArray.some(item => item === id)) {
        setToggleArray(copiedToggleArray.filter(item => item !== id));
      } else {
        setToggleArray(copiedToggleArray.concat(id));
      }
    },
    [toggleArray],
  );

  useEffect(() => {
    fetchCallList();
  }, []);

  // Render Item
  const renderItem = ({ item, index }) => {
    return (
      <ItemWrapper>
        <ItemHeaderBlock onPress={() => onPressToggleItem(item.id)}>
          <FlexSpaceBox>
            <FlexRowBox>
              <RequestNumberBox>
                <RequestNumberText>{`요청서 ${index + 1}`}</RequestNumberText>
              </RequestNumberBox>
              <CreateDateBox>
                <CreateDateText>{validateCreateAt(item.createdAt)}</CreateDateText>
              </CreateDateBox>
            </FlexRowBox>
            <IconBox>
              <Icons icon={'downArrow55'} size={20} />
            </IconBox>
          </FlexSpaceBox>
          <TitleBox>
            <TitleText>{REQUEST_TYPE[item.type]}</TitleText>
          </TitleBox>
        </ItemHeaderBlock>
        <ItemBodyBlock attrToggle={toggleArray.some(toggleItem => toggleItem === item.id)}>
          <ColumnBox>
            <LabelText>브랜드로 선택</LabelText>
            <ValueText>{SELECTED_BRAND[item.brand]}</ValueText>
          </ColumnBox>
          <ColumnBox>
            <LabelText>구입목적</LabelText>
            <ValueText>{item.purpose}</ValueText>
          </ColumnBox>
          <ColumnBox>
            <LabelText>배송지역</LabelText>
            <ValueText>{item.address}</ValueText>
          </ColumnBox>
          <ColumnBox>
            <LabelText>예산</LabelText>
            <ValueText>{validationMillion(item.budget)}</ValueText>
          </ColumnBox>
          <ColumnBox>
            <LabelText>견적서 첨부</LabelText>
            <ValueText>{item.fileUrl !== null ? '있음' : '(없음)'}</ValueText>
          </ColumnBox>
          <ColumnBox>
            <LabelText>남기는 메세지</LabelText>
            <ValueText>{item.memo ? '있음' : '(없음)'}</ValueText>
          </ColumnBox>
        </ItemBodyBlock>
      </ItemWrapper>
    );
  };

  return (
    <Wrapper style={{ height: screenHeight - 40 }}>
      <HeaderBlock>
        <StackHeader type={'step'} title={'내 요청서'} navigation={navigation} route={route} />
      </HeaderBlock>
      <ContentBlock>
        <FlatList data={callList.result} renderItem={renderItem} />
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: white;
`;

const ContentBlock = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #f2f4f6;
`;

const ItemWrapper = styled(View)`
  width: 100%;
  margin-top: 20px;
  border-radius: 12px;
  background-color: white;
`;

const ItemHeaderBlock = styled(TouchableOpacity)`
  padding: 20px 15px 10px 20px;
`;

const FlexSpaceBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const RequestNumberBox = styled(View)`
  margin-right: 10px;
  padding: 5px 8px;
  background-color: #f1f4fd;
  border-radius: 9px;
`;

const RequestNumberText = styled(Text)`
  ${({ theme }) => theme.fontSet(10, 700, 14)};
`;

const CreateDateBox = styled(View)``;

const CreateDateText = styled(Text)`
  ${({ theme }) => theme.fontSet(12, 300, 18)};
`;

const IconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 30px;
  height: 30px;
`;

const TitleBox = styled(View)`
  margin-top: 5px;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(19, 400, 26)};
`;

const ItemBodyBlock = styled(Animated.View)`
  padding: 10px 20px;
  ${props =>
    props.attrToggle &&
    css`
      height: 0px;
    `}
`;

const ColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 15px;
`;

const LabelText = styled(Text)`
  color: #c4c4c4;
  ${({ theme }) => theme.fontSet(12, 400, 17)};
`;

const ValueText = styled(Text)`
  margin-top: 5px;
  ${({ theme }) => theme.fontSet(14, 500, 19)};
`;
