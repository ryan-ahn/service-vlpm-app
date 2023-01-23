/**
 * Author : Ryan
 * Date : 2022-05-26
 * Desc : validation
 */

// 만단위에서 자르고 만원 붙이기
export const validationMillion = number => {
  const result =
    (number / 10000)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만원';
  return result;
};

export const validateCreateAt = string => {
  const date = string.split('T')[0];
  const time = string.split('T')[1];
  return date;
};

// 천원단위로 쉼표넣기
export const validateMeasureUp = money => {
  if (typeof money == 'string') {
    return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else if (typeof money == 'number') {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};

// 천원단위로 쉼표넣고 만원 붙이기
export const validateMeasureUp2 = money => {
  if (typeof money == 'string') {
    return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만원';
  } else if (typeof money == 'number') {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만원';
  }
  return '';
};

export const elapsedTime = date => {
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

export const leftTime = (time, interval) => {
  const createdAt = new Date(time);
  const expireDate = createdAt.setDate(createdAt.getDate() + (interval ?? 7));
  expireDate;
  var now = new Date().getTime();
  var timeleft = expireDate - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}일 ${hours}시간 ${minutes}분`;
};

// 남은 시간 계산
export const milliSecondsLastTime = milliSeconds => {
  const seconds = milliSeconds / 1000;
  if (seconds < 60) {
    return Math.floor(seconds) + '초 전';
  } else if (seconds >= 60 && seconds < 3600) {
    return Math.floor(seconds / 60) + '분 전';
  } else if (seconds >= 3600 && seconds < 86400) {
    return Math.floor(seconds / 3600) + '시간 전';
  } else if (seconds >= 86400 && seconds < 604800) {
    return Math.floor(seconds / 86400) + '일 전';
  } else {
    return '오래 전';
  }
};
