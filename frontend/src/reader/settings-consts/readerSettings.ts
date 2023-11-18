export const myoucyouFont =
  '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif;';
export const gothicFont =
  '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
export const defaultValueFont = 1;
export const fonts = [myoucyouFont, gothicFont];

export const enum readerModes {
  Tategumi = 1,
  Yokogumi,
}
export const defaultValueMode = readerModes.Tategumi;

export const defaultValueFontSize = 6;
export const fontSizes = [
  "13px",
  "15px",
  "16px",
  "17px",
  "20px",
  "23px",
  "26px",
];

export const defaultValueLineSpace = 6;
export const lineSpaces = [
  "125%",
  "140%",
  "155%",
  "170%",
  "185%",
  "200%",
  "215%",
];

export const defaultValueVMargin = 4;
export const vMargins = ["1vh", "3vh", "6vh", "8vh", "10vh", "13vh", "16vh"];

export const getNext = <T>(array: Array<T>, current: T): T => {
  let currentIndex = array.indexOf(current);
  const nextIndex =
    currentIndex + 1 <= array.length - 1 ? ++currentIndex : currentIndex;
  return array[nextIndex];
};

export const getPrev = <T>(array: Array<T>, current: T): T => {
  let currentIndex = array.indexOf(current);
  const prevIndex = currentIndex - 1 >= 0 ? --currentIndex : 0;
  return array[prevIndex];
};
