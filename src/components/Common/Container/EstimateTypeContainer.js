/**
 * Author : Ryan
 * Date : 2022-05-26
 * Desc : EstimateTypeContainer
 */

import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useModalStore, useCallStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';

export default function EstimateTypeContainer({ type, navigation, title, description }) {
  // Root State
  const { openModal } = useModalStore();
  const {
    initStep,
    setSequence,
    setEstimateType,
    setRequestType,
    brand,
    categoryList,
    setTempEstimateType,
  } = useCallStore();

  const onPressRouteToStack = useCallback(() => {
    if (brand !== '' || categoryList.length !== 0) {
      openModal('NEW_ESTIMATE_TYPE');
      setTempEstimateType(type);
    } else {
      initStep();
      setEstimateType(type);
      switch (type) {
        case 'selectBrand':
          setRequestType('brand');
          setSequence(['brand', 'product', 'model', 'budget', 'delivery', 'last']);
          break;
        case 'selectBudget':
          setRequestType('budget');
          setSequence(['budget', 'product', 'model', 'delivery', 'last']);
          break;
        case 'selectModel':
          setRequestType('model');
          setSequence(['product', 'model', 'budget', 'delivery', 'last']);
          break;
      }
      navigation.navigate('createCall');
    }
  }, [type]);

  const renderIcon = useCallback(() => {
    switch (type) {
      case 'selectBrand':
        return <Icons icon={'estimateTypeBrand'} size={24} />;
      case 'selectBudget':
        return <Icons icon={'estimateTypeCard'} size={24} />;
      case 'selectModel':
        return <Icons icon={'estimateTypeModel'} size={24} />;
    }
  }, [type]);

  return (
    <Wrapper attrLastChild={type === 'selectProduct'} onPress={onPressRouteToStack}>
      <ContainerImageBox>{renderIcon()}</ContainerImageBox>
      <FlexColumnBox>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </FlexColumnBox>
    </Wrapper>
  );
}

const Wrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  height: 100px;
  margin-bottom: 14px;
  padding: 25px;
  border-radius: 20px;
  background-color: #f2f4f6;
  ${props =>
    props.attrLastChild &&
    css`
      margin-bottom: 0px;
    `}
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;

const ContainerImageBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-right: 15px;
  border-radius: 21px;
  overflow: hidden;
  background-color: white;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 500, 32)};
`;
const DescriptionText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(14, 300, 20)};
`;
