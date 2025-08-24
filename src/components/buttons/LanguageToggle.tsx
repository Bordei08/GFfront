import React, { useMemo } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLang } from '../../store/slices/uiSlice';
import { useColorMode } from '../../theme/useColorMode';
import { colors } from '../../theme/colors';

export default function LanguageSelector() {
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
      <FlagButton code="en" emoji="🇬🇧" mode={mode} />
      <FlagButton code="ro" emoji="🇷🇴" mode={mode} />
    </View>
  );
}

const FlagButton = ({
  code,
  emoji,
  mode,
}: {
  code: 'ro' | 'en';
  emoji: string;
  mode: 'dark' | 'light';
}) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(s => s.ui.lang); // 'ro' | 'en'
  const active = current === code;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        flagBtn: {
          padding: 8,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        active: {
          backgroundColor: colors[mode].bg,
          borderWidth: 1,
          borderColor: colors[mode].border,
        },
        flag: { fontSize: 24 },
      }),
    [mode],
  );
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={() => dispatch(setLang(code))}
      style={[styles.flagBtn, active && styles.active]}
    >
      <Text style={styles.flag}>{emoji}</Text>
    </Pressable>
  );
};
