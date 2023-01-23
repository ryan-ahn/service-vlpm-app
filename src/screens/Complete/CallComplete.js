/**
 * Author : Ryan
 * Date : 2022-06-12
 * Desc : RequestComplete
 */

import React, { useCallback } from 'react';
import { Dimensions, Platform, Pressable, View, Text } from 'react-native';
import styled from 'styled-components/native';
import Icons from '@components/Common/Icons';
import { useCallStore } from '@libs/zustand';

export default function RequestComplete({ navigation, route }) {
  // Root State
  const { initStore } = useCallStore();
  // Value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressRouteToHome = useCallback(() => {
    navigation.reset({ routes: [{ name: 'home' }] });
    initStore();
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <HeaderTitle>견적 요청서 작성 완료</HeaderTitle>
      </HeaderBlock>
      <ContentBlock>
        <IconBox>
          <Icons icon={'createCallComplete'} size={62} />
        </IconBox>
        <TitleBox>
          <TitleText>요청서가 전송되었습니다.</TitleText>
        </TitleBox>
        <DescriptionBox>
          <DescriptionRegularText>
            견적서는<DescriptionBoldText>총 7일</DescriptionBoldText>간 받을 수 있으며,
          </DescriptionRegularText>
          <DescriptionRegularText>먼저 작성된 견적부터 확인 가능합니다.</DescriptionRegularText>
          <DescriptionRegularText>
            서비스 문의는 <DescriptionBoldText>1:1문의하기</DescriptionBoldText>에 넘겨주세요
          </DescriptionRegularText>
        </DescriptionBox>
      </ContentBlock>
      <NextButtonBox style={{ width: screenWidth - 40 }} onPress={onPressRouteToHome}>
        <NextButtonText>{'홈으로'}</NextButtonText>
      </NextButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  padding: 20px;
  border: 1px solid #f2f3f4;
`;

const HeaderTitle = styled(Text)`
  ${({ theme }) => theme.fontSet(20, 700, 29)};
`;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  padding: 25px;
`;

const IconBox = styled(View)`
  margin-top: 100px;
`;

const TitleBox = styled(View)`
  margin-top: 30px;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;

const DescriptionBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'column')};
  width: 100%;
  height: 140px;
  margin-top: 30px;
  padding: 25px;
  border-radius: 14px;
  background-color: #f2f3f4;
`;

const DescriptionRegularText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 25)};
`;

const DescriptionBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 25)};
`;

const NextButtonBox = styled(Pressable)`
  position: absolute;
  bottom: 30px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
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

const NextButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
