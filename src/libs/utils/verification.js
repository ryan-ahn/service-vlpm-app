/**
 * Author : Ryan
 * Date : 2022-07-30
 * Desc : verification
 */

// 정규식 체크

// 이메일
export const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 비번 영문 + 숫자 8자리 이상 (특수기호 가능)
export const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

// 한글,영어,숫자만 허용하는 정규식(공백허용:*)
export const NAME_REGEX = /^[가-힣a-zA-Z ]{2,4}$/;

// 휴대폰 (011 016 017 018 019는 중간이 3~4자리)
export const MOBILE_REGEX = /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/;

// 생년월일
export const BIRTH_REGEX = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

// 일반전화
export const PHONE_REGEX = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4])-?\d{3,4}-?\d{4}$/;

// url
export const IS_VALID_URL =
  /^(http|http(s)?:[/][/])?([\w-]+\.)+[\w-]+[.a-z]+(\[\?%&=]*)?\b([-a-zA-Z0-9ㄱ-ㅎㅏ가-힣()!@:;,%_\+.~#?&\/\/=\[\]]*)$/;
