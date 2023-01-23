/**
 * Author : Ryan
 * Date : 2022-08-08
 * Desc : EstimateChatModal
 */

import React, { useCallback } from 'react';
import { Dimensions, View, TouchableOpacity, Text, Modal } from 'react-native';
import styled from 'styled-components/native';
import { useEstimateStore, useModalStore, useUserStore } from '@libs/zustand';
import { validateMeasureUp2 } from '@libs/utils/validation';
import Icons from '@components/Common/Icons';

export default function EstimateChatModal({ navigation }) {
  // Root State
  const { isOpen, closeModal, modalType } = useModalStore();
  const { currEstimate } = useUserStore();
  const { fetchCreateChat } = useEstimateStore();
  // Value
  const screenWidth = Dimensions.get('window').width;

  const onPressRouteToStack = useCallback(
    type => {
      switch (type) {
        case 'myCall':
          navigation.navigate('myCall');
          break;
        case 'estimateChat':
          fetchCreateChat({ estimateId: currEstimate.id });
          break;
      }
    },
    [navigation, currEstimate],
  );

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'ESTIMATE_CHAT'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          {currEstimate && (
            <ContentBlock>
              <TitleBlock>
                <StoreText>
                  {currEstimate.partner.store.name
                    ? currEstimate.partner.store.name
                    : '이름없는 스토어'}
                </StoreText>
                <SalesPersonBox>
                  <Icons icon={'successInfoCheck'} width={14} height={14} />
                  <SalesPersonText>{`인증 딜러 : ${
                    currEstimate.partner.name ? currEstimate.partner.name : '이름없는 파트너'
                  }`}</SalesPersonText>
                  {/* <SalesPersonRateText>{`${currEstimate.partner.rate ?? ''}(${
                    currEstimate.partner.success_deal_cnt ?? ''
                  })`}</SalesPersonRateText> */}
                </SalesPersonBox>
              </TitleBlock>
              <SpecDetailBlock>
                <RowBox>
                  <LabelText>견적 리스트</LabelText>
                  {/* <ValueBox>
                    <ValueBoldText>{`${currEstimate.request.brand} / ${
                      SUCCESSFUL_DEAL_INFO_DUMMY.product_list[1]
                    } 외 ${SUCCESSFUL_DEAL_INFO_DUMMY.product_list.length - 1}종`}</ValueBoldText>
                  </ValueBox> */}
                </RowBox>
                <RowBox>
                  <LabelText>카드 할인</LabelText>
                  <ValueRegularText>
                    {currEstimate.discounts.card ? '적용' : '없음'}
                  </ValueRegularText>
                </RowBox>
                <RowBox>
                  <LabelText>상품권</LabelText>
                  <ValueRegularText>
                    {currEstimate.discounts.giftcard ? '적용' : '없음'}
                  </ValueRegularText>
                </RowBox>
                <RowBox>
                  <LabelText>포인트 캐시백</LabelText>
                  <ValueRegularText>
                    {currEstimate.discounts.cashback ? '적용' : '없음'}
                  </ValueRegularText>
                </RowBox>
                <RowBox>
                  <LabelText>할인 종류</LabelText>
                  <ValueRegularText>{currEstimate.discounts.type}</ValueRegularText>
                </RowBox>
                <RowBox style={{ marginBottom: 0 }}>
                  <LabelText>지점 할인</LabelText>
                  <ValueRegularText>
                    {currEstimate.discounts.store ? '적용' : '없음'}
                  </ValueRegularText>
                </RowBox>
                <DividingLine style={{ width: screenWidth - 50 }} />
                <RowBox style={{ marginBottom: 0 }}>
                  <LabelBox>
                    <LabelLargeText>최대 혜택가</LabelLargeText>
                    <Icons icon={'successInfoPercent'} width={12} height={11} />
                  </LabelBox>
                  <ValueBoldLargeText>
                    {validateMeasureUp2(currEstimate.priceAvailable)}
                  </ValueBoldLargeText>
                </RowBox>
              </SpecDetailBlock>
              <ButtonBox>
                {/* <GoToHomeBox onPress={() => onPressRouteToStack('myCall')}>
                  <NewEstimateText>내요청서</NewEstimateText>
                </GoToHomeBox> */}
                <ToContinueBox onPress={() => onPressRouteToStack('estimateChat')}>
                  <ToContinueText>상담하기</ToContinueText>
                </ToContinueBox>
              </ButtonBox>
            </ContentBlock>
          )}
        </ModalView>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ModalView = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ContentBlock = styled(View)`
  width: 100%;
  padding: 30px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TitleBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
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

const SpecDetailBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 1.5px;
  padding: 25px 0;
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

const ButtonBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
`;

const GoToHomeBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 48.5%;
  height: 56px;
  border: 1px solid #557fe6;
  border-radius: 12px;
`;

const NewEstimateText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const ToContinueBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 56px;
  background-color: #557fe6;
  border-radius: 12px;
`;

const ToContinueText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
