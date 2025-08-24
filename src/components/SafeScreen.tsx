import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useColorMode } from '../theme/useColorMode';
import { spacing } from '../theme/tokens';

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const mode = useColorMode();
  const styles = useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors[mode].bg },
    content: { flex: 1, padding: spacing(2) },
  }), [mode]);

  return (
    <SafeAreaView style={styles.safe} edges={['top','left','right']}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}
