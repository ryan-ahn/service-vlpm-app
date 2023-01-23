/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : SelectBrand
 */

import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { STACK_TITLE } from '@asset/data';
import { useCallStore, useModalStore } from '@libs/zustand';
import SelectBrandModal from '@components/Modal/SelectBrandModal';
import Icons from '@components/Common/Icons';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SelectBrand() {
  // Root State
  const { setBrand } = useCallStore();
  const { openModal } = useModalStore();

  const onPressSelectBrand = useCallback(brand => {
    setBrand(brand);
    openModal('SELECT_BRAND');
  }, []);

  return (
    <Wrapper>
      <SelectBrandModal />
      <StackTitle
        title={STACK_TITLE.selectBrand.title}
        description={STACK_TITLE.selectBrand.description}
      />
      <FlexRowBox>
        <BrandBox onPress={() => onPressSelectBrand('samsung')}>
          <SamsungIconBox>
            <Icons icon={'storeSS'} width={32} height={20} />
          </SamsungIconBox>
          <BrandNameText>삼성전자</BrandNameText>
        </BrandBox>
        <BrandBox onPress={() => onPressSelectBrand('lg')}>
          <LGIconBox>
            <Icons icon={'storeLG'} width={32} height={20} />
          </LGIconBox>
          <BrandNameText>LG전자</BrandNameText>
        </BrandBox>
      </FlexRowBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  padding: 50px 25px;
`;

const BrandBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  width: 48%;
  height: 200px;
  border-radius: 20px;
  background-color: #f2f4f6;
`;

const CommonIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

const SamsungIconBox = styled(CommonIconBox.withComponent(View))`
  background-color: #3a67bf;
`;

const LGIconBox = styled(CommonIconBox.withComponent(View))`
  background-color: #f34e4e;
`;

const BrandNameText = styled(Text)`
  margin-top: 20px;
  ${({ theme }) => theme.fontSet(22, 400, 32)};
`;
