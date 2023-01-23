/**
 * Author : Ryan
 * Date : 2022-05-21
 * Desc : Page
 */

import React, { useCallback } from 'react';
import { View, Platform, Text } from 'react-native';
import styled, { css } from 'styled-components';
import Icons from '@components/Common/Icons';

export default function Page({ navigation, tab }) {
  const renderLeftItem = useCallback(() => {
    switch (tab) {
      case 'home':
        return <Title fontSize={tab === 'home'}>VLPM</Title>;
      case 'estimate':
        return <Title>견적상담</Title>;
      case 'community':
        return <Title>커뮤니티</Title>;
      case 'mypage':
        return <Title>마이페이지</Title>;
    }
  }, [tab]);

  const renderRightItem = useCallback(() => {
    switch (tab) {
      case 'home':
        return <Icons icon={'HeaderHomeAlert'} size={22} />;
      case 'estimate':
        return <></>;
      case 'community':
        return <Icons icon={'HeadercommunitySearch'} size={22} />;
      case 'mypate':
        return <></>;
    }
  }, [tab]);

  return (
    <Wrapper ios={Platform.OS === 'ios'}>
      <TitleBox>{renderLeftItem()}</TitleBox>
      <IconBox>{renderRightItem()}</IconBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-end', 'row')};
  height: 65px;
  ${props =>
    props.ios &&
    css`
      height: 100px;
    `}
`;

const TitleBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 30px;
`;

const IconBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 30px;
`;

const Title = styled(Text)`
  width: 150px;
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(25, 700, 30)};
  ${props =>
    props.fontSize &&
    css`
      ${({ theme }) => theme.fontSet(27, 700, 32)};
    `}
`;
