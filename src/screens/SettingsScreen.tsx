import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/buttons/LanguageToggle';
import ThemeSelector from '../components/buttons/ThemeSelector';
import { useColorMode } from '../theme/useColorMode';
import { colors } from '../theme/colors';
import { spacing, font } from '../theme/tokens';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const mode = useColorMode();

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors[mode].bg },
    content: { flex: 1, padding: spacing(2), gap: spacing(2) },
    title: { fontSize: font.xl, fontWeight: '700', color: colors[mode].text },
    row: { flexDirection: 'row', gap: spacing(2) },
  }), [mode]);

  return (
    <SafeAreaView style={styles.safe} edges={['top','left','right']}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('settings_title')}</Text>
        <View style={styles.row}>
          <LanguageSelector />
        </View>
        <View style={styles.row}>
          <ThemeSelector />
        </View>
      </View>
    </SafeAreaView>
  );
}
