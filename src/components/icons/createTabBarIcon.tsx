import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Options = {
  underlineWidthPct?: number; // 0..1 din lățimea iconului
  underlineHeight?: number; // grosimea liniei (px)
  underlineOffset?: number; // distanța sub icon (px)
  rounded?: boolean; // colțuri rotunjite
};

export function createTabBarIcon(
  SvgComponent: React.ComponentType<SvgProps>,
  fixedSize: number,
  opts?: Options,
) {
  const {
    underlineWidthPct = 0.85,
    underlineHeight = 3,
    underlineOffset = 6,
    rounded = true,
  } = opts || {};

  const containerWH = {
    width: fixedSize,
    height: fixedSize + underlineOffset + underlineHeight,
  };
  const underlineStatic = {
    width: Math.max(8, Math.round(fixedSize * underlineWidthPct)),
    height: underlineHeight,
    marginTop: underlineOffset,
    borderRadius: rounded ? underlineHeight : 0,
  };

  return function TabBarIcon({
    color,
    focused,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }): React.ReactNode {
    const dyn = React.useMemo(
      () =>
        StyleSheet.create({
          container: containerWH,
          underline: {
            ...underlineStatic,
            backgroundColor: color,
          },
        }),
      [color],
    );

    const containerStyle: StyleProp<ViewStyle> = React.useMemo(
      () => StyleSheet.compose(styles.wrap, dyn.container),
      [dyn.container],
    );

    return (
      <View style={containerStyle} pointerEvents="none">
        <SvgComponent
          width={fixedSize}
          height={fixedSize}
          {...(color ? { fill: color, stroke: color } : {})}
          focusable={false}
          accessibilityRole="image"
        />
        {focused ? (
          <View
            style={StyleSheet.compose(styles.underlineBase, dyn.underline)}
          />
        ) : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  underlineBase: {
    alignSelf: 'center',
  },
});
