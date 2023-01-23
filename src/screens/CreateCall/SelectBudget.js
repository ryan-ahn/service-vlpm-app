/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : SelectBudget
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { Slider } from '@rneui/themed';
import { STACK_TITLE } from '@asset/data';
import { useCallStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import StackTitle from '@components/Common/Title/StackTitle';
import { validateMeasureUp } from '@libs/utils/validation';

export default function SelectBudget() {
  // Root State
  const { budget, setBudget } = useCallStore();

  const onValueChangeBudget = value => {
    const result = Math.round(value / 10) * 10;
    setBudget(result);
  };

  return (
    <Wrapper>
      <StackTitle title={STACK_TITLE.selectBudget.title} description={false} />
      <SliderBox>
        <BudgetTopText attrHidden={budget >= 800}>{'~' + budget + '만원'}</BudgetTopText>
        <Slider
          value={budget}
          trackStyle={{ height: 33, borderRadius: 10, backgroundColor: 'transparent' }}
          thumbStyle={{ backgroundColor: 'transparent' }}
          thumbTouchSize={{ width: 50, height: 120 }}
          thumbProps={{
            children: (
              <ThumbBox>
                <BudgetText attrHidden={budget < 800} attrMarginLeft={budget >= 1000}>
                  {'~' + validateMeasureUp(budget) + '만원'}
                </BudgetText>
                <IconBox>
                  <Icons icon={'budgetThumb'} width={32} height={39} />
                </IconBox>
              </ThumbBox>
            ),
          }}
          minimumValue={0}
          maximumValue={3000}
          minimumTrackTintColor="#557FE6"
          maximumTrackTintColor="#F2F4F6"
          allowTouchTrack={false}
          onValueChange={value => onValueChangeBudget(value)}
        />
      </SliderBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const SliderBox = styled(View)`
  padding: 70px 25px 0 25px;
`;

const ThumbBox = styled(View)`
  width: 100px;
  height: 100px;
`;

const IconBox = styled(View)`
  top: 13px;
  left: 4px;
`;

const BudgetTopText = styled(Text)`
  color: #557fe6;
  ${props =>
    props.attrHidden &&
    css`
      opacity: 0;
    `}
`;

const BudgetText = styled(Text)`
  top: 7px;
  left: -70px;
  opacity: 1;
  color: white;
  ${({ theme }) => theme.fontSet(16, 400, 23)};
  ${props =>
    props.attrHidden &&
    css`
      opacity: 0;
    `}
  ${props =>
    props.attrMarginLeft &&
    css`
      left: -81px;
    `}
`;
