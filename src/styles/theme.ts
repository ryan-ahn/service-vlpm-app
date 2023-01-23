/**
 * Author : Ryan
 * Date : 2022-05-01
 * Desc : theme
 */

import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';
import { flexSet, fontSet, backgroundSet } from './mixin';

const myTheme: DefaultTheme = {
  flexSet,
  fontSet,
  backgroundSet,
};

export type Theme = typeof myTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export default myTheme;
