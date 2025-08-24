import React, { useMemo } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setThemeMode, ThemeMode } from '../../store/slices/uiSlice';
import { useColorMode } from '../../theme/useColorMode';
import { colors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';

type Option = { code: ThemeMode; emoji: string; labelKey: string };

const options: Option[] = [
  { code: 'system', emoji: '🖥️', labelKey: 'theme_system' },
  { code: 'light', emoji: '🌞', labelKey: 'theme_light' },
  { code: 'dark', emoji: '🌙', labelKey: 'theme_dark' },
];

export default function ThemeSelector() {
  const mode = useColorMode();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          flexDirection: 'row',
          alignSelf: 'flex-start',
          gap: 12,
          padding: 4,
          borderRadius: 12,
          backgroundColor: colors[mode].card,
          borderWidth: 1,
          borderColor: colors[mode].border,
        },
      }),
    [mode],
  );

  return (
    <View style={styles.wrap}>
      {options.map(o => (
        <Chip key={o.code} opt={o} mode={mode} />
      ))}
    </View>
  );
}

const Chip = ({ opt, mode }: { opt: Option; mode: 'light' | 'dark' }) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(s => s.ui.themeMode);
  const active = current === opt.code;
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        chip: {
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 44,
        },
        active: {
          backgroundColor: colors[mode].bg,
          borderWidth: 1,
          borderColor: colors[mode].border,
        },
        emoji: { fontSize: 20, lineHeight: 20 },
        text: {
          fontSize: 12,
          color: colors[mode].text,
          fontWeight: '600',
          marginTop: 4,
        },
        textMuted: {
          fontSize: 12,
          color: colors[mode].subtext,
          fontWeight: '600',
          marginTop: 4,
        },
      }),
    [mode],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={t(opt.labelKey)}
      onPress={() => dispatch(setThemeMode(opt.code))}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={styles.emoji}>{opt.emoji}</Text>
      <Text style={active ? styles.text : styles.textMuted}>
        {t(opt.labelKey)}
      </Text>
    </Pressable>
  );
};
