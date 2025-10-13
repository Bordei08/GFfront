import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet, Platform, Pressable } from "react-native";
import { useColorMode } from "../../theme/useColorMode";
import { colors } from "../../theme/colors";

type Props = {
  title?: string;
  rightContent?: React.ReactNode;    
  onLogoPress?: () => void;           
  showBottomBorder?: boolean;        
};

const MainHeader: React.FC<Props> = ({
  title,
  rightContent,
  onLogoPress,
  showBottomBorder = true,
}) => {
  const mode = useColorMode();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: colors[mode].card,
          ...(showBottomBorder
            ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors[mode].border }
            : null),
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
            },
            android: { elevation: 2 },
          }),
        },
        logoWrap: {
          width: 36,
          height: 36,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors[mode].brandBlue, // păstrează look-ul logo-ului tău actual
          marginRight: 12,
          overflow: "hidden",
        },
        logo: {
          width: 22,
          height: 22,
          resizeMode: "contain",
          backgroundColor : colors[mode].brandBlue
        },
        title: {
          flexShrink: 1,
          fontSize: 18,
          fontWeight: "700",
          color: colors[mode].text,
        },
        spacer: { flex: 1 },
        right: { marginLeft: 12, alignItems: "center", justifyContent: "center" },
      }),
    [mode, showBottomBorder]
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={onLogoPress} disabled={!onLogoPress} style={styles.logoWrap}>
        <Image
          source={require("../../../assets/images/bootsplash_logo.png")}
          style={styles.logo}
          accessibilityIgnoresInvertColors
        />
      </Pressable>

      {title ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : null}

      <View style={styles.spacer} />

      {rightContent ? <View style={styles.right}>{rightContent}</View> : null}
    </View>
  );
};

export default MainHeader;
