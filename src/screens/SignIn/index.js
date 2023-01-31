/**
 * Author : Ryan
 * Date : 2022-07-30
 * Desc : index
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useToast } from 'react-native-toast-notifications';
import { useUserStore, useModalStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';
import StackTitle from '@components/Common/Title/StackTitle';
import analytics from '@react-native-firebase/analytics';

export default function SignInScreen({ navigation, route }) {
  // Root State
  const {
    userDetail,
    userLoggedIn,
    userPermissionPhoto,
    userPermissionGallery,
    fetchSignIn,
    errorMessage,
    isLoadingSignIn,
    hasErrorsSignIn,
    initSignInError,
  } = useUserStore();
  const { openModal } = useModalStore();
  // State
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [focusedItem, setFocusedItem] = useState(null);
  // Value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  // Hooks
  const toast = useToast();

  const onPressSignIn = useCallback(() => {
    fetchSignIn({ email: email, password: password });
    analytics().logLogin({
      method: 'email',
    });

  }, [userDetail, userLoggedIn, email, password, isLoadingSignIn]);

  const onPressRouteToSignUp = useCallback(() => {
    navigation.navigate('signUp');
  }, []);

  useEffect(() => {
    if (!userPermissionPhoto || !userPermissionGallery) {
      openModal('PERMISSIONS');
    }
  }, [userPermissionPhoto, userPermissionGallery]);

  useEffect(() => {
    if (hasErrorsSignIn) {
      toast.show(errorMessage);
      initSignInError();
    }
  }, [hasErrorsSignIn, errorMessage]);

  // Render Content
  const renderContent = useCallback(() => {
    return (
      <ContentWrapper>
        <TitleBox>
          <StackTitle title={'로그인 정보를\n입력해 주세요'} />
        </TitleBox>
        <InputBox>
          <LabelText>이메일</LabelText>
          <Input
            attrFocus={focusedItem === 0}
            keyboardType={'email-address'}
            placeholder={'예: joshua@vlpm.io'}
            onFocus={() => setFocusedItem(0)}
            onBlur={() => setFocusedItem(null)}
            onChangeText={text => setEmail(text)}
          ></Input>
        </InputBox>
        <InputBox>
          <LabelText>비밀번호</LabelText>
          <Input
            attrFocus={focusedItem === 1}
            secureTextEntry={true}
            onFocus={() => setFocusedItem(1)}
            onBlur={() => setFocusedItem(null)}
            onChangeText={text => setPassword(text)}
          ></Input>
        </InputBox>
        <SignInButtonBox
          style={{ width: screenWidth - 40 }}
          disabled={isLoadingSignIn}
          onPress={onPressSignIn}
        >
          {isLoadingSignIn ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <SignInButtonText>{'로그인하기'}</SignInButtonText>
          )}
        </SignInButtonBox>
        <SignUpButtonBox
          style={{ width: screenWidth - 40 }}
          disabled={isLoadingSignIn}
          onPress={onPressRouteToSignUp}
        >
          <SignUpButtonText>{'회원가입'}</SignUpButtonText>
        </SignUpButtonBox>
        {/* <FlexRowBox>
          <ForgotBox onPress={onPressSignInHide}>
            <ForgotText>이메일 찾기</ForgotText>
          </ForgotBox>
          <ForgotBox>
            <ForgotText>비밀번호 찾기</ForgotText>
          </ForgotBox>
        </FlexRowBox> */}
      </ContentWrapper>
    );
  }, [screenWidth, email, password, focusedItem, isLoadingSignIn]);

  return (
    <Wrapper
      style={{ width: screenWidth, height: Platform.OS === 'ios' ? screenHeight : screenHeight }}
    >
      <HeaderBlock>
        <StackHeader
          type={'none'}
          navigation={navigation}
          route={route}
          prevStep={() => navigation.goBack()}
        />
      </HeaderBlock>
      <ContentBlock>{renderContent()}</ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBlock = styled(View)``;

const ContentWrapper = styled(View)`
  padding-top: 50px;
  height: 100%;
`;

const TitleBox = styled(View)`
  height: 100px;
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const InputBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  padding: 10px 25px;
`;

const LabelText = styled(Text)`
  color: #333333;
  ${({ theme }) => theme.fontSet(13, 100, 20)};
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  padding: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
  ${props =>
    props.attrFocus &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: #6690ed;
    `}
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const ForgotBox = styled(TouchableOpacity)`
  padding: 35px 50px;
`;

const ForgotText = styled(Text)`
  color: #333333;
  ${({ theme }) => theme.fontSet(14, 300, 20)};
`;

const SignInButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const SignInButtonText = styled(Text)`
  width: 40%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;

const SignUpButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-top: 15px;
  margin-left: 20px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #557fe6;
`;

const SignUpButtonText = styled(Text)`
  width: 40%;
  height: 26px;
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;

const LoadingBox = styled(View)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 500px;
  z-index: 999;
  ${props =>
    props.attrVisible &&
    css`
      display: flex;
    `}
`;
