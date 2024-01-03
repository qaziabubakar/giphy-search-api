import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTheme, darkTheme, brownTheme } from '../../theme/colors';
import { robotoFont, openSansFont } from '../../theme/typography';

const themes = {
    default: defaultTheme,
    dark: darkTheme,
    brown: brownTheme,
};

const fontFamily = {
    roboto: robotoFont,
    openSans: openSansFont,
};

type ThemeName = keyof typeof themes;
type FontFamilyName = keyof typeof fontFamily;
type ColorName = keyof typeof defaultTheme | keyof typeof darkTheme | keyof typeof brownTheme;
type FontName = keyof typeof robotoFont | keyof typeof openSansFont;


interface ThemeState {
    usedTheme: ThemeName;
    usedFontFamily: FontFamilyName;
    usedColors?: { [key in ColorName]: string };
    usedFonts?: { [key in FontName]: string };
}

const initialState: ThemeState = {
    usedTheme: 'default',
    usedFontFamily: 'roboto',
    usedColors: themes.default,
    usedFonts: fontFamily.roboto,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeName>) => {
            if (action.payload in themes) {
                state.usedTheme = action.payload;
            } else {
                console.error(`Invalid theme name: ${action.payload}`);
            }
        },
        setFontFamily: (state, action: PayloadAction<FontFamilyName>) => {
            if (action.payload in fontFamily) {
                state.usedFontFamily = action.payload;
            } else {
                console.error(`Invalid font family name: ${action.payload}`);
            }
        },
    },
});

export const { setTheme, setFontFamily } = themeSlice.actions;
export default themeSlice.reducer;
