import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Base from "../screens/Base";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import { useNavTheme } from "../theme/navigation";
import { TabsParamList } from "./types";

// SVG-uri
import BaseFish from "../../assets/svg/base_fish.svg";
import BaseFisher from "../../assets/svg/base_fisher.svg";
import BaseSettings from "../../assets/svg/base_settings.svg";
import BaseFollowers from "../../assets/svg/base_binocular.svg";

// helper
import { createTabBarIcon } from "../components/icons/createTabBarIcon";

const Tab = createBottomTabNavigator<TabsParamList>();

const HomeTabIcon      = createTabBarIcon(BaseFish,      51);
const FollowersTabIcon = createTabBarIcon(BaseFollowers, 51);
const SettingsTabIcon  = createTabBarIcon(BaseSettings,  45);
const ProfileTabIcon   = createTabBarIcon(BaseFisher,    47);

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
          borderRadius: 14,
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          height: '12%',            
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarItemStyle: { paddingVertical: 4 },
        tabBarIconStyle: { marginTop: 2 },
      }}
    >
      <Tab.Screen name="Home"      component={Base}           options={{ tabBarIcon: HomeTabIcon }} />
      <Tab.Screen name="Followers" component={FollowersScreen} options={{ tabBarIcon: FollowersTabIcon }} />
      <Tab.Screen name="Settings"  component={SettingsScreen}  options={{ tabBarIcon: SettingsTabIcon }} />
      <Tab.Screen name="Profile"   component={ProfileScreen}   options={{ tabBarIcon: ProfileTabIcon }} />
    </Tab.Navigator>
  );
}
