import React, { memo, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorMode } from '../../theme/useColorMode';
import { colors } from '../../theme/colors';
import PlusIcon from '../../../assets/svg/plus.svg';

/**
 * A branded call-to-action to create a new fishing trip.
 *
 * - Icon-only `compact` mode fits headers and toolbars.
 * - Label mode shows a descriptive text next to the icon.
 * - Optimized to avoid unnecessary re-renders (memoized + light dynamic styles).
 *
 * @example
 * // Header (icon only)
 * <AddFishingTripButton compact onPress={onAdd} />
 *
 * @example
 * // In content (with text)
 * <AddFishingTripButton
 *   size="lg"
 *   label="Add a new fishing trip"
 *   onPress={onAdd}
 * />
 */
export type AddFishingTripButtonProps = {
  /** Called when the button is pressed. */
  onPress: () => void;
  /**
   * Visible label next to the icon.
   * If omitted and `compact=false`, a default i18n string will be used.
   */
  label?: string;
  /** Visual size of the control. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Icon-only version (ideal for headers). @default false */
  compact?: boolean;
  /** Disable interactions and dim the control. */
  disabled?: boolean;
  /** Show a loading spinner and block presses. @default false */
  loading?: boolean;
  /** Override the default plus icon. */
  icon?: React.ReactNode;
  /** Root container style override. */
  style?: StyleProp<ViewStyle>;
  /** Position of the icon relative to the label. @default 'left' */
  iconPosition?: 'left' | 'right';
  /** Test identifier for E2E tests. */
  testID?: string;
  /** Accessibility label announced by screen readers. */
  accessibilityLabel?: string;
};

const SIZE_MAP = {
  sm: { circle: 32, plus: 16, ring: 2, padV: 6, padH: 10, gap: 8, radius: 12, font: 16 },
  md: { circle: 40, plus: 20, ring: 3, padV: 8, padH: 12, gap: 10, radius: 14, font: 18 },
  lg: { circle: 48, plus: 24, ring: 3, padV: 10, padH: 14, gap: 12, radius: 16, font: 20 },
} as const;

function AddFishingTripButtonImpl({
  onPress,
  label,
  size = 'md',
  compact = false,
  disabled,
  loading = false,
  icon,
  style,
  iconPosition = 'left',
  testID = 'add-fishing-trip',
  accessibilityLabel,
}: AddFishingTripButtonProps) {
  const mode = useColorMode();
  const { t } = useTranslation();
  const S = SIZE_MAP[size];

  const palette = useMemo(
    () => ({
      text: colors[mode].text,
      border: colors[mode].border,
      card: colors[mode].card,
      gold: colors[mode].brandGold, // #F2B31F
      blue: colors[mode].brandBlue, // #7ED0EC
    }),
    [mode],
  );

  const base = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: palette.card,
          paddingVertical: S.padV,
          paddingHorizontal: compact ? Math.max(8, S.padH - 4) : S.padH,
          borderRadius: S.radius,
          gap: compact ? 0 : S.gap,
          borderWidth: 1,
          borderColor: palette.border,
          minHeight: 44, // touch target
        },
        pressed: { transform: [{ scale: 0.98 }], opacity: 0.95 },
        disabled: { opacity: 0.5 },
        iconWrap: {
          width: S.circle,
          height: S.circle,
          borderRadius: S.circle / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: palette.blue,
          borderWidth: S.ring,
          borderColor: palette.gold,
        },
        text: {
          fontSize: S.font,
          fontWeight: '600',
          color: palette.text,
        },
        // small visual lift on light mode; Android uses elevation automatically
        shadow: {
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        },
      }),
    [S, palette, compact],
  );

  const finalLabel =
    label ?? t('add_fishing_trip', 'Add a new fishing trip');

  const IconNode =
    icon ?? (
      <PlusIcon
        width={S.plus}
        height={S.plus}
        fill={palette.gold}
        stroke={palette.gold}
      />
    );

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? finalLabel}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        base.container,
        base.shadow,
        style,
        pressed && !disabled && !loading ? base.pressed : null,
        disabled || loading ? base.disabled : null,
      ]}
      hitSlop={compact ? 8 : 0}
    >
      {iconPosition === 'left' && (
        <View style={base.iconWrap}>{loading ? <ActivityIndicator /> : IconNode}</View>
      )}

      {!compact && (
        <Text style={base.text} numberOfLines={1}>
          {finalLabel}
        </Text>
      )}

      {iconPosition === 'right' && (
        <View style={base.iconWrap}>{loading ? <ActivityIndicator /> : IconNode}</View>
      )}
    </Pressable>
  );
}

const AddFishingTripButton = memo(AddFishingTripButtonImpl);
AddFishingTripButton.displayName = 'AddFishingTripButton';

export default AddFishingTripButton;
