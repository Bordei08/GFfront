import React, { useMemo } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useColorMode } from '../theme/useColorMode';
import { colors } from '../theme/colors';
import { spacing, font } from '../theme/tokens';
import LanguageToggle from '../components/buttons/LanguageToggle';
import ThemeSelector from '../components/buttons/ThemeSelector';
import { useAppSelector } from '../store/hooks';

export default function Base() {
  const mode = useColorMode();
  const { t } = useTranslation();

  const pref = useAppSelector(s => s.ui.themeMode);
  const sysColor = useColorScheme();
  const effectiveDark =
    pref === 'system' ? sysColor === 'dark' : pref === 'dark';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: { flex: 1, backgroundColor: colors[mode].bg },
        content: {
          flex: 1,
          padding: spacing(2),
          gap: spacing(2),
          justifyContent: 'center',
        },
        title: {
          fontSize: font.xl,
          fontWeight: '600',
          color: colors[mode].text,
        },
        text: { color: colors[mode].subtext },
      }),
    [mode],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={effectiveDark ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>{t('base_title')}</Text>
        <Text style={styles.text}>{t('base_description')}</Text>
        <LanguageToggle />
        <ThemeSelector />
      </View>
    </SafeAreaView>
  );
}
