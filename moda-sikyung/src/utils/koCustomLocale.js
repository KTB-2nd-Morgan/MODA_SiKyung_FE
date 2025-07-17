import ko from 'date-fns/locale/ko';

const koCustomLocale = {
  ...ko,
  formatLong: {
    ...ko.formatLong,
    date: () => 'yyyy년 M월 d일',      // 기본: M월 d일 yyyy
    time: () => 'a h시 mm분',
    dateTime: () => 'yyyy년 M월 d일 a h시 mm분',
  },
};

export default koCustomLocale;