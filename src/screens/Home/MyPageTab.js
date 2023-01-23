/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : index
 */

import React, { useCallback } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '@libs/zustand';
import PageHeader from '@components/Common/Header/PageHeader';

export default function MypageTabScreen({ navigation }) {
  // Root State
  const { initSignInState } = useUserStore();
  // Value
  const screenWidth = Dimensions.get('window').width;

  const onPressSignOut = useCallback(async () => {
    await AsyncStorage.removeItem('access');
    initSignInState();
  }, []);

  return (
    <Wrapper>
      <HeaderBlock>
        <PageHeader tab="mypage" />
      </HeaderBlock>
      <SignOutButtonBox style={{ width: screenWidth - 40 }} onPress={onPressSignOut}>
        <ButtonText>{'로그아웃'}</ButtonText>
      </SignOutButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const SignOutButtonBox = styled(TouchableOpacity)`
  position: absolute;
  top: 130px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const ButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
