/**
 * Author : Ryan
 * Date : 2022-07-31
 * Desc : index
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Animated, Dimensions, View, Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useToast } from 'react-native-toast-notifications';
import { useSignUpStore } from '@libs/zustand';
import { EMAIL_REGEX, NAME_REGEX, PW_REGEX, MOBILE_REGEX } from '@libs/utils/verification';
import StackHeader from '@components/Common/Header/StackHeader';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputName from './inputName';
import InputContact from './InputContact';

export default function SignUpScreen({ navigation, route }) {
  // Root State
  const {
    signUpStep,
    setSignUpStep,
    email,
    password,
    repassword,
    name,
    contact,
    fetchSignUp,
    isLoadingSignUp,
    isFetchedSignUp,
    hasErrorsSignUp,
    errorMessage,
    initSignUpStore,
  } = useSignUpStore();

  // Hooks
  const toast = useToast();
  // Value
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onPressPrevStep = useCallback(() => {
    fadeOut();
    setTimeout(() => {
      setSignUpStep('email');
      fadeIn();
    }, 300);
  }, [signUpStep]);

  const onPressNextStep = useCallback(() => {
    fadeOut();
    setTimeout(() => {
      switch (signUpStep) {
        case 'email':
          setSignUpStep('password');
          break;
        case 'password':
          setSignUpStep('name');
          break;
        case 'name':
          setSignUpStep('contact');
          break;
      }
      fadeIn();
    }, 300);
  }, [signUpStep]);

  const onPressSignUp = useCallback(async () => {
    fetchSignUp({ email: email, password: password, name: name, contact: contact });
  }, [email, password, name, contact, isLoadingSignUp]);

  useEffect(() => {
    if (hasErrorsSignUp) {
      toast.show(errorMessage);
      initSignInError();
    }
  }, [hasErrorsSignUp, errorMessage]);

  useEffect(() => {
    if (isFetchedSignUp) {
      navigation.reset({ routes: [{ name: 'signIn' }] });
      initSignUpStore();
    }
  }, [isFetchedSignUp]);

  // Render Item
  const renderStep = useCallback(() => {
    switch (signUpStep) {
      case 'email':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <InputEmail />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDisabled={EMAIL_REGEX.test(email) === false}
              disabled={EMAIL_REGEX.test(email) === false}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'password':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <InputPassword />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDisabled={PW_REGEX.test(password) === false || password !== repassword}
              disabled={PW_REGEX.test(password) === false || password !== repassword}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'name':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <InputName />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDisabled={NAME_REGEX.test(name) === false}
              disabled={NAME_REGEX.test(name) === false}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'contact':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <InputContact />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDisabled={MOBILE_REGEX.test(contact) === false}
              disabled={MOBILE_REGEX.test(contact) === false}
              onPress={onPressSignUp}
            >
              {isLoadingSignUp ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <NextButtonText>{'회원가입하기'}</NextButtonText>
              )}
            </NextButtonBox>
          </ContentBox>
        );
    }
  }, [signUpStep, email, password, repassword, name, contact, isLoadingSignUp]);

  return (
    <Wrapper style={{ height: screenHeight }}>
      <HeaderBlock>
        <StackHeader
          type={'stack'}
          navigation={navigation}
          route={route}
          prevStep={onPressPrevStep}
        />
      </HeaderBlock>
      {renderStep()}
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBox = styled(Animated.View)`
  height: 100%;
`;

const NextButtonBox = styled(Pressable)`
  position: absolute;
  bottom: 130px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background-color: #eeeeee;
    `}
`;

const NextButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;

const LoadingBox = styled(View)`
  display: none;
  width: 100%;
  height: 100%;
  ${props =>
    props.attrVisible &&
    css`
      display: flex;
    `}
`;
