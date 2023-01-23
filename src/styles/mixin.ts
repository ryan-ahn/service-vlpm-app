/**
 * Author : Ryan
 * Date : 2022-05-01
 * Desc : mixin
 */

import { css } from 'styled-components';

//Type of Flex Set
export type TJC =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TAI = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';

export type TFD = 'row' | 'column' | 'row-reverse' | 'column-reverse';

//Flex Set
export const flexSet = (TJC?: TJC, TAI?: TAI, TFD?: TFD) => css`
  display: flex;
  justify-content: ${TJC};
  align-items: ${TAI};
  flex-direction: ${TFD};
`;

//Font Set
export const fontSet = (FS: number = 13, FW: number = 400, LH: number) => css`
  font-size: ${FS}px;
  font-weight: ${FW};
  line-height: ${LH}px;
`;

//Background Set
export const backgroundSet = (url: string, size: string = 'cover') => css`
  background-image: url(${url});
  background-size: ${size};
  background-repeat: no-repeat;
  background-position: center center;
`;
