import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const CUSTOMFONT_REGULAR = 'ProducSans-Regular';
const CUSTOMFONT_BOLD = 'ProducSans-Bold';
const CUSTOMFONT_BLACK = 'ProducSans-Black';

export const COLORS = {
    default: '#FFFFFF',
    red: '#a23'
}

export const SIZES = {
    //global sizes
    base: 8,
    font: 14,
    radius: 20,
    padding: 30,
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

    //app dimentions
    width,
    height,
}

export const FONTS = {
    large: {fontFamily: CUSTOMFONT_REGULAR, fontSize: SIZES.large, lineHeight: '40px'}
}

const appTheme = {COLORS, SIZES, FONTS}

export default appTheme;