import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { TaskPlannerStackParamList } from '../../../navigation/types';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

// Placeholder screens for remaining screens
const TaskFormScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Task Form Screen</Text>
  </View>
);

const TaskCalendarScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Task Calendar Screen</Text>
  </View>
);

const Stack = createStackNavigator<TaskPlannerStackParamList>();

const TaskPlannerNavigator = () => {
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
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Task Form' }} />
      <Stack.Screen name="TaskCalendar" component={TaskCalendarScreen} options={{ title: 'Calendar' }} />
    </Stack.Navigator>
  );
};

export default TaskPlannerNavigator;
