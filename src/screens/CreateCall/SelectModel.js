/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : SelectModel
 */

import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { STACK_TITLE, PRODUCT_MENU } from '@asset/data';
import { useCallStore, useSpecificationStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SelectModel({ navigation }) {
  // Root State
  const { categoryList, setCategoryModelName } = useCallStore();
  const { productType, setProductType } = useSpecificationStore();
  // State
  const [focusedItem, setFocusedItem] = useState(null);

  const onPressRouteToSpecification = useCallback(
    id => {
      setProductType(id);
      navigation.navigate('specification');
    },
    [productType],
  );

  const renderList = useCallback(() => {
    return (
      <ItemWrapper>
        {PRODUCT_MENU.filter(item =>
          categoryList.some(selectedItem => selectedItem.id === item.id),
        ).map(filteredItem => (
          <FlexRowBox key={filteredItem.id} attrFocus={filteredItem.id === focusedItem}>
            <ProductNameBox>
              <ProductNameText>{filteredItem.name}</ProductNameText>
            </ProductNameBox>
            <InputModelBox
              value={categoryList.filter(item => item.id === filteredItem.id)[0].modelName}
              editable={!categoryList.filter(item => item.id === filteredItem.id)[0].tags.length}
              selectTextOnFocus={
                !categoryList.filter(item => item.id === filteredItem.id)[0].tags.length
              }
              placeholder={
                categoryList.filter(item => item.id === filteredItem.id)[0].tags.length
                  ? categoryList.filter(item => item.id === filteredItem.id)[0].tags.length === 1
                    ? `${
                        categoryList.filter(item => item.id === filteredItem.id)[0].tags[0]
                      } 스펙 선택 완료`
                    : `${categoryList.filter(item => item.id === filteredItem.id)[0].tags[0]} 외 ${
                        categoryList.filter(item => item.id === filteredItem.id)[0].tags.length - 1
                      }개 스펙 선택 완료`
                  : '예: ' + filteredItem.ex
              }
              onPressIn={() => setFocusedItem(filteredItem.id)}
              onChangeText={text => setCategoryModelName(filteredItem.id, text)}
            />
            <ButtonBox
              attrDisabled={categoryList.filter(item => item.id === filteredItem.id)[0].modelName}
              attrSelected={categoryList.filter(item => item.id === filteredItem.id)[0].tags.length}
              disabled={categoryList.filter(item => item.id === filteredItem.id)[0].modelName}
              onPress={() => onPressRouteToSpecification(filteredItem.id)}
            >
              <ButtonText
                attrDisabled={categoryList.filter(item => item.id === filteredItem.id)[0].modelName}
                attrSelected={
                  categoryList.filter(item => item.id === filteredItem.id)[0].tags.length
                }
              >
                {categoryList.filter(item => item.id === filteredItem.id)[0].tags.length
                  ? '재선택'
                  : '스펙'}
              </ButtonText>
              <Icons
                icon={
                  categoryList.filter(item => item.id === filteredItem.id)[0].tags.length
                    ? 'rightArrow55'
                    : 'rightArrowWhite'
                }
                width={6}
                height={11}
              />
            </ButtonBox>
          </FlexRowBox>
        ))}
      </ItemWrapper>
    );
  }, [categoryList, focusedItem]);

  return (
    <Wrapper>
      <StackTitle
        title={STACK_TITLE.selectModel.title}
        description={STACK_TITLE.selectModel.description}
      />
      <ListBlock ios={Platform.OS === 'ios'}>{renderList()}</ListBlock>
    </Wrapper>
  );
}

const Wrapper = styled(ScrollView)``;

const ListBlock = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  padding: 30px 25px 200px 25px;
  flex-wrap: wrap;
  ${props =>
    props.ios &&
    css`
      padding: 30px 25px 200px 25px;
    `}
`;

const ItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 65px;
  margin-top: 5px;
  border-bottom-width: 1.5px;
  border-bottom-color: #e4e4e4;
  ${props =>
    props.attrFocus &&
    css`
      border-bottom-width: 1.5px;
      border-bottom-color: #6690ed;
    `}
`;

const ProductNameBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 25%;
  height: 100%;
`;

const ProductNameText = styled(Text)`
  color: #9fa19f;
  ${({ theme }) => theme.fontSet(16, 400, 23)};
`;

const InputModelBox = styled(TextInput)`
  width: 58%;
  height: 100%;
`;

const ButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 17%;
  height: 30px;
  border-radius: 6px;
  background: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background: #f2f3f4;
    `}
  ${props =>
    props.attrSelected &&
    css`
      border: 1px solid #557fe6;
      background-color: white;
    `}
`;

const ButtonText = styled(Text)`
  margin-right: 5px;
  color: white;
  ${({ theme }) => theme.fontSet(13, 700, 19)};
  ${props =>
    props.attrDisabled &&
    css`
      color: #9fa19f;
    `}
  ${props =>
    props.attrSelected &&
    css`
      color: #557fe6;
    `}
`;
