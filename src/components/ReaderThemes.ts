export interface ReaderTheme {
  themeName: string;
  mainBgColor: string;
  mainTextColor: string;
  settingsBarBorderColor: string;
  settingsBarDividerColor: string;
  subTitleTextColor: string;
  settingsBarHoverColor: string;
  toolTipStyle: toolTipStyle;
  pageBackground: string;
}

interface toolTipStyle {
  bgColor: string;
  textColor: string;
}

const darkToolTipStyle: toolTipStyle = {
  bgColor: "black",
  textColor: "white",
};

const lightToolTipStyle: toolTipStyle = {
  bgColor: "white",
  textColor: "black",
};

const getPageBackground = (color: string) => {
  return `body { background: ${color} }`;
};

const light: ReaderTheme = {
  themeName: "白",
  mainBgColor: "white",
  mainTextColor: "black",
  settingsBarBorderColor: "blackAlpha.300",
  settingsBarDividerColor: "blackAlpha.500",
  subTitleTextColor: "blackAlpha.700",
  settingsBarHoverColor: "cyan.500",
  toolTipStyle: darkToolTipStyle,
  pageBackground: getPageBackground("#EDEDED"),
};

const black: ReaderTheme = {
  themeName: "黒",
  mainBgColor: "black",
  mainTextColor: "white",
  settingsBarBorderColor: "whiteAlpha.500",
  settingsBarDividerColor: "whiteAlpha.500",
  subTitleTextColor: "whiteAlpha.700",
  settingsBarHoverColor: "cyan",
  toolTipStyle: lightToolTipStyle,
  pageBackground: getPageBackground("#0F0F0F"),
};

const night: ReaderTheme = {
  themeName: "夜",
  mainBgColor: "#0C0D11",
  mainTextColor: "whiteAlpha.800",
  settingsBarBorderColor: "whiteAlpha.500",
  settingsBarDividerColor: "whiteAlpha.500",
  subTitleTextColor: "whiteAlpha.600",
  settingsBarHoverColor: "cyan",
  toolTipStyle: lightToolTipStyle,
  pageBackground: getPageBackground("#161820"),
};

const sepia: ReaderTheme = {
  themeName: "茶",
  mainBgColor: "#F6F5E8",
  mainTextColor: "#252422",
  settingsBarBorderColor: "blackAlpha.400",
  settingsBarDividerColor: "blackAlpha.500",
  subTitleTextColor: "blackAlpha.600",
  settingsBarHoverColor: "cyan.500",
  toolTipStyle: darkToolTipStyle,
  pageBackground: getPageBackground("#E3E2D5"),
};

const blue: ReaderTheme = {
  themeName: "水",
  mainBgColor: "#15384E",
  mainTextColor: "white",
  settingsBarBorderColor: "whiteAlpha.700",
  settingsBarDividerColor: "whiteAlpha.500",
  subTitleTextColor: "whiteAlpha.700",
  settingsBarHoverColor: "#00E4FF",
  toolTipStyle: lightToolTipStyle,
  pageBackground: getPageBackground("#1C4E6D"),
};

export const themes = {
  light: light,
  black: black,
  night: night,
  sepia: sepia,
  blue: blue,
};

export const myoucyouFont =
  '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif;';

export const gothicFont =
  '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';

export const enum readerModes {
  Tategumi = 1,
  Yokogumi,
}
