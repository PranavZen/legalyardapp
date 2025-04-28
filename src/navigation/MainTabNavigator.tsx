import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainTabParamList } from './types';
import { View, Text } from 'react-native';

// Import navigators
import CaseManagementNavigator from '../app/caseManagement/navigation/CaseManagementNavigator';
import DocumentVaultNavigator from '../app/documentVault/navigation/DocumentVaultNavigator';
import TaskPlannerNavigator from '../app/taskPlanner/navigation/TaskPlannerNavigator';
import FinanceNavigator from '../app/finance/navigation/FinanceNavigator';
import MoreNavigator from '../app/more/navigation/MoreNavigator';

// Placeholder screen
const DashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard';
          } else if (route.name === 'Cases') {
            iconName = 'briefcase';
          } else if (route.name === 'Documents') {
            iconName = 'file-document';
          } else if (route.name === 'Tasks') {
            iconName = 'checkbox-marked-circle';
          } else if (route.name === 'Finance') {
            iconName = 'currency-usd';
          } else if (route.name === 'More') {
            iconName = 'dots-horizontal';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray[200],
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Cases" component={CaseManagementNavigator} />
      <Tab.Screen name="Documents" component={DocumentVaultNavigator} />
      <Tab.Screen name="Tasks" component={TaskPlannerNavigator} />
      <Tab.Screen name="Finance" component={FinanceNavigator} />
      <Tab.Screen name="More" component={MoreNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
