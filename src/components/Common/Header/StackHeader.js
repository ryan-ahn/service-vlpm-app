/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : Stack Header
 */

import React, { useCallback } from 'react';
import { Platform, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useModalStore, useCallStore, useSignUpStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';

export default function StackHeader({ type, navigation, route, prevStep, title = null }) {
  // Root State
  const { openModal } = useModalStore();
  const { step } = useCallStore();
  const { signUpStep, initSignupInput, initSignUpStore } = useSignUpStore();
  // Value
  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  const onPressGoBack = useCallback(() => {
    if (route.name === 'createCall' && step !== 0) {
      prevStep();
    } else if (route.name === 'createCall' && step === 0) {
      openModal('ESTIMATE_CONTINUE');
    } else if (route.name === 'signUp' && signUpStep !== 'email') {
      prevStep();
      initSignupInput();
    } else {
      navigation.goBack();
    }
  }, [route, step, signUpStep]);

  const onPressClose = useCallback(() => {
    if (route.name === 'createCall') {
      openModal('ESTIMATE_CONTINUE');
    } else if (route.name === 'estimateChat') {
      openModal('DECIDE_CHAT');
    } else if (route.name === 'signUp') {
      initSignUpStore();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  }, [route, step]);

  return (
    <Wrapper>
      <EmptyStatusBar style={{ height: StatusBarHeight }} />
      <ContentBlock>
        {type === 'stack' || type === 'step' || type === 'setting' ? (
          <HeaderIconBox onPress={onPressGoBack}>
            <Icons icon={'leftArrowBlack'} size={18} />
          </HeaderIconBox>
        ) : (
          <View style={{ width: 18 }} />
        )}
        {title !== null ? <TitleText>{title}</TitleText> : null}
        {type === 'stack' || type === 'popup' ? (
          <HeaderIconBox onPress={onPressClose}>
            <Icons icon={'closeXBlack'} size={18} />
          </HeaderIconBox>
        ) : type === 'setting' ? (
          <HeaderIconBox onPress={onPressClose}>
            <Icons icon={'headerSetting'} size={18} />
          </HeaderIconBox>
        ) : (
          <View style={{ width: 18 }} />
        )}
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 50px;
`;

const TitleText = styled(Text)`
  width: 70%;
  height: 30px;
  color: #474747;
  ${({ theme }) => theme.fontSet(20, 700, 29)};
  text-align: center;
`;

const HeaderIconBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 25px;
  height: 25px;
`;

const EmptyStatusBar = styled(View)`
  height: 40px;
`;
