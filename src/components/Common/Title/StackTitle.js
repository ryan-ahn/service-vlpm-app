/**
 * Author : Ryan
 * Date : 2022-05-26
 * Desc : StackTitle
 */

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export default function StackTitle({ title, description, option = false }) {
  return (
    <Wrapper>
      <TitleText>
        {title}
        {option ? <OptionText>{'  (선택)'}</OptionText> : null}
      </TitleText>
      {description ? <TitleDescription>{description}</TitleDescription> : null}
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  padding: 0 25px;
  height: auto;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(25, 700, 35)};
`;

const OptionText = styled(Text)`
  color: #a8a8a8;
  ${({ theme }) => theme.fontSet(14, 300, 35)};
`;

const TitleDescription = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(15, 400, 26)};
`;
