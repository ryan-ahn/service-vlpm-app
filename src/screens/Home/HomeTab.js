/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : index
 */

import React, { useEffect } from 'react';
import { Dimensions, Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useMainStore } from '@libs/zustand';
import PageHeader from '@components/Common/Header/PageHeader';
import SmallBanner from '@components/Common/Banner/SmallBanner';
import MainVerticalContainer from '@components/Common/Container/MainVerticalContainer';
import MainHorizontalContainer from '@components/Common/Container/MainHorizontalContainer';

export default function HomeTabScreen({ navigation }) {
  // Root State
  const { fetchMain } = useMainStore();
  // value
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetchMain();
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight - 80 : screenHeight - 94 }}>
      <HeaderBlock>
        <PageHeader tab="home" navigation={navigation} />
      </HeaderBlock>
      <ScrollBlock>
        <ContentsBlock>
          <BannerBox>
            <SmallBanner />
          </BannerBox>
          <ContentBox>
            <MainVerticalContainer
              navigation={navigation}
              type={'estimateType'}
              title={'견적받기'}
            />
          </ContentBox>
          <ContentBox>
            <MainVerticalContainer
              navigation={navigation}
              type={'goodDeal'}
              title={'성공딜 보기'}
            />
          </ContentBox>
          <ContentBox>
            <MainVerticalContainer
              navigation={navigation}
              type={'searchStore'}
              title={'할인 지점 찾기'}
              count={5}
            />
          </ContentBox>
        </ContentsBlock>
        {/* <EventBlock>
          <ContentBox>
            <MainHorizontalContainer title={'이벤트 소식'} />
          </ContentBox>
        </EventBlock> */}
      </ScrollBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 25px;
  padding-bottom: 20px;
`;

const ScrollBlock = styled(ScrollView)`
  width: auto;
  height: auto;
`;
const ContentsBlock = styled(View)`
  padding: 0 20px;
  padding-bottom: 20px; // 이벤트 추가시 삭제
`;

const ContentBox = styled(View)`
  width: 100%;
  height: auto;
  margin: 7px 0;
`;

const BannerBox = styled(TouchableOpacity)`
  width: 100%;
  height: 100px;
  margin-bottom: 7px;
  border-radius: 20px;
  overflow: hidden;
`;

const EventBlock = styled(View)`
  padding-left: 20px;
`;
