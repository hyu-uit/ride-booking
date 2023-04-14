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
  primary: "#194AF9",
  secondary: "#3E3F43",
  tertiary: "#133AC5",
  fourthary: "#0E5EF5",
  white: "#ffffff",
  black: "#000000",
  background: "#26272D",
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
  radius: 20 + "px",
  padding: 10 + "px",
  small: 24 + "px",
  big: 32 + "px",

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
    lineHeight: "40px",
  },
  small: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.small,
    lineHeight: "22px",
  },

  //headings
  h1: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontWeight: "bold",
    fontSize: SIZES.h1 + "px",
    lineHeight: "36px",
  },
  h2: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h2 + "px",
    fontWeight: "bold",
    lineHeight: "30px",
  },
  h3: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h3 + "px",
    fontWeight: "bold",
    lineHeight: "22px",
  },
  h4: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h4 + "px",
    fontWeight: "bold",
    lineHeight: "22px",
  },
  h5: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h5 + "px",
    fontWeight: "bold",
    lineHeight: "22px",
  },
  h6: {
    fontFamily: CUSTOMFONT_EXTRA_BOLD,
    fontSize: SIZES.h6 + "px",
    fontWeight: "bold",
    lineHeight: "22px",
  },

  //body
  body1: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body1 + "px",
    lineHeight: "36px",
  },
  body2: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body2 + "px",
    lineHeight: "30px",
  },
  body3: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body3 + "px",
    lineHeight: "22px",
  },
  body4: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body4 + "px",
    lineHeight: "22px",
  },
  body5: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body5 + "px",
    lineHeight: "22px",
  },
  body6: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: SIZES.body6 + "px",
    lineHeight: "22px",
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
