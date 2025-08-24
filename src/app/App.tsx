import React, { useEffect } from 'react';
import AppProviders from './AppProviders';
import RootNavigator from '../navigation/RootNavigator';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
