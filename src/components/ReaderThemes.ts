export interface ReaderTheme {
  themeName: string;
  mainBgColor: string;
  mainTextColor: string;
  settingsBarBorderColor: string;
  subTitleTextColor: string;
  settingsBarHoverColor: string;
}

const light: ReaderTheme = {
  themeName: "白",
  mainBgColor: "white",
  mainTextColor: "black",
  settingsBarBorderColor: "blackAlpha.300",
  subTitleTextColor: "blackAlpha.700",
  settingsBarHoverColor: "cyan.500",
};

const black: ReaderTheme = {
  themeName: "黒",
  mainBgColor: "black",
  mainTextColor: "white",
  settingsBarBorderColor: "whiteAlpha.500",
  subTitleTextColor: "whiteAlpha.700",
  settingsBarHoverColor: "cyan",
};

const night: ReaderTheme = {
  themeName: "夜",
  mainBgColor: "#0C0D11",
  mainTextColor: "whiteAlpha.800",
  settingsBarBorderColor: "whiteAlpha.500",
  subTitleTextColor: "whiteAlpha.600",
  settingsBarHoverColor: "cyan",
};

const sepia: ReaderTheme = {
  themeName: "茶",
  mainBgColor: "#F6F5E8",
  mainTextColor: "#252422",
  settingsBarBorderColor: "blackAlpha.400",
  subTitleTextColor: "blackAlpha.600",
  settingsBarHoverColor: "cyan.500",
};

const blue: ReaderTheme = {
  themeName: "水",
  mainBgColor: "#15384E",
  mainTextColor: "white",
  settingsBarBorderColor: "whiteAlpha.700",
  subTitleTextColor: "whiteAlpha.700",
  settingsBarHoverColor: "#00E4FF",
};

export const themes = {
  light: light,
  black: black,
  night: night,
  sepia: sepia,
  blue: blue,
};
