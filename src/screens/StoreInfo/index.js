/**
 * Author : Ryan
 * Date : 2022-08-07
 * Desc : index
 */

import React from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useMainStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import StackHeader from '@components/Common/Header/StackHeader';

export default function StoreInfoScreen({ navigation, route }) {
  // Root State
  const { promotionStoreDetail, isLoadingStoreDetail } = useMainStore();
  // Value
  const screenHeight = Dimensions.get('window').height;

  if (promotionStoreDetail && !isLoadingStoreDetail) {
    return (
      <Wrapper>
        <HeaderBlock>
          <StackHeader
            type={'popup'}
            title={'이벤트 매장 정보'}
            navigation={navigation}
            route={route}
          />
        </HeaderBlock>
        <ScrollView style={{ height: screenHeight - 90, overflow: 'scroll' }}>
          <TitleBlock>
            <FlexRowBox>
              <StoreIconBox attrSvg={promotionStoreDetail.brand}>
                <Icons icon={promotionStoreDetail.brand} width={60} height={60} />
              </StoreIconBox>
              <StoreDetailBox>
                <NameText>{promotionStoreDetail.name}</NameText>
                <AddressText>{promotionStoreDetail.address}</AddressText>
                <CallButtonBox
                  onPress={() => {
                    Linking.openURL(`tel:${promotionStoreDetail.contact}`);
                  }}
                >
                  <ButtonText>전화하기</ButtonText>
                </CallButtonBox>
              </StoreDetailBox>
            </FlexRowBox>
          </TitleBlock>
          <ContentBlock>
            <LabelText>이벤트</LabelText>
            <ContentText>{promotionStoreDetail.eventType}</ContentText>
            <LabelText>한줄 소개</LabelText>
            <ContentText>{promotionStoreDetail.intro}</ContentText>
            <LabelText>태그</LabelText>
            <TagBox>
              {promotionStoreDetail.tags.map((item, index) => (
                <Tag key={index}>{`#${item}`}</Tag>
              ))}
            </TagBox>
          </ContentBlock>
        </ScrollView>
      </Wrapper>
    );
  } else {
    return (
      <LoadingWrapper>
        <ActivityIndicator size="small" color="#557FE6" />
      </LoadingWrapper>
    );
  }
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

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const StoreIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 78px;
  height: 78px;
  margin-right: 15px;
  border-radius: 12px;
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

const StoreDetailBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const NameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 24)};
`;

const AddressText = styled(Text)`
  color: #b1b1b1;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const CallButtonBox = styled(TouchableOpacity)`
  margin-top: 5px;
  background-color: #f2f3f4;
  border-radius: 6px;
`;

const ButtonText = styled(Text)`
  padding: 4px 7px ${({ theme }) => theme.fontSet(12, 500, 16)};
`;

const ContentBlock = styled(View)`
  padding: 30px 25px;
  background-color: white;
`;

const LabelText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 24)};
`;

const ContentText = styled(Text)`
  margin-top: 3px;
  margin-bottom: 30px;
  color: #7c7d7d;
  ${({ theme }) => theme.fontSet(14, 300, 22)};
`;

const TagBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 200px;
  margin-top: 3px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Tag = styled(Text)`
  margin-right: 5px;
  margin-bottom: 3px;
  color: #7c7d7d;
  background-color: #f2f3f4;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const LoadingWrapper = styled(View)`
  padding: 100px 30px;
`;
