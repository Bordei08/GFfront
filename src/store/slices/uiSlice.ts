import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Lang = 'ro' | 'en';

interface UIState {
  themeMode: ThemeMode;
  lang: Lang;
}

const initialState: UIState = {
  themeMode: 'system',
  lang: 'ro',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
    },
  },
});

export const { setThemeMode, setLang } = uiSlice.actions;
export default uiSlice.reducer;
