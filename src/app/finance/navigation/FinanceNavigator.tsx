import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FinanceStackParamList } from '../../../navigation/types';
import { View, Text } from 'react-native';

// Placeholder screens
const InvoiceListScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Invoice List Screen</Text>
  </View>
);

const InvoiceDetailScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Invoice Detail Screen</Text>
  </View>
);

const InvoiceFormScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Invoice Form Screen</Text>
  </View>
);

const TimeEntryListScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Time Entry List Screen</Text>
  </View>
);

const TimeEntryFormScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Time Entry Form Screen</Text>
  </View>
);

const ReportsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Reports Screen</Text>
  </View>
);

const Stack = createStackNavigator<FinanceStackParamList>();

const FinanceNavigator = () => {
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
      <Stack.Screen name="InvoiceList" component={InvoiceListScreen} options={{ title: 'Invoices' }} />
      <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} options={{ title: 'Invoice Details' }} />
      <Stack.Screen name="InvoiceForm" component={InvoiceFormScreen} options={{ title: 'Invoice Form' }} />
      <Stack.Screen name="TimeEntryList" component={TimeEntryListScreen} options={{ title: 'Time Entries' }} />
      <Stack.Screen name="TimeEntryForm" component={TimeEntryFormScreen} options={{ title: 'Time Entry Form' }} />
      <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
    </Stack.Navigator>
  );
};

export default FinanceNavigator;
