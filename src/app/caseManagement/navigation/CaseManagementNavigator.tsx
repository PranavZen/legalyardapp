import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CaseManagementStackParamList } from '../../../navigation/types';
import CaseListScreen from '../screens/CaseListScreen';
import CaseDetailScreen from '../screens/CaseDetailScreen';
import CaseFormScreen from '../screens/CaseFormScreen';
import CaseNotesScreen from '../screens/CaseNotesScreen';

const Stack = createStackNavigator<CaseManagementStackParamList>();

const CaseManagementNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen name="CaseList" component={CaseListScreen} options={{ title: 'Cases' }} />
      <Stack.Screen name="CaseDetail" component={CaseDetailScreen} options={{ title: 'Case Details' }} />
      <Stack.Screen name="CaseForm" component={CaseFormScreen} options={{ title: 'Case Form' }} />
      <Stack.Screen name="CaseNotes" component={CaseNotesScreen} options={{ title: 'Case Notes' }} />
    </Stack.Navigator>
  );
};

export default CaseManagementNavigator;
