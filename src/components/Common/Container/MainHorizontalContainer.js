/**
 * Author : Ryan
 * Date : 2022-05-26
 * Desc : MainHorizontalContainer
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';

const DUMMY_LIST3 = [
  { id: 0, title: '신규가입시 스타벅스 쿠폰 무조건 증정' },
  { id: 1, title: '리뷰만 남겨도 쿠폰 무조건 증정' },
  { id: 2, title: '친구 초대시 마일리지 증정' },
  { id: 3, title: '신규가입시 스타벅스 쿠폰 무조건 증정' },
  { id: 4, title: '리뷰만 남겨도 무조건 증정' },
];

export default function MainHorizontalContainer({ title, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <ItemWrapper>
        <EventTitleBox>
          <EventTitle>{'혜택' + (item.id + 1)}</EventTitle>
          <EventDescription>{item.title}</EventDescription>
        </EventTitleBox>
        <EventImageBox>
          <EventImage source={require('@asset/icons/main/event-coffee.png')} />
        </EventImageBox>
      </ItemWrapper>
    );
  };

  return (
    <Wrapper>
      <TitleBlock>
        <Title>{title}</Title>
      </TitleBlock>
      <FlatList
        data={DUMMY_LIST3}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  width: 100%;
  padding-bottom: 30px;
`;

const TitleBlock = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 64px;
  padding: 20px 10px 5px 10px;
`;

const Title = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 25)};
`;

const ItemWrapper = styled(TouchableOpacity)`
  position: relative;
  width: 139px;
  height: 179px;
  margin-right: 14px;
  padding: 25px;
  border-radius: 20px;
  background-color: white;
`;

const EventTitleBox = styled(View)``;

const EventTitle = styled(Text)`
  margin-bottom: 12px;
  color: #557fe6;
  ${({ theme }) => theme.fontSet(13, 400, 16)};
`;

const EventDescription = styled(Text)``;

const EventImageBox = styled(View)`
  position: absolute;
  bottom: 23px;
  right: 15px;
`;

const EventImage = styled(Image)`
  width: 49px;
  height: 49px;
`;
