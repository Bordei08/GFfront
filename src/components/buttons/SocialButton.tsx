import React from 'react';
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  icon: ImageSourcePropType;
  text: string;
  onPress?: () => void;
  backgroundColorLight: string;
  backgroundColorDark: string;
  textColorLight: string;
  textColorDark: string;
  style?: ViewStyle;
};

const SocialButton: React.FC<Props> = ({
  icon,
  text,
  onPress,
  backgroundColorLight,
  backgroundColorDark,
  textColorLight,
  textColorDark,
  style,
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const backgroundColor = isDark ? backgroundColorDark : backgroundColorLight;
  const textColor = isDark ? textColorDark : textColorLight;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.9 : 1 },
        style,
      ]}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
  },
});

export default SocialButton;
