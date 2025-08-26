import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import LoginBackgroundVideo from '../components/LoginBackgroundVideo';
import SocialButton from '../components/buttons/SocialButton';
import LanguageSelector from '../components/buttons/LanguageToggle';
import appConfig from '../../app.json';


const SHOW_GOOGLE_ON_IOS = false;
const SHOW_FACEBOOK_ON_IOS = true;

type LoginNav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const mode: 'light' | 'dark' = scheme === 'dark' ? 'dark' : 'light';
  const c = colors[mode];
  const T = themedStyles(c);
  const appName = appConfig.displayName;
  const navigation = useNavigation<LoginNav>();

  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  const handleLogin = () => {
    navigation.replace('Tabs');
  };

  return (
    <View style={base.root}>
      <LoginBackgroundVideo>
        {/* butonul de schimbare limbă */}
        <View style={base.langWrap}>
          <LanguageSelector />
        </View>

        <View style={base.container}>
          <View style={[base.card, T.cardBg, T.cardBorder, base.shadow]}>
            {/* Header logo + titel */}
            <View style={base.header}>
              <View style={[base.logoWrap]}>
                <Image
                  source={require('../../assets/images/bootsplash_logo.png')}
                  style={base.logo}
                  accessibilityIgnoresInvertColors
                />
              </View>
              <Text style={[base.title, T.titleText]} numberOfLines={1}>
                {t('welcome')}
              </Text>
              <Text style={[base.subtitle, T.subText]} numberOfLines={2}>
                {t('subtitle', { app: appName })}
              </Text>
            </View>

            {/* --- Social buttons --- */}
            {isIOS && (
              <SocialButton
                icon={require('../../assets/auth/apple.png')}
                text={t('continue_apple')}
                onPress={() => {
                  handleLogin();
                }}
                backgroundColorLight="#000000"
                backgroundColorDark="#000000"
                textColorLight="#FFFFFF"
                textColorDark="#FFFFFF"
              />
            )}

            {(isAndroid || SHOW_FACEBOOK_ON_IOS) && (
              <SocialButton
                icon={require('../../assets/auth/facebook.png')}
                text={t('continue_facebook')}
                onPress={() => {
                  handleLogin();
                }}
                backgroundColorLight="#1877F2"
                backgroundColorDark="#1877F2"
                textColorLight="#FFFFFF"
                textColorDark="#FFFFFF"
              />
            )}

            {(isAndroid || SHOW_GOOGLE_ON_IOS) && (
              <SocialButton
                icon={require('../../assets/auth/google.png')}
                text={t('continue_google')}
                onPress={() => {
                  handleLogin();
                }}
                backgroundColorLight="#FFFFFF"
                backgroundColorDark="#000000"
                textColorLight="#000000"
                textColorDark="#FFFFFF"
              />
            )}

            <Pressable
              style={base.termsRow}
              onPress={() => Linking.openURL('https://example.com/terms')}
            >
              <Feather name="external-link" size={16} color={c.subtext} />
              <Text style={[base.terms, T.subText]}>{t('terms')}</Text>
            </Pressable>
          </View>

          <Text style={[base.footer]}>
            {t('copyright', { year: new Date().getFullYear(), app: appName })}
          </Text>
        </View>
      </LoginBackgroundVideo>
    </View>
  );
};

const base = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },

  card: { borderRadius: 20, padding: 20, borderWidth: 1 },
  shadow: Platform.select({
    android: { elevation: 4 },
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
  }) as any,

  header: { alignItems: 'center', marginBottom: 18 },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#000000',
    borderColor: '#222222',
  },
  logo: { width: 46, height: 46, resizeMode: 'contain' },

  title: { fontSize: 21, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginTop: 4 },

  termsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 12,
    marginBottom: 12,
    opacity: 0.95,
    color: '#DDDD',
  },

  langWrap: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40, // un pic mai jos decât status bar
    right: 20,
    zIndex: 10,
  },
});

const themedStyles = (c: typeof colors.light | typeof colors.dark) =>
  StyleSheet.create({
    cardBg: { backgroundColor: c.card },
    cardBorder: { borderColor: c.border },
    subText: { color: c.subtext },
    titleText: { color: c.text },
    logoWrapBg: { backgroundColor: c.bg },
    logoWrapBorder: { borderColor: c.border },
  });

export default LoginScreen;
