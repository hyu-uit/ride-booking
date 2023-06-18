import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CUSTOMFONT_BOLD = "MerriweatherSans-Bold";
const CUSTOMFONT_EXTRA_BOLD = "MerriweatherSans-ExtraBold";
const CUSTOMFONT_BOLD_ITALIC = "MerriweatherSans-BoldItalic";
const CUSTOMFONT_EXTRA_BOLD_ITALIC = "MerriweatherSans-ExtraBoldItalic";
const CUSTOMFONT_ITALIC = "MerriweatherSans-Italic";
const CUSTOMFONT_LIGHT = "MerriweatherSans-Light";
const CUSTOMFONT_LIGHT_IATLIC = "MerriweatherSans-LightItalic";
const CUSTOMFONT_MEDIUM = "MerriweatherSans-Medium";
const CUSTOMFONT_MEDIUM_ITALIC = "MerriweatherSans-MeidumItalic";
const CUSTOMFONT_REGULAR = "MerriweatherSans-Regular";
const CUSTOMFONT_SEMI_BOLD = "MerriweatherSans-SemiBold";
const CUSTOMFONT_SEMI_BOLD_ITALIC = "MerriweatherSans-SemiBoldItalic";

export const COLORS = {
  primary: "#3D5AF8",
  secondary: "#3D5BF8",
  tertiary: "#101744",
  fourthary: "#125CAE",
  fifthary: "#8CC3FF",
  white: "#ffffff",
  black: "#000000",
  background: "#0B0F2F",
  lightWhite: "#F8F8F8",
  grey: "#808080",
  lightGrey: "#D3D3D3",
  red: "#E95454",

  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
};

export const SIZES = {
  //global sizes
  base: 8,
  font: 14,
  radius: 20,
  radius10: 10,
  radius50: (width * 0.5 * 50) / 100,
  padding: 10,
  small: 24,
  big: 32,

  //font sizes
  large: 40,
  small: 24,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 13,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 13,
  body6: 12,

  //app dimentions
  width,
  height,
};

export const FONTS = {
  large: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.large,
    lineHeight: 40,
  },
  small: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.small,
    lineHeight: 22,
  },

  //headings
  h1: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontWeight: "bold",
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h2,
    fontWeight: "bold",
    lineHeight: 30,
  },
  h3: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h3,
    fontWeight: "bold",
    lineHeight: 22,
  },
  h4: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h4,
    fontWeight: "bold",
    lineHeight: 22,
  },
  h5: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h5,
    fontWeight: "bold",
    lineHeight: 22,
  },
  h6: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h6,
    fontWeight: "bold",
    lineHeight: 22,
  },

  //body
  body1: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  body6: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body6,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
