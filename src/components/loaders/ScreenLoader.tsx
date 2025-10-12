import React from "react";
import { View, Image, StyleSheet, ImageStyle, ImageSourcePropType } from "react-native";

type Props = {
  visible: boolean;
  logo?: ImageSourcePropType;
  size?: number;
  backgroundColor?: string;
  zIndex?: number;
};

const ScreenLoader: React.FC<Props> = ({
  visible,
  logo = require("../../../assets/images/bootsplash_logo.png"),
  size = 206,
  backgroundColor = "#000",
  zIndex = 100,
}) => {
  if (!visible) return null;

  const imageSizeStyle: ImageStyle = { width: size, height: size };

  return (
    <View style={[styles.overlay, { backgroundColor, zIndex }]}>
      <Image source={logo} style={[styles.logo, imageSizeStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
  },
});

export default ScreenLoader;
