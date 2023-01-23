/**
 * Author : Ryan
 * Date : 2022-08-01
 * Desc : index
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  Dimensions,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useSuccessStore } from '@libs/zustand';
import { validateMeasureUp2 } from '@libs/utils/validation';
import { SUCCESSFUL_DEAL_TAB, BRAND_TYPE_TAG } from '@asset/data';
import Icons from '@components/Common/Icons';
import StackHeader from '@components/Common/Header/StackHeader';

export default function SuccessfullDealScreen({ navigation, route }) {
  // Root State
  const { successList, fetchSuccessDealDetail, fetchSuccessDeal, isLoadingSuccessDeal } =
    useSuccessStore();
  // State
  const [focusedTab, setFocusedTab] = useState('all');
  // Value
  const screenHeight = Dimensions.get('window').height;
  // Dummy
  const allData = successList ? successList : null;
  const samsungData = successList ? successList.filter(item => item.brand === 'samsung') : null;
  const lgData = successList ? successList.filter(item => item.brand === 'lg') : null;

  const onPressChangeTab = useCallback(
    tab => {
      setFocusedTab(tab);
    },
    [focusedTab],
  );

  const onPressRouteToSuccessfullDealInfo = useCallback(item => {
    fetchSuccessDealDetail(item.id);
    navigation.navigate('successfullDealInfo');
  }, []);

  useEffect(() => {
    fetchSuccessDeal();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ItemWrapper key={item.id} onPress={() => onPressRouteToSuccessfullDealInfo(item)}>
        <FlexSpaceBox>
          <FlexRowBox>
            <ThumbnailBox>
              <Icons icon={'gooddealThumbnail'} width={24} height={24} />
            </ThumbnailBox>
            <FlexColumnBox>
              <DetailBox>
                <BrandBox>
                  <BrandText>{BRAND_TYPE_TAG[item.brand]}</BrandText>
                </BrandBox>
                <NameText>{item.partner.name}</NameText>
              </DetailBox>
              <PriceBox>
                <SalePriceText>{validateMeasureUp2(item.priceAvailable)}</SalePriceText>
                <RetailPriceText>{validateMeasureUp2(item.priceNormal)}</RetailPriceText>
              </PriceBox>
            </FlexColumnBox>
          </FlexRowBox>
          <StoreIconBox attrSvg={item.brand}>
            <Icons icon={item.brand} width={25} height={15} />
          </StoreIconBox>
        </FlexSpaceBox>
      </ItemWrapper>
    );
  };

  const renderList = useCallback(() => {
    if (!isLoadingSuccessDeal && successList !== null) {
      switch (focusedTab) {
        case 'all':
          return (
            <FlatList
              data={allData}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          );
        case 'samsung':
          return (
            <FlatList
              data={samsungData}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          );
        case 'lg':
          return (
            <FlatList
              data={lgData}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          );
      }
    } else {
      return <ActivityIndicator size="small" color="#557FE6" />;
    }
  }, [focusedTab, successList, isLoadingSuccessDeal]);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader type={'step'} title={'성공딜 보기'} navigation={navigation} route={route} />
      </HeaderBlock>
      <TabBlock>
        {SUCCESSFUL_DEAL_TAB.map(item => (
          <TabBox
            key={item.id}
            attrFocused={item.tab === focusedTab}
            onPress={() => onPressChangeTab(item.tab)}
          >
            <TabText attrFocused={item.tab === focusedTab}>{item.name}</TabText>
          </TabBox>
        ))}
      </TabBlock>
      <ListBlock>{renderList()}</ListBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: #f2f3f4;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: white;
`;

const TabBlock = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 45px;
  padding: 0 25px;
  background-color: white;
`;

const TabBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 22%;
  height: 100%;
  ${props =>
    props.attrFocused &&
    css`
      border-bottom-width: 4px;
      border-bottom-color: #557fe6;
    `}
`;

const TabText = styled(Text)`
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(16, 700, 20)};
  ${props =>
    props.attrFocused &&
    css`
      color: black;
    `}
`;

const ListBlock = styled(View)`
  width: 100%;
  padding: 30px 25px;
`;

const ItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  margin-bottom: 15px;
  border-radius: 12px;
  background-color: white;
`;

const FlexSpaceBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  padding: 20px;
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const ThumbnailBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-right: 15px;
  background-color: #f2f3f5;
  border-radius: 21px;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;

const DetailBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const BrandBox = styled(View)`
  margin-right: 5px;
  padding: 1px 3px;
  border: 0.5px solid #adadad;
  border-radius: 5px;
`;

const BrandText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(11, 500, 15)};
`;

const NameText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(13, 500, 18)};
`;

const PriceBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-top: 3px;
`;

const SalePriceText = styled(Text)`
  margin-right: 20px;
  ${({ theme }) => theme.fontSet(17, 700, 25)};
`;

const RetailPriceText = styled(Text)`
  color: #bbb;
  ${({ theme }) => theme.fontSet(17, 400, 25)};
  text-decoration: line-through;
  text-decoration-color: #bbb;
`;

const StoreIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 35px;
  height: 35px;
  border-radius: 18px;
  ${props =>
    props.attrSvg === 'samsung' &&
    css`
      background-color: #3a67bf;
    `}
  ${props =>
    props.attrSvg === 'lg' &&
    css`
      background-color: #f34e4e;
    `}
    ${props =>
    props.attrSvg === 'himart' &&
    css`
      background-color: #ff1c1c;
    `}
    ${props =>
    props.attrSvg === 'electronic' &&
    css`
      background-color: #2e2f3a;
    `}
`;
