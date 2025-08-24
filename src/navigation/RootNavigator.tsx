import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import TabsNavigator from './TabsNavigator';
import { useNavTheme } from '../theme/navigation';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const navTheme = useNavTheme();

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
