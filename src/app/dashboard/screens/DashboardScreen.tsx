import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Pressable,
  Icon,
  useColorMode,
  Avatar,
  Divider,
  Badge,
  Progress,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../../store/types';
import { useTheme } from '../../../themes/ThemeContext';
import DashboardCard from '../components/DashboardCard';
import AISuggestionCard from '../components/AISuggestionCard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data for dashboard
  const upcomingTasks = [
    { id: '1', title: 'Client Meeting', dueDate: '2h', priority: 'high' },
    { id: '2', title: 'Document Review', dueDate: '4h', priority: 'medium' },
    { id: '3', title: 'Case Preparation', dueDate: 'Tomorrow', priority: 'low' },
  ];

  const recentDocuments = [
    { id: '1', title: 'Contract Agreement', type: 'pdf', date: '2h ago' },
    { id: '2', title: 'Case Notes', type: 'doc', date: 'Yesterday' },
    { id: '3', title: 'Client Information', type: 'xls', date: '2d ago' },
  ];

  const aiSuggestions = [
    {
      id: '1',
      title: 'Deadline Alert',
      description: 'You have a case filing deadline tomorrow',
      type: 'alert',
    },
    {
      id: '2',
      title: 'Document Suggestion',
      description: 'Based on your recent case, you might need these templates',
      type: 'suggestion',
    },
    {
      id: '3',
      title: 'Time Tracking',
      description: 'You have 4 unbilled hours from last week',
      type: 'reminder',
    },
  ];

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box safeArea p={4}>
          {/* Header */}
          <HStack justifyContent="space-between" alignItems="center" mb={6}>
            <VStack>
              <Heading size="md" color="text.primary">
                Welcome back,
              </Heading>
              <Heading size="lg" color="primary.500">
                {user?.name || 'User'}
              </Heading>
            </VStack>
            <HStack space={2} alignItems="center">
              <Pressable onPress={toggleTheme} p={2}>
                <Icon
                  as={<MaterialIcons name={isDarkMode ? 'light-mode' : 'dark-mode'} />}
                  size={6}
                  color="primary.500"
                />
              </Pressable>
              <Avatar
                size="md"
                bg="primary.500"
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </HStack>
          </HStack>

          {/* Quick Stats */}
          <HStack space={4} mb={6} flexWrap="wrap">
            <DashboardCard
              title="Active Cases"
              value="12"
              icon={<MaterialIcons name="gavel" size={24} color="#0088CC" />}
              onPress={() => navigation.navigate('CaseManagement' as never)}
            />
            <DashboardCard
              title="Pending Tasks"
              value="8"
              icon={<MaterialIcons name="check-circle" size={24} color="#10B981" />}
              onPress={() => navigation.navigate('TaskPlanner' as never)}
            />
            <DashboardCard
              title="Invoices"
              value="5"
              icon={<MaterialIcons name="receipt" size={24} color="#F59E0B" />}
              onPress={() => navigation.navigate('Finance' as never)}
            />
            <DashboardCard
              title="Documents"
              value="24"
              icon={<MaterialIcons name="folder" size={24} color="#3B82F6" />}
              onPress={() => navigation.navigate('DocumentVault' as never)}
            />
          </HStack>

          {/* AI Suggestions */}
          <Heading size="md" mb={4} color="text.primary">
            AI Insights
          </Heading>
          <VStack space={3} mb={6}>
            {aiSuggestions.map((suggestion) => (
              <AISuggestionCard
                key={suggestion.id}
                title={suggestion.title}
                description={suggestion.description}
                type={suggestion.type}
                onPress={() => console.log('Suggestion pressed:', suggestion.id)}
              />
            ))}
          </VStack>

          {/* Upcoming Tasks */}
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size="md" color="text.primary">
              Upcoming Tasks
            </Heading>
            <Pressable onPress={() => navigation.navigate('Tasks' as never)}>
              <Text color="primary.500" fontWeight="medium">
                View All
              </Text>
            </Pressable>
          </HStack>
          <VStack space={3} mb={6}>
            {upcomingTasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => console.log('Task pressed:', task.id)}
              >
                <HStack
                  bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
                  p={3}
                  borderRadius="md"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={<MaterialCommunityIcons name="checkbox-marked-circle-outline" />}
                      size={5}
                      color={
                        task.priority === 'high'
                          ? 'error.500'
                          : task.priority === 'medium'
                          ? 'warning.500'
                          : 'success.500'
                      }
                    />
                    <Text color="text.primary" fontWeight="medium">
                      {task.title}
                    </Text>
                  </HStack>
                  <Badge
                    colorScheme={
                      task.priority === 'high'
                        ? 'error'
                        : task.priority === 'medium'
                        ? 'warning'
                        : 'success'
                    }
                    variant="subtle"
                    rounded="full"
                  >
                    {task.dueDate}
                  </Badge>
                </HStack>
              </Pressable>
            ))}
          </VStack>

          {/* Recent Documents */}
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size="md" color="text.primary">
              Recent Documents
            </Heading>
            <Pressable onPress={() => navigation.navigate('Documents' as never)}>
              <Text color="primary.500" fontWeight="medium">
                View All
              </Text>
            </Pressable>
          </HStack>
          <VStack space={3} mb={6}>
            {recentDocuments.map((doc) => (
              <Pressable
                key={doc.id}
                onPress={() => console.log('Document pressed:', doc.id)}
              >
                <HStack
                  bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
                  p={3}
                  borderRadius="md"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={
                        <MaterialIcons
                          name={
                            doc.type === 'pdf'
                              ? 'picture-as-pdf'
                              : doc.type === 'doc'
                              ? 'description'
                              : 'table-chart'
                          }
                        />
                      }
                      size={5}
                      color={
                        doc.type === 'pdf'
                          ? 'error.500'
                          : doc.type === 'doc'
                          ? 'primary.500'
                          : 'success.500'
                      }
                    />
                    <Text color="text.primary" fontWeight="medium">
                      {doc.title}
                    </Text>
                  </HStack>
                  <Text color="text.secondary" fontSize="xs">
                    {doc.date}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>

          {/* Subscription Progress */}
          <Heading size="md" mb={2} color="text.primary">
            Subscription Usage
          </Heading>
          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
            mb={6}
          >
            <HStack justifyContent="space-between" mb={2}>
              <Text color="text.primary" fontWeight="medium">
                Storage
              </Text>
              <Text color="text.secondary">
                2.4 GB / 5 GB
              </Text>
            </HStack>
            <Progress value={48} colorScheme="primary" size="sm" mb={4} />

            <HStack justifyContent="space-between" mb={2}>
              <Text color="text.primary" fontWeight="medium">
                AI Credits
              </Text>
              <Text color="text.secondary">
                78 / 100
              </Text>
            </HStack>
            <Progress value={78} colorScheme="info" size="sm" />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
