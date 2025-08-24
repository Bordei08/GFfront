import React, { useEffect, useMemo } from 'react';
import '../i18n';
import 'intl-pluralrules'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  StyleSheet } from 'react-native';
import { store, persistor } from '../store';
import { useAppSelector } from '../store/hooks';
import i18n from '../i18n';


type Props = { children: React.ReactNode };

function LanguageSync({ children }: Props) {
  const lang = useAppSelector(s => s.ui.lang);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return <>{children}</>;
}

export default function AppProviders({ children }: Props) {

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider>
            <LanguageSync>{children}</LanguageSync>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
