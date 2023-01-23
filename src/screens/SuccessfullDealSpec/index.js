/**
 * Author : Ryan
 * Date : 2022-08-04
 * Desc : index
 */

import React, { useCallback } from 'react';
import { Platform, Dimensions, ScrollView, View, Text, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useSuccessStore } from '@libs/zustand';
import { MODEL_TYPE_NAME } from '@asset/data';
import StackHeader from '@components/Common/Header/StackHeader';

export default function SuccessfulDeallSpecScreen({ navigation, route }) {
  // Root State
  const { successDetail } = useSuccessStore();
  // Value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressGoToBack = useCallback(() => {
    navigation.navigate('home');
  }, [navigation]);

  const renderItem = useCallback(item => {
    if (item.modelName) {
      return (
        <ItemWrapper key={item.id} style={{ width: screenWidth - 40 }}>
          <LabelText>
            {MODEL_TYPE_NAME.filter(item => item.id === successDetail.products[0].id)[0].name}
          </LabelText>
          <NameText>{item.modelName}</NameText>
        </ItemWrapper>
      );
    } else {
      return (
        <ItemWrapper style={{ width: screenWidth - 40 }}>
          <LabelText>
            {MODEL_TYPE_NAME.filter(item => item.id === successDetail.products[0].id)[0].name}
          </LabelText>
          <FlexColumnBox>
            <FlexRowBox>
              {item.tags.map((tagItem, index) => (
                <TagText key={index}>{`${tagItem}${
                  index !== item.tags.length - 1 ? ' / ' : ''
                }`}</TagText>
              ))}
            </FlexRowBox>
            <TagMessageText>
              {item.tags.message ? item.tags.message : '(메세지가 없음)'}
            </TagMessageText>
          </FlexColumnBox>
        </ItemWrapper>
      );
    }
  }, []);

  const renderList = useCallback(() => {
    return (
      <ListBlock>
        {successDetail.products.map(item => (
          <View key={item.id}>{renderItem(item)}</View>
        ))}
      </ListBlock>
    );
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader
          type={'popup'}
          title={'요청 제품 스펙'}
          navigation={navigation}
          route={route}
        />
      </HeaderBlock>
      <ScrollViewBlock style={{ height: screenHeight - 90, overflow: 'scroll' }}>
        <TitleBox>
          <StoreText>{`${
            MODEL_TYPE_NAME.filter(item => item.id === successDetail.products[0].id)[0].name
          } 외 ${successDetail.products.length - 1}종`}</StoreText>
        </TitleBox>
        {renderList()}
        <ButtonBlock>
          <RequestButtonBox style={{ width: screenWidth - 40 }} onPress={onPressGoToBack}>
            <ButtonText>이대로 견적 요청하기</ButtonText>
          </RequestButtonBox>
        </ButtonBlock>
      </ScrollViewBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: #f2f3f4;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: white;
`;

const ScrollViewBlock = styled(ScrollView)``;

const TitleBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  padding: 25px;
  margin-bottom: 10px;
  background-color: white;
`;

const StoreText = styled(Text)`
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;

const ListBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  padding-bottom: 50px;
  background-color: white;
`;

const ItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e4e4e4;
`;

const LabelText = styled(Text)`
  color: #9fa19f;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const NameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-end', 'column')};
  width: 70%;
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-end', 'center', 'row')};
  width: 100%;
`;

const TagText = styled(Text)`
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const TagMessageText = styled(Text)`
  color: #828793;
  ${({ theme }) => theme.fontSet(14, 400, 26)};
  text-align: right;
`;

const ButtonBlock = styled(View)`
  background-color: white;
`;
const RequestButtonBox = styled(Pressable)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  margin-bottom: 40px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      display: none;
    `}
  ${props =>
    props.attrDeactive &&
    css`
      background-color: #eee;
    `}
`;

const ButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
