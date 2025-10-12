import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useColorMode } from '../theme/useColorMode';
import { colors } from '../theme/colors';
import { spacing, font } from '../theme/tokens';
import LanguageToggle from '../components/buttons/LanguageToggle';
import ThemeSelector from '../components/buttons/ThemeSelector';
import BaseFish from './../../assets/svg/base_fish.svg';
import MainHeader from '../components/headers/MainHeader';
import AddFishingTripButton from '../components/buttons/AddFishingTripButton';
// import TopStatusBarPad from '../components/layout/TopStatusBarPad'; // nu mai e nevoie

export default function Base() {
  const mode = useColorMode();
  const { t } = useTranslation();

  const onAdd = useCallback(() => {
    // TODO: navighează sau execută acțiunea dorită
    // ex: navigation.navigate('CreateSomething');
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: { flex: 1, backgroundColor: colors[mode].bg },
        content: {
          flex: 1,
          padding: spacing(2),
          gap: spacing(2),
          justifyContent: 'center',
          backgroundColor: colors[mode].bg,
        },
        title: {
          fontSize: font.xl,
          fontWeight: '600',
          color: colors[mode].text,
        },
        text: { color: colors[mode].subtext },
        headerIconWrap: {
          padding: spacing(1),         // crește zona de touch
          borderRadius: 9999,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 40,                 // țintă de touch ~40–44px
          minHeight: 40,
        },
      }),
    [mode],
  );

  const RightHeader = (
    <Pressable
      onPress={onAdd}
      hitSlop={8}
      style={styles.headerIconWrap}
      accessibilityRole="button"
      accessibilityLabel={t('add', 'Add')}
      testID="header-add"
    >
      {/* unele SVG-uri folosesc stroke, altele fill—le setăm pe ambele */}
      <AddFishingTripButton 
      onPress={() => {}}
      label= {t("fishingTripButton")}
      size='md'
      compact
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* TopStatusBarPad scos ca să nu dubleze spațiul de sus */}
      <MainHeader title={t('app_title', 'Golden Fish')} rightContent={RightHeader} />
      <View style={styles.content}>
        <Text style={styles.title}>{t('base_title')}</Text>
        <Text style={styles.text}>{t('base_description')}</Text>
        <LanguageToggle />
        <ThemeSelector />
        <BaseFish width={120} height={120} fill={colors[mode].primary ?? 'blue'} />
      </View>
    </SafeAreaView>
  );
}
