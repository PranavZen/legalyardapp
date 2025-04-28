import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  useColorMode,
  ScrollView,
  Badge,
  Divider,
  Button,
  IconButton,
  useToast,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Mock data for tasks
const MOCK_TASKS = [
  {
    id: '1',
    title: 'Review Contract for Smith Case',
    description: 'Review and annotate the contract draft for the Smith case. Pay special attention to clauses 5-7 regarding liability and compensation. Make notes for discussion in the next client meeting.',
    dueDate: '2023-05-15',
    priority: 'high',
    status: 'pending',
    assignedTo: 'John Doe',
    category: 'Legal',
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    createdAt: '2023-05-01',
    updatedAt: '2023-05-10',
    attachments: [
      { id: '1', name: 'Contract_Draft_v2.pdf', type: 'pdf', size: '2.4 MB' },
      { id: '2', name: 'Client_Notes.docx', type: 'docx', size: '1.1 MB' },
    ],
    comments: [
      { id: '1', user: 'Jane Smith', text: 'Please review section 3.2 carefully', timestamp: '2023-05-05T10:30:00' },
      { id: '2', user: 'John Doe', text: 'Added notes on liability clauses', timestamp: '2023-05-08T14:15:00' },
    ],
  },
  {
    id: '2',
    title: 'Prepare Meeting Notes',
    description: 'Prepare notes for client meeting scheduled for May 16th. Include summary of case progress, next steps, and questions for the client.',
    dueDate: '2023-05-16',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'John Doe',
    category: 'Administrative',
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    createdAt: '2023-05-02',
    updatedAt: '2023-05-10',
    attachments: [
      { id: '3', name: 'Meeting_Agenda.docx', type: 'docx', size: '0.8 MB' },
    ],
    comments: [
      { id: '3', user: 'John Doe', text: 'Added discussion points about settlement options', timestamp: '2023-05-09T11:20:00' },
    ],
  },
  {
    id: '3',
    title: 'File Court Documents',
    description: 'File documents for Johnson case including motion for extension and supporting affidavits. Deadline is May 17th.',
    dueDate: '2023-05-17',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Jane Smith',
    category: 'Legal',
    caseId: '102',
    caseName: 'Johnson Estate',
    createdAt: '2023-05-03',
    updatedAt: '2023-05-11',
    attachments: [
      { id: '4', name: 'Motion_for_Extension.pdf', type: 'pdf', size: '3.2 MB' },
      { id: '5', name: 'Affidavit_Johnson.pdf', type: 'pdf', size: '1.5 MB' },
    ],
    comments: [
      { id: '4', user: 'Jane Smith', text: 'Documents ready for review before filing', timestamp: '2023-05-11T09:45:00' },
    ],
  },
];

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundTask = MOCK_TASKS.find((t) => t.id === taskId);
    setTask(foundTask);
  }, [taskId]);

  const handleEditTask = () => {
    navigation.navigate('EditTask', { taskId: task.id } as never);
  };

  const handleCompleteTask = () => {
    // In a real app, this would update the task status via API
    setTask({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' });

    toast.show({
      title: task.status === 'completed' ? 'Task marked as pending' : 'Task marked as completed',
      placement: 'top',
    });
  };

  if (!task) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading task details...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'gray.50'}>
      <ScrollView>
        <Box p={4}>
          <VStack space={4}>
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="center">
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
                {task.priority} priority
              </Badge>
              <Badge
                colorScheme={task.status === 'completed' ? 'success' : 'info'}
                variant="subtle"
                rounded="full"
              >
                {task.status}
              </Badge>
            </HStack>

            {/* Title and Description */}
            <VStack space={2}>
              <Heading size="lg" color="text.primary">
                {task.title}
              </Heading>
              <Text color="text.secondary" fontSize="md">
                {task.description}
              </Text>
            </VStack>

            <Divider />

            {/* Task Details */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Details
              </Heading>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="event" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="person" />} size={5} color="primary.500" />
                <Text color="text.secondary">Assigned to: {task.assignedTo}</Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="folder" />} size={5} color="primary.500" />
                <Text color="text.secondary">Category: {task.category}</Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="gavel" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Related Case: {task.caseName} (#{String(task.caseId)})
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="access-time" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="update" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Last Updated: {new Date(task.updatedAt).toLocaleDateString()}
                </Text>
              </HStack>
            </VStack>

            <Divider />

            {/* Attachments */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Attachments ({String(task.attachments.length)})
              </Heading>

              {task.attachments.map((attachment) => (
                <Pressable
                  key={attachment.id}
                  onPress={() => console.log('Open attachment:', attachment.name)}
                >
                  <HStack
                    space={3}
                    alignItems="center"
                    bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
                    p={3}
                    borderRadius="md"
                  >
                    <Icon
                      as={
                        <MaterialIcons
                          name={
                            attachment.type === 'pdf'
                              ? 'picture-as-pdf'
                              : attachment.type === 'docx'
                              ? 'description'
                              : 'insert-drive-file'
                          }
                        />
                      }
                      size={5}
                      color={
                        attachment.type === 'pdf'
                          ? 'error.500'
                          : attachment.type === 'docx'
                          ? 'primary.500'
                          : 'gray.500'
                      }
                    />
                    <VStack flex={1}>
                      <Text color="text.primary" fontWeight="medium">
                        {attachment.name}
                      </Text>
                      <Text color="text.tertiary" fontSize="xs">
                        {attachment.size}
                      </Text>
                    </VStack>
                    <Icon
                      as={<MaterialIcons name="download" />}
                      size={5}
                      color="primary.500"
                    />
                  </HStack>
                </Pressable>
              ))}

              <Button
                leftIcon={<Icon as={<MaterialIcons name="attach-file" />} size="sm" />}
                variant="outline"
                onPress={() => console.log('Add attachment')}
              >
                Add Attachment
              </Button>
            </VStack>

            <Divider />

            {/* Comments */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Comments ({String(task.comments.length)})
              </Heading>

              {task.comments.map((comment) => (
                <Box
                  key={comment.id}
                  bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
                  p={3}
                  borderRadius="md"
                >
                  <HStack justifyContent="space-between" alignItems="center" mb={1}>
                    <Text color="text.primary" fontWeight="bold">
                      {comment.user}
                    </Text>
                    <Text color="text.tertiary" fontSize="xs">
                      {new Date(comment.timestamp).toLocaleString()}
                    </Text>
                  </HStack>
                  <Text color="text.secondary">{comment.text}</Text>
                </Box>
              ))}

              <Button
                leftIcon={<Icon as={<MaterialIcons name="comment" />} size="sm" />}
                variant="outline"
                onPress={() => console.log('Add comment')}
              >
                Add Comment
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>

      {/* Action Buttons */}
      <HStack
        bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
        p={4}
        justifyContent="space-between"
        borderTopWidth={1}
        borderTopColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      >
        <Button
          flex={1}
          colorScheme={task.status === 'completed' ? 'warning' : 'success'}
          onPress={handleCompleteTask}
          leftIcon={
            <Icon
              as={
                <MaterialIcons
                  name={task.status === 'completed' ? 'replay' : 'check-circle'}
                />
              }
              size="sm"
            />
          }
        >
          {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}
        </Button>
        <IconButton
          ml={2}
          icon={<Icon as={<MaterialIcons name="edit" />} />}
          colorScheme="primary"
          variant="solid"
          onPress={handleEditTask}
        />
      </HStack>
    </Box>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
