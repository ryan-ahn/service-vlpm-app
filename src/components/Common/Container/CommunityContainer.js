/**
 * Author : Ryan
 * Date : 2022-07-27
 * Desc : CommunityContainer
 */

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import Icons from '@components/Common/Icons';

export default function CommunityContainer({ title, name, content, date, view, heart, comments }) {
  return (
    <Wrapper>
      <ContentBlock>
        <FlexColumnBox>
          <FlexSpaceBox>
            <FlexRowBox>
              <NewBox>
                <NewText>New</NewText>
              </NewBox>
              <TitleText numberOfLines={1} ellipsizeMode="tail">
                {title}
              </TitleText>
            </FlexRowBox>
            <NameText>{maskingName(name)}</NameText>
          </FlexSpaceBox>
          <ContentText numberOfLines={3} ellipsizeMode="tail">
            {content}
          </ContentText>
          <DateText>{elapsedTime(date)}</DateText>
          <FlexRowBox>
            <IconBox>
              <Icons icon={'communityView'} width={12} height={12} />
              <CountText>{view}</CountText>
            </IconBox>
            <IconBox>
              <Icons icon={'communityHeart'} width={12} height={12} />
              <CountText>{heart}</CountText>
            </IconBox>
            <IconBox>
              <Icons icon={'communityView'} width={12} height={12} />
              <CountText>{comments}</CountText>
            </IconBox>
          </FlexRowBox>
        </FlexColumnBox>
      </ContentBlock>
    </Wrapper>
  );
}

const elapsedTime = date => {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜

  const diff = end - start; // 경과 시간

  const times = [
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
};

const maskingName = name => {
  // 첫글자 빼고 마스킹
  // 어케 했는지는 모르지만 일단 됨
  return name.replace(new RegExp(`(?!.{${name.length}}).`, 'g'), '*');
};

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
`;

const ContentBlock = styled(View)`
  padding: 20px;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const FlexSpaceBox = styled(View)`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const NewBox = styled(View)`
  margin-right: 10px;
  padding: 4px 7px;
  border-radius: 10px;
  background-color: #fac850;
`;

const NewText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(9, 700, 11)};
`;

const TitleText = styled(Text)`
  width: 80%;
  ${({ theme }) => theme.fontSet(17, 500, 25)};
`;

const NameText = styled(Text)`
  color: #a3aab6;
  ${({ theme }) => theme.fontSet(10, 400, 14)};
`;

const ContentText = styled(Text)`
  margin-top: 10px;
  ${({ theme }) => theme.fontSet(12, 400, 17)};
`;

const DateText = styled(Text)`
  margin-top: 7px;
  color: #a3aab6;
  ${({ theme }) => theme.fontSet(11, 400, 15)};
`;

const IconBox = styled(View)`
  margin-top: 7px;
  margin-right: 30px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const CountText = styled(Text)`
  margin-left: 5px;
  color: #525864;
  ${({ theme }) => theme.fontSet(10, 400, 14)};
`;
