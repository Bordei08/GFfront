import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorMode } from '../theme/useColorMode';
import { colors } from '../theme/colors';
import { spacing, font } from '../theme/tokens';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FollowersScreen() {
  const mode = useColorMode();

  const styles = React.useMemo(() => StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors[mode].bg },
    content: { flex: 1, padding: spacing(2), justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: font.xl, fontWeight: '700', color: colors[mode].text },
  }), [mode]);

  return (
    <SafeAreaView style={styles.safe} edges={['top','left','right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Followers</Text>
      </View>
    </SafeAreaView>
  );
}
