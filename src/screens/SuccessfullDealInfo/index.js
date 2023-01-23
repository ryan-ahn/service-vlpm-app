/**
 * Author : Ryan
 * Date : 2022-08-04
 * Desc : index
 */

import React, { useCallback } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { useSuccessStore } from '@libs/zustand';
import { BRAND_TYPE_NAME, MODEL_TYPE_NAME } from '@asset/data';
import { validateMeasureUp2, validateCreateAt } from '@libs/utils/validation';
import StackHeader from '@components/Common/Header/StackHeader';
import Icons from '@components/Common/Icons';

export default function SuccessfullDealInfoScreen({ navigation, route }) {
  // Root State
  const { successDetail, isLoadingSuccessDealDetail } = useSuccessStore();
  // Value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressRouteToSuccessfullDealSpec = useCallback(() => {
    navigation.navigate('successfullDealSpec');
  }, [navigation]);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader type={'popup'} title={'성공딜 정보'} navigation={navigation} route={route} />
      </HeaderBlock>
      {successDetail && !isLoadingSuccessDealDetail ? (
        <ScrollView style={{ height: screenHeight - 90, overflow: 'scroll' }}>
          <TitleBlock>
            <StoreText>{successDetail.partner.store.name}</StoreText>
            <SalesPersonBox>
              <Icons icon={'successInfoCheck'} width={14} height={14} />
              <SalesPersonText>{`인증 딜러 : ${successDetail.partner.name} 파트너`}</SalesPersonText>
              <SalesPersonRateText>{`${successDetail.partner.score}`}</SalesPersonRateText>
            </SalesPersonBox>
          </TitleBlock>
          <ContentBlock>
            <RowBox>
              <LabelText>견적 리스트</LabelText>
              <ValueBox>
                <ValueBoldText>{`${BRAND_TYPE_NAME[successDetail.brand]} / ${
                  MODEL_TYPE_NAME.filter(item => item.id === successDetail.products[0].id)[0].name
                } 외 ${successDetail.products.length - 1}종`}</ValueBoldText>
                <SpecViewButton onPress={onPressRouteToSuccessfullDealSpec}>
                  <ButtonText>스펙보기</ButtonText>
                </SpecViewButton>
              </ValueBox>
            </RowBox>
            <RowBox>
              <LabelText>카드 할인</LabelText>
              <ValueRegularText>
                {successDetail.discounts.card ? '적용' : '미적용'}
              </ValueRegularText>
            </RowBox>
            <RowBox>
              <LabelText>상품권</LabelText>
              <ValueRegularText>
                {successDetail.discounts.giftcard ? '적용' : '미적용'}
              </ValueRegularText>
            </RowBox>
            <RowBox>
              <LabelText>포인트 캐시백</LabelText>
              <ValueRegularText>
                {successDetail.discounts.cashback ? '적용' : '미적용'}
              </ValueRegularText>
            </RowBox>
            <RowBox>
              <LabelText>할인 종류</LabelText>
              <ValueRegularText>{successDetail.discounts.type}</ValueRegularText>
            </RowBox>
            <RowBox style={{ marginBottom: 0 }}>
              <LabelText>지점 할인</LabelText>
              <ValueRegularText>{successDetail.discounts.store ? '적용' : '없음'}</ValueRegularText>
            </RowBox>
            <DividingLine style={{ width: screenWidth - 50 }} />
            <RowBox>
              <LabelText>출고가</LabelText>
              <ValueRegularText style={{ color: '#557FE6' }}>
                {validateMeasureUp2(successDetail.priceNormal)}
              </ValueRegularText>
            </RowBox>
            <RowBox>
              <LabelText>발품노노 총 할인</LabelText>
              <ValueRegularText style={{ color: '#557FE6' }}>
                {validateMeasureUp2(
                  Number(successDetail.priceNormal) - Number(successDetail.priceNormal),
                )}
              </ValueRegularText>
            </RowBox>
            <RowBox style={{ marginBottom: 0 }}>
              <LabelBox>
                <LabelLargeText>최대 혜택가</LabelLargeText>
                <Icons icon={'successInfoPercent'} width={12} height={11} />
              </LabelBox>
              <ValueBoldLargeText>
                {validateMeasureUp2(successDetail.priceAvailable)}
              </ValueBoldLargeText>
            </RowBox>
          </ContentBlock>
          <ReviewBlock>
            <ReviewTitleBox>
              <ReviewText>리뷰</ReviewText>
            </ReviewTitleBox>
            <ReviewItemBox>
              <FlexSpaceBox>
                <NameText>{successDetail.review.name}</NameText>
                <DateText>{`${validateCreateAt(successDetail.review.createdAt)}`}</DateText>
              </FlexSpaceBox>
              <RateBox>
                <Icons icon={'starRate'} width={15} height={15} />
                <Rate>{successDetail.review.score}</Rate>
              </RateBox>
              <ContentText>{successDetail.review.content}</ContentText>
            </ReviewItemBox>
          </ReviewBlock>
        </ScrollView>
      ) : (
        <LoadingWrapper>
          <ActivityIndicator size="small" color="#557FE6" />
        </LoadingWrapper>
      )}
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

const TitleBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  padding: 25px;
  margin-bottom: 10px;
  background-color: white;
`;

const StoreText = styled(Text)`
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;

const SalesPersonBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  margin-top: 10px;
`;

const SalesPersonText = styled(Text)`
  margin-left: 5px;
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 400, 17)};
`;

const SalesPersonRateText = styled(Text)`
  margin-left: 5px;
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 700, 17)};
`;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 1.5px;
  padding: 25px;
  background-color: white;
`;

const RowBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  margin-bottom: 20px;
`;

const ValueBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-end', 'center', 'row')};
`;

const LabelText = styled(Text)`
  color: #676767;
  ${({ theme }) => theme.fontSet(15, 400, 21)};
`;

const ValueBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(15, 700, 21)};
`;

const ValueRegularText = styled(Text)`
  ${({ theme }) => theme.fontSet(15, 400, 21)};
`;

const ValueBoldLargeText = styled(Text)`
  ${({ theme }) => theme.fontSet(18, 700, 25)};
`;

const SpecViewButton = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-left: 10px;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: #f1f4fd;
`;

const ButtonText = styled(Text)`
  color: #676767;
  ${({ theme }) => theme.fontSet(12, 700, 14)};
`;

const DividingLine = styled(View)`
  margin: 25px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ededed;
`;

const LabelBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const LabelLargeText = styled(Text)`
  margin-right: 5px;
  color: #676767;
  ${({ theme }) => theme.fontSet(15, 700, 21)};
`;

const ReviewBlock = styled(View)`
  background-color: white;
  padding: 20px;
`;

const ReviewTitleBox = styled(View)`
  margin-bottom: 15px;
`;

const ReviewText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 23)};
`;

const ReviewItemBox = styled(View)`
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: #f2f3f4;
`;

const FlexSpaceBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
`;

const NameText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(13, 500, 20)};
`;

const DateText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(13, 500, 20)};
`;

const RateBox = styled(View)`
  margin-top: 5px;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const Rate = styled(Text)`
  margin-left: 5px;
  color: #676767;
  ${({ theme }) => theme.fontSet(14, 500, 20)};
`;

const ContentText = styled(Text)`
  margin-top: 10px;
  color: #676767;
  ${({ theme }) => theme.fontSet(14, 500, 19)};
`;

const LoadingWrapper = styled(View)`
  padding: 30px;
`;
