import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootStackParamList } from './types';
import { RootState } from '../store/types';
import { checkAuth } from '../store/slices/authSlice';
import { View, ActivityIndicator } from 'react-native';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

// Import module navigators
import CaseManagementNavigator from '../app/caseManagement/navigation/CaseManagementNavigator';
import DocumentVaultNavigator from '../app/documentVault/navigation/DocumentVaultNavigator';
import TaskPlannerNavigator from '../app/taskPlanner/navigation/TaskPlannerNavigator';
import FinanceNavigator from '../app/finance/navigation/FinanceNavigator';
import MoreNavigator from '../app/more/navigation/MoreNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0073e6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="CaseManagement" component={CaseManagementNavigator} />
            <Stack.Screen name="DocumentVault" component={DocumentVaultNavigator} />
            <Stack.Screen name="TaskPlanner" component={TaskPlannerNavigator} />
            <Stack.Screen name="Finance" component={FinanceNavigator} />
            <Stack.Screen name="More" component={MoreNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
