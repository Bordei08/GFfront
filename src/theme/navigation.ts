import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import { colors } from './colors';
import { useColorMode } from './useColorMode';

export function useNavTheme(): NavTheme {
  const mode = useColorMode();
  const base = mode === 'dark' ? DarkTheme : DefaultTheme;
  const c = colors[mode];
  return {
    ...base,
    colors: {
      ...base.colors,
      background: c.bg,
      card: c.card,
      text: c.text,
      border: c.border,
      primary: c.primary,
    },
  };
}
