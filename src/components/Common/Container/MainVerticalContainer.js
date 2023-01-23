/**
 * Author : Ryan
 * Date : 2022-05-22
 * Desc : MainContainer
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { BRAND_TYPE_TAG } from '@asset/data';
import { useMainStore, useSuccessStore } from '@libs/zustand';
import { validationMillion, validateMeasureUp } from '@libs/utils/validation';
import Icons from '@components/Common/Icons';

export default function MainVerticalContainer({ type, navigation, title, count }) {
  // Root State
  const { successDealList, promotionStoreList, fetchStoreDetail, isLoadingMain } = useMainStore();
  const { fetchSuccessDealDetail } = useSuccessStore();

  const onPressRouteToStack = useCallback(() => {
    switch (type) {
      case 'estimateType':
        navigation.navigate('estimateType');
        break;
      case 'goodDeal':
        navigation.navigate('successfullDeal');
        break;
      case 'searchStore':
        // navigation.navigate('saleStore');
        break;
    }
  }, [type]);

  const onPressRouteToSuccessfullDealInfo = useCallback(id => {
    fetchSuccessDealDetail(id);
    navigation.navigate('successfullDealInfo');
  }, []);

  const onPressRouteToStoreInfo = useCallback(id => {
    fetchStoreDetail({ id: id });
    navigation.navigate('storeInfo');
  }, []);

  const renderDetail = useCallback(() => {
    switch (type) {
      case 'estimateType':
        return (
          <>
            <FlexRowView>
              <EstimateThumbnailBox>
                <EstimateThumbnail source={require('@asset/icons/main/estimate-thumbnail.png')} />
              </EstimateThumbnailBox>
              <View>
                <EstimateDetailDescription>전국 인증된 329명의 딜러</EstimateDetailDescription>
                <EstimateDetailTitle>가전 견적 한번에 받으세요</EstimateDetailTitle>
              </View>
            </FlexRowView>
          </>
        );
      case 'goodDeal':
        if (successDealList && !isLoadingMain) {
          return (
            <Swiper autoplay={true} autoplayTimeout={2} showsPagination={false} height={'100%'}>
              {successDealList.map(item => (
                <FlexSpaceView key={item.id}>
                  <FlexRowView>
                    <GoodDealIconBox>
                      <Icons icon={'gooddealThumbnail'} width={24} height={24} />
                    </GoodDealIconBox>
                    <GoodDealDetailBox>
                      <GoodDealNameBox>
                        <BrandText>{BRAND_TYPE_TAG[item.brand]}</BrandText>
                        <NameText>{item.call.customer.name}</NameText>
                      </GoodDealNameBox>
                      <GoodDealPriceBox>
                        <SalePrice>
                          {validateMeasureUp(validationMillion(item.priceAvailable))}
                        </SalePrice>
                        <Price>{validateMeasureUp(validationMillion(item.priceNormal))}</Price>
                      </GoodDealPriceBox>
                    </GoodDealDetailBox>
                  </FlexRowView>
                  <ViewButtonBox onPress={onPressRouteToSuccessfullDealInfo}>
                    <ButtonText>보기</ButtonText>
                  </ViewButtonBox>
                </FlexSpaceView>
              ))}
            </Swiper>
          );
        } else {
          return <ActivityIndicator size="small" color="#557FE6" />;
        }
      case 'searchStore':
        if (promotionStoreList && !isLoadingMain) {
          return (
            <>
              {promotionStoreList.map((item, index) =>
                index <= count - 1 ? (
                  <ItemWrapper key={item.id} attrLastChild={index === count - 1}>
                    <FlexSpaceView>
                      <FlexRowView>
                        <StoreIconBox attrSvg={item.brand}>
                          <Icons icon={item.brand} width={32} height={20} />
                        </StoreIconBox>
                        <StoreNameBox>
                          <StoreNameText>{item.name}</StoreNameText>
                          <StoreEventText>{item.eventType}</StoreEventText>
                        </StoreNameBox>
                      </FlexRowView>
                      <ViewButtonBox onPress={() => onPressRouteToStoreInfo(item.id)}>
                        <ButtonText>보기</ButtonText>
                      </ViewButtonBox>
                    </FlexSpaceView>
                  </ItemWrapper>
                ) : null,
              )}
            </>
          );
        } else {
          return <ActivityIndicator size="small" color="#557FE6" />;
        }
    }
  }, [type, count, successDealList, promotionStoreList, isLoadingMain]);

  return (
    <Wrapper>
      {title ? (
        <TitleBlock onPress={onPressRouteToStack}>
          <Title>{title}</Title>
          <Icons icon={'rightArrowGray'} size={18} />
        </TitleBlock>
      ) : (
        <View style={{ height: 10 }} />
      )}
      <DetailBlock>{renderDetail()}</DetailBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
`;

const ItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  width: 100%;
  margin: 5px 0 35px 0;
  ${props =>
    props.attrLastChild &&
    css`
      margin-bottom: 10px;
    `}
`;

const TitleBlock = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 64px;
  padding: 15px 25px 0 25px;
`;

const Title = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 25)};
`;

const DetailBlock = styled(View)`
  width: 100%;
  padding: 15px 25px 25px 25px;
`;

const FlexSpaceView = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
`;

const FlexRowView = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const EstimateThumbnailBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 40px;
  height: 49px;
  margin-right: 10px;
`;

const EstimateThumbnail = styled(Image)`
  width: 29px;
  height: 49px;
`;

const EstimateDetailDescription = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(14, 400, 22)};
`;

const EstimateDetailTitle = styled(Text)`
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const GoodDealIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-right: 15px;
  border-radius: 21px;
  background-color: #f2f3f5;
  overflow: hidden;
`;

const GoodDealDetailBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
`;

const GoodDealNameBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  margin-bottom: 3px;
`;

const BrandText = styled(Text)`
  margin-right: 5px;
  padding: 2px 4px;
  border: 0.5px solid #adadad;
  border-radius: 5px;
  color: #adadad;
  ${({ theme }) => theme.fontSet(11, 500, 14)};
`;

const NameText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(13, 500, 15)};
`;

const GoodDealPriceBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-end', 'row')};
  width: 100%;
`;

const SalePrice = styled(Text)`
  margin-right: 10px;
  ${({ theme }) => theme.fontSet(18, 500, 22)};
`;

const Price = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(15, 400, 18)};
  text-decoration: line-through;
  text-decoration-color: #557fe6;
`;

const ViewButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 49px;
  height: 33px;
  border-radius: 6px;
  background-color: #f2f3f4;
`;

const ButtonText = styled(Text)`
  ${({ theme }) => theme.fontSet(13, 700, 17)};
`;

const StoreIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-right: 15px;
  border-radius: 21px;
  background-color: black;
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

const StoreNameBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  height: 42px;
  padding: 2px 0;
`;

const StoreNameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 20)};
`;

const StoreEventText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(13, 300, 16)};
`;
