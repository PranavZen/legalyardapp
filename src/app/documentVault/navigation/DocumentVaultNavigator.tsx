import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DocumentVaultStackParamList } from '../../../navigation/types';
import DocumentListScreen from '../screens/DocumentListScreen';
import DocumentDetailScreen from '../screens/DocumentDetailScreen';
import DocumentFormScreen from '../screens/DocumentFormScreen';
import DocumentShareScreen from '../screens/DocumentShareScreen';

const Stack = createStackNavigator<DocumentVaultStackParamList>();

const DocumentVaultNavigator = () => {
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
      <Stack.Screen name="DocumentList" component={DocumentListScreen} options={{ title: 'Documents' }} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} options={{ title: 'Document Details' }} />
      <Stack.Screen name="DocumentForm" component={DocumentFormScreen} options={{ title: 'Document Form' }} />
      <Stack.Screen name="DocumentShare" component={DocumentShareScreen} options={{ title: 'Share Document' }} />
    </Stack.Navigator>
  );
};

export default DocumentVaultNavigator;
