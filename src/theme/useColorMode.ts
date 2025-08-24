import { useColorScheme } from 'react-native';
import { useAppSelector } from '../store/hooks';

export function useColorMode(): 'light' | 'dark' {
  const pref = useAppSelector(state => state.ui.themeMode);
  const sys = useColorScheme();
  if (pref === 'system') return sys === 'dark' ? 'dark' : 'light';
  return pref;
}
