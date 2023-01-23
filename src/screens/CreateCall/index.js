/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : Request Estimate Screen
 */

import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  Animated,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { css } from 'styled-components';
import * as Progress from 'react-native-progress';
import { useCallStore, useModalStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';
import EstimateToContinueModal from '@components/Modal/EstimateToContinueModal';
import SelectBrand from './SelectBrand';
import SelectProduct from './SelectProduct';
import SelectBudget from './SelectBudget';
import SelectModel from './SelectModel';
import SelectDelivery from './SelectDelivery';
import UploadEstimate from './UploadEstimate';

import SelectEtcModal from '@components/Modal/SelectEtcModal';

export default function CreateCall({ navigation, route }) {
  // Root State
  const {
    step,
    sequence,
    requestType,
    brand,
    budget,
    purpose,
    address,
    memo,
    categoryList,
    uploadImage,
    prevStep,
    nextStep,
    isLoadingCall,
  } = useCallStore();
  const { openModal } = useModalStore();
  // State
  const [progress, setProgress] = useState(0);
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

  const onPressPrevStep = () => {
    fadeOut();
    setTimeout(() => {
      prevStep();
      fadeIn();
    }, 300);
  };

  const onPressNextStep = () => {
    fadeOut();
    setTimeout(() => {
      nextStep();
      fadeIn();
    }, 300);
  };

  const onPressRouteToModal = useCallback(() => {
    openModal('SELECT_ETC');
  }, []);

  useEffect(() => {
    setProgress(((step + 1) / (sequence.length - 1)).toFixed(1));
  }, [progress, step, sequence]);

  // Render Item
  const renderContentItem = useCallback(() => {
    switch (sequence[step]) {
      case 'brand':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <SelectBrand onPressNextStep={onPressNextStep} />
          </ContentBox>
        );
      case 'product':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <SelectProduct />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDisabled={categoryList.length === 0}
              disabled={categoryList.length === 0}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'선택 제품 (' + categoryList.length + ')'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'budget':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <SelectBudget onPressNextStep={onPressNextStep} />
            <NextButtonBox style={{ width: screenWidth - 40 }} onPress={onPressNextStep}>
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'model':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <SelectModel navigation={navigation} />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDeactive={categoryList.some(item => !item.modelName && !item.tags.length)}
              disabled={categoryList.some(item => !item.modelName && !item.tags.length)}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'delivery':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <SelectDelivery onPressNextStep={onPressNextStep} />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              attrDeactive={!purpose || !address}
              disabled={!purpose || !address}
              onPress={onPressNextStep}
            >
              <NextButtonText>{'다음'}</NextButtonText>
            </NextButtonBox>
          </ContentBox>
        );
      case 'last':
        return (
          <ContentBox style={{ opacity: fadeAnim }}>
            <UploadEstimate />
            <NextButtonBox
              style={{ width: screenWidth - 40 }}
              disabled={isLoadingCall}
              attrDeactive={isLoadingCall}
              onPress={onPressRouteToModal}
            >
              {isLoadingCall ? (
                <ActivityIndicator size="small" color="#557FE6" />
              ) : (
                <NextButtonText>{'완료'}</NextButtonText>
              )}
            </NextButtonBox>
          </ContentBox>
        );
    }
  }, [
    step,
    sequence,
    requestType,
    brand,
    budget,
    purpose,
    address,
    memo,
    categoryList,
    uploadImage,
    isLoadingCall,
  ]);

  return (
    <>
      <EstimateToContinueModal navigation={navigation} />
      <SelectEtcModal navigation={navigation} />
      <Wrapper>
        <HeaderBlock>
          <StackHeader
            type={'stack'}
            navigation={navigation}
            route={route}
            prevStep={onPressPrevStep}
          />
        </HeaderBlock>
        <ProgressBlock>
          <Progress.Bar
            progress={Number(progress)}
            width={screenWidth - 40}
            height={4}
            borderWidth={0}
            animated={true}
            useNativeDriver={true}
            color={'#557FE6'}
            unfilledColor={'#F2F4F6'}
          />
        </ProgressBlock>
        <ContentBlock
          style={{
            opacity: fadeAnim,
            height: Platform.OS === 'ios' ? screenHeight - 131 : screenHeight - 132,
          }}
        >
          {renderContentItem()}
        </ContentBlock>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBlock = styled(Animated.View)`
  position: relative;
`;

const ProgressBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ContentBox = styled(Animated.View)`
  height: 100%;
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
