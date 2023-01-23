/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : SelectBrand
 */

import React, { useCallback } from 'react';
import { Platform, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { STACK_TITLE, PRODUCT_MENU } from '@asset/data';
import { useCallStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SelectProduct() {
  // Root State
  const { categoryList, setCategoryList } = useCallStore();

  const onPressSelectProduct = useCallback(id => {
    setCategoryList(id);
  }, []);

  return (
    <Wrapper contentContainerStyle={{ flexGrow: 1 }}>
      <StackTitle title={STACK_TITLE.selectProduct.title} description={false} />
      <FlexRowBox ios={Platform.OS === 'ios'}>
        {PRODUCT_MENU.map(menu => (
          <ProductBox
            key={menu.id}
            attrSelected={categoryList.some(ele => ele.id === menu.id)}
            onPress={() => onPressSelectProduct(menu.id)}
          >
            <ProductNameText attrSelected={categoryList.some(ele => ele.id === menu.id)}>
              {menu.name}
            </ProductNameText>
            {menu.description ? (
              <ProductDescriptionText attrSelected={categoryList.some(ele => ele.id === menu.id)}>
                {menu.description}
              </ProductDescriptionText>
            ) : null}
          </ProductBox>
        ))}
      </FlexRowBox>
    </Wrapper>
  );
}

const Wrapper = styled(ScrollView)``;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  padding: 30px 25px 180px 25px;
  flex-wrap: wrap;
  ${props =>
    props.ios &&
    css`
      padding: 30px 25px 200px 25px;
    `}
`;

const ProductBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  width: 48%;
  height: 106px;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: #f2f4f6;
  ${props =>
    props.attrSelected &&
    css`
      background-color: white;
      border: 2px solid #557fe6;
    `}
`;

const ProductNameText = styled(Text)`
  width: 100%;
  height: 32px;
  color: #5b636f;
  ${({ theme }) => theme.fontSet(19, 400, 28)};
  text-align: center;
  ${props =>
    props.attrSelected &&
    css`
      color: #557fe6;
    `}
`;

const ProductDescriptionText = styled(Text)`
  width: 100%;
  color: #8f959d;
  ${({ theme }) => theme.fontSet(12, 400, 18)};
  text-align: center;
  ${props =>
    props.attrSelected &&
    css`
      color: #557fe6;
    `}
`;
