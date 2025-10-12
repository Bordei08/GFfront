import React from "react";
import { Platform, StatusBar, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorMode } from "../../theme/useColorMode";
import { colors } from "../../theme/colors";

type Props = {
  /** Override explicit pentru culoarea de fundal a status bar-ului */
  backgroundColor?: string;
  /** Forțează iconițe deschise/închise; by default derivă din temă */
  lightContent?: boolean;
};

const TopStatusBarPad: React.FC<Props> = ({ backgroundColor, lightContent }) => {
  const mode = useColorMode();
  const bg = backgroundColor ?? colors[mode].card;
  const barStyle: "light-content" | "dark-content" =
    lightContent !== undefined
      ? (lightContent ? "light-content" : "dark-content")
      : mode === "dark"
      ? "light-content"
      : "dark-content";

  if (Platform.OS === "android") {
    // StatusBar opac, culoare setată din JS (asigură-te că ai WindowCompat.setDecorFitsSystemWindows(window, true) în MainActivity)
    return (
      <StatusBar
        translucent={true}
        backgroundColor={bg}
        barStyle={barStyle}
      />
    );
  }

  // iOS: StatusBar e transparent; colorăm doar safe area top
  return (
    <>
      <StatusBar barStyle={barStyle} />
      <SafeAreaView edges={["top"]} style={[styles.pad, { backgroundColor: bg } as ViewStyle]} />
    </>
  );
};

const styles = StyleSheet.create({
  pad: {
    // doar vopsim zona de sus pe iOS
  },
});

export default TopStatusBarPad;
