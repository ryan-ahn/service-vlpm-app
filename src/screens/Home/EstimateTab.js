import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  Platform,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { ESTIMATE_CHAT_TAB } from '@asset/data';
import { leftTime } from '@libs/utils/validation';
import Icons from '@components/Common/Icons';
import { validateMeasureUp2, elapsedTime } from '@libs/utils/validation';
import { useModalStore, useUserStore, useEstimateStore } from '@libs/zustand';
import PageHeader from '@components/Common/Header/PageHeader';
import EstimateChatModal from '@components/Modal/EstimateChatModal';
import GroupChannelListScreen from '@screens/GroupChannelListScreen';

export default function EstimateTabScreen({ navigation }) {
  // Roote State
  const { openModal } = useModalStore();
  const { currRequest, currEstimate, setCurrEstimate } = useUserStore();
  const {
    estimateList,
    channelUrl,
    fetchEstimateList,
    initEstimateListStore,
    initEstimateChannelUrl,
  } = useEstimateStore();
  console.log(estimateList);
  // State
  const [focusedTab, setFocusedTab] = useState('estimate');
  // value
  const screenHeight = Dimensions.get('window').height;

  const onPressChangeTab = useCallback(
    tab => {
      switch (tab) {
        case 'estimate':
          setFocusedTab(tab);
          break;
        case 'confirm':
          setFocusedTab(tab);
          break;
      }
    },
    [focusedTab],
  );

  const onPressRouteToChat = useCallback(
    item => {
      setCurrEstimate(item);
      openModal('ESTIMATE_CHAT');
    },
    [currEstimate],
  );

  useEffect(() => {
    if (focusedTab === 'estimate') {
      fetchEstimateList();
    } else {
      initEstimateListStore();
    }
  }, [focusedTab]);

  useEffect(() => {
    if (channelUrl !== null) {
      navigation.navigate('groupChannel', { channelUrl: channelUrl });
      initEstimateChannelUrl();
    }
  }, [channelUrl]);

  // Render Item
  const renderEstimateItem = useCallback(
    item => {
      return (
        <>
          <ItemWrapper onPress={() => onPressRouteToChat(item)}>
            <FlexSpaceView>
              <FlexRowView>
                <StoreIconBox attrSvg={item.partner.store.brand}>
                  <Icons icon={item.partner.store.brand} width={32} height={20} />
                </StoreIconBox>
                <StoreNameBox>
                  <StoreNameText>
                    {item.partner.name ? item.partner.name : '이름없는 판매자'}
                  </StoreNameText>
                  <DealPriceText>{validateMeasureUp2(Number(item.priceAvailable))}</DealPriceText>
                </StoreNameBox>
              </FlexRowView>
              <SinceText>{`${elapsedTime(item.createdAt)}`}</SinceText>
            </FlexSpaceView>
          </ItemWrapper>
        </>
      );
    },
    [estimateList],
  );

  //Render List
  const renderList = useCallback(
    list => {
      if (list !== null) {
        if (list.length !== 0) {
          return list.map(item => (
            <ScrollView key={item.id} style={{ height: 100 }}>
              {renderEstimateItem(item)}
            </ScrollView>
          ));
        } else {
          return (
            <EmptyWrapper>
              <EmptyText>도착한 견적서가 없어요</EmptyText>
            </EmptyWrapper>
          );
        }
      } else {
        return (
          <EmptyWrapper>
            <ActivityIndicator size="small" color="#557FE6" />
          </EmptyWrapper>
        );
      }
    },
    [estimateList],
  );

  return (
    <>
      <EstimateChatModal navigation={navigation} />
      <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight - 80 : screenHeight - 94 }}>
        <HeaderBlock>
          <PageHeader tab="estimate" />
        </HeaderBlock>
        <TabBlock>
          {ESTIMATE_CHAT_TAB.map(item => (
            <TabBox
              key={item.id}
              attrFocused={item.tab === focusedTab}
              onPress={() => onPressChangeTab(item.tab)}
            >
              <TabText attrFocused={item.tab === focusedTab}>{item.name}</TabText>
            </TabBox>
          ))}
        </TabBlock>
        <ContentsBlock>
          {focusedTab === 'estimate' ? (
            <NoticeBox>
              <NoticeRegularText>
                파트너분들이 조건에 맞는 요청을 검토하고 있어요.
              </NoticeRegularText>
              {currRequest && (
                <NoticeRegularText>
                  <NoticeBoldText>⏱ {leftTime(currRequest.createdAt)} 후</NoticeBoldText> 새로운
                  견적 요청서를 작성 할 수 있어요.
                </NoticeRegularText>
              )}
            </NoticeBox>
          ) : (
            <NoticeBox>
              <NoticeRegularText>
                {`🚨 상담사의 견적과 실제 견적이 상이할 경우 꼭 발품노노에 알려주시기 바랍니다. (1:1문의)`}
              </NoticeRegularText>
            </NoticeBox>
          )}
        </ContentsBlock>
        <ListBlock
          style={{ height: Platform.OS === 'ios' ? screenHeight - 325 : screenHeight - 304 }}
        >
          {focusedTab === 'estimate' ? renderList(estimateList) : <GroupChannelListScreen />}
        </ListBlock>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(View)`
  background-color: white;
`;

const HeaderBlock = styled(View)`
  padding: 0 25px;
  padding-bottom: 20px;
`;

const ContentsBlock = styled(View)`
  padding: 20px 20px;
`;

const NoticeBox = styled(View)`
  border: 1px solid #f2f3f4;
  border-radius: 12px;
  padding: 10px 15px;
`;

const NoticeRegularText = styled(Text)`
  color: #949494;
  ${({ theme }) => theme.fontSet(12, 400, 18)};
`;

const NoticeBoldText = styled(Text)`
  color: #949494;
  ${({ theme }) => theme.fontSet(12, 700, 18)};
`;

const TabBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  height: 45px;
  padding: 0 25px;
`;

const TabBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 22%;
  height: 100%;
  margin-right: 10px;
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

const ItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  width: 100%;
  margin: 30px 0;
`;

const FlexSpaceView = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
`;

const FlexRowView = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
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

const DealPriceText = styled(Text)`
  ${({ theme }) => theme.fontSet(13, 300, 16)};
`;

const SinceText = styled(Text)`
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 400, 18)};
`;

const ListBlock = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

const EmptyWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100px;
`;

const EmptyText = styled(Text)`
  color: #666;
  ${({ theme }) => theme.fontSet(13, 400, 20)};
`;
