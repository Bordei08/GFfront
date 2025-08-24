import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Home as LucideHome, Settings as LucideSettings, User as LucideUser } from 'lucide-react-native';

import Base from '../screens/Base';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavTheme } from '../theme/navigation';

type TabsParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

type TabBarIconFn = NonNullable<BottomTabNavigationOptions['tabBarIcon']>;

function makeTabIcon(
  Icon: React.ComponentType<{ color?: string; size?: number }>
): TabBarIconFn {
  return ({ color, size }) => <Icon color={color} size={size} />;
}

const HomeTabIcon = makeTabIcon(LucideHome);
const SettingsTabIcon = makeTabIcon(LucideSettings);
const ProfileTabIcon = makeTabIcon(LucideUser);

export default function TabsNavigator() {
  const theme = useNavTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          borderRadius: 15,
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarItemStyle: { paddingVertical: 8 },
        tabBarIconStyle: { marginTop: 4 },
      }}
    >
      <Tab.Screen name="Home" component={Base} options={{ tabBarIcon: HomeTabIcon }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: SettingsTabIcon }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ProfileTabIcon }} />
    </Tab.Navigator>
  );
}
