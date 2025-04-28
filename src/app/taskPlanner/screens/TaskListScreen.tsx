import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
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
  Input,
  IconButton,
  Fab,
  Checkbox,
  Menu,
  Badge,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Mock data for tasks
const MOCK_TASKS = [
  {
    id: '1',
    title: 'Review Contract for Smith Case',
    description: 'Review and annotate the contract draft',
    dueDate: '2023-05-15',
    priority: 'high',
    status: 'pending',
    assignedTo: 'John Doe',
    category: 'Legal',
  },
  {
    id: '2',
    title: 'Prepare Meeting Notes',
    description: 'Prepare notes for client meeting',
    dueDate: '2023-05-16',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'John Doe',
    category: 'Administrative',
  },
  {
    id: '3',
    title: 'File Court Documents',
    description: 'File documents for Johnson case',
    dueDate: '2023-05-17',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Jane Smith',
    category: 'Legal',
  },
  {
    id: '4',
    title: 'Call Client',
    description: 'Follow up with client about case status',
    dueDate: '2023-05-14',
    priority: 'low',
    status: 'completed',
    assignedTo: 'John Doe',
    category: 'Communication',
  },
  {
    id: '5',
    title: 'Research Case Law',
    description: 'Research precedents for current case',
    dueDate: '2023-05-20',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'John Doe',
    category: 'Research',
  },
];

const TaskListScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter === 'pending' && task.status !== 'pending') return false;
    if (filter === 'completed' && task.status !== 'completed') return false;

    // Filter by search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: task.status === 'completed' ? 'pending' : 'completed',
          };
        }
        return task;
      })
    );
  };

  const renderTaskItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('TaskDetails', { taskId: item.id } as never)}
        mb={2}
      >
        <Box
          bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
          p={4}
          borderRadius="md"
          borderWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <HStack space={3} alignItems="center">
            <Checkbox
              isChecked={item.status === 'completed'}
              onChange={() => toggleTaskStatus(item.id)}
              value={item.id}
              accessibilityLabel={`Toggle ${item.title} completion status`}
              colorScheme={
                item.priority === 'high'
                  ? 'error'
                  : item.priority === 'medium'
                  ? 'warning'
                  : 'success'
              }
            />
            <VStack flex={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  color="text.primary"
                  fontWeight="medium"
                  fontSize="md"
                  textDecorationLine={item.status === 'completed' ? 'line-through' : 'none'}
                >
                  {item.title}
                </Text>
                <Badge
                  colorScheme={
                    item.priority === 'high'
                      ? 'error'
                      : item.priority === 'medium'
                      ? 'warning'
                      : 'success'
                  }
                  variant="subtle"
                  rounded="full"
                >
                  {item.priority}
                </Badge>
              </HStack>
              <Text
                color="text.secondary"
                fontSize="sm"
                numberOfLines={2}
                textDecorationLine={item.status === 'completed' ? 'line-through' : 'none'}
              >
                {item.description}
              </Text>
              <HStack justifyContent="space-between" mt={2}>
                <Text color="text.tertiary" fontSize="xs">
                  Due: {new Date(item.dueDate).toLocaleDateString()}
                </Text>
                <Text color="text.tertiary" fontSize="xs">
                  {item.category}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'gray.50'} p={4}>
      <VStack space={4}>
        <HStack space={2} alignItems="center">
          <Input
            flex={1}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
            borderRadius="full"
            py={2}
            px={3}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="search" />}
                size={5}
                ml={2}
                color="gray.400"
              />
            }
          />
          <Menu
            trigger={(triggerProps) => {
              return (
                <IconButton
                  {...triggerProps}
                  icon={<Icon as={<MaterialIcons name="filter-list" />} />}
                  borderRadius="full"
                  bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
                  _icon={{
                    color: 'primary.500',
                    size: 'md',
                  }}
                  _pressed={{
                    bg: 'primary.100',
                  }}
                />
              );
            }}
          >
            <Menu.Item onPress={() => setFilter('all')}>All Tasks</Menu.Item>
            <Menu.Item onPress={() => setFilter('pending')}>Pending Tasks</Menu.Item>
            <Menu.Item onPress={() => setFilter('completed')}>Completed Tasks</Menu.Item>
          </Menu>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.primary">
            {filter === 'all'
              ? 'All Tasks'
              : filter === 'pending'
              ? 'Pending Tasks'
              : 'Completed Tasks'}
          </Heading>
          <Text color="text.secondary" fontSize="sm">
            {String(filteredTasks.length)} tasks
          </Text>
        </HStack>

        <FlatList
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </VStack>

      <Fab
        position="absolute"
        right={4}
        bottom={4}
        icon={<Icon as={<MaterialIcons name="add" />} size="sm" color="white" />}
        colorScheme="primary"
        onPress={() => navigation.navigate('NewTask' as never)}
      />
    </Box>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
});
