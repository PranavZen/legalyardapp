import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Menu,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  CaseManagementStackParamList,
  CaseStatus,
  CasePriority,
} from '../../../types';
import { AppDispatch, RootState } from '../../../store/types';
import { fetchCaseById, removeCase } from '../../../store/slices/caseSlice';

// Note: The Menu component from native-base requires a trigger function that returns a component.
// This is a known limitation and the linting warning about defining components during render can be ignored
// for this specific case as it's required by the native-base API.

const CaseDetailScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<CaseManagementStackParamList>>();
  const route = useRoute<RouteProp<CaseManagementStackParamList, 'CaseDetail'>>();
  const toast = useToast();
  const { id } = route.params;
  const { currentCase, isLoading, error } = useSelector((state: RootState) => state.cases);

  // Delete confirmation dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cancelRef = React.useRef(null);

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    dispatch(fetchCaseById(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigation.navigate('CaseForm', { id });
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleteOpen(false);
    try {
      await dispatch(removeCase(id));
      toast.show({
        title: 'Case deleted',
        variant: 'success',
        placement: 'top',
      });
      navigation.goBack();
    } catch (err) {
      toast.show({
        title: 'Error',
        description: 'Failed to delete case',
        variant: 'error',
        placement: 'top',
      });
    }
  };

  const handleViewNotes = () => {
    navigation.navigate('CaseNotes', { id });
  };

  // Get status badge color
  const getStatusColor = (status: CaseStatus): string => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'closed':
        return 'gray';
      default:
        return 'info';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: CasePriority): string => {
    switch (priority) {
      case 'high':
        return 'red.500';
      case 'medium':
        return 'orange.500';
      case 'low':
        return 'green.500';
      default:
        return 'gray.500';
    }
  };

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.show({
        title: 'Error',
        description: error,
        variant: 'error',
        placement: 'top',
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="primary.500" />
      </Center>
    );
  }

  if (!currentCase) {
    return (
      <Center flex={1}>
        <Icon
          as={MaterialCommunityIcons}
          name="alert-circle-outline"
          size="6xl"
          color="gray.300"
          mb={4}
        />
        <Text fontSize="lg" color={mutedTextColor} textAlign="center">
          Case not found
        </Text>
        <Button mt={4} onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </Center>
    );
  }

  const formattedCreatedDate = new Date(currentCase.createdAt).toLocaleDateString();
  const formattedDueDate = new Date(currentCase.dueDate).toLocaleDateString();

  return (
    <Box flex={1} bg={bgColor} safeArea>
      <ScrollView>
        {/* Header section */}
        <Box bg={cardBg} p={4} mb={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size="lg" color={textColor}>{currentCase.title}</Heading>
            {/* eslint-disable-next-line react/no-unstable-nested-components */}
            <Menu
              w="190"
              trigger={(props) => (
                <Pressable accessibilityLabel="More options menu" {...props}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="dots-vertical"
                    size="lg"
                    color={mutedTextColor}
                  />
                </Pressable>
              )}
            >
              <Menu.Item onPress={handleEdit}>
                <HStack alignItems="center">
                  <Icon as={MaterialCommunityIcons} name="pencil" size="sm" color={textColor} mr={2} />
                  <Text color={textColor}>Edit Case</Text>
                </HStack>
              </Menu.Item>
              <Menu.Item onPress={handleDelete}>
                <HStack alignItems="center">
                  <Icon as={MaterialCommunityIcons} name="delete" size="sm" color="red.500" mr={2} />
                  <Text color="red.500">Delete Case</Text>
                </HStack>
              </Menu.Item>
            </Menu>
          </HStack>

          <HStack alignItems="center" mb={4}>
            <Text color={mutedTextColor} fontSize="md" mr={2}>Client: {currentCase.clientName}</Text>
            <Badge colorScheme={getStatusColor(currentCase.status)} variant="solid" rounded="md">
              <Text color="white" fontSize="xs" textTransform="capitalize">{currentCase.status}</Text>
            </Badge>
          </HStack>

          <Divider my={2} />

          <VStack space={2} mt={2}>
            <HStack alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="flag"
                color={getPriorityColor(currentCase.priority)}
                size="sm"
                mr={2}
              />
              <Text fontSize="sm" color={textColor} textTransform="capitalize">
                {currentCase.priority} priority
              </Text>
            </HStack>

            <HStack alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="calendar"
                color={mutedTextColor}
                size="sm"
                mr={2}
              />
              <Text fontSize="sm" color={textColor}>
                Created: {formattedCreatedDate}
              </Text>
            </HStack>

            <HStack alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="calendar-clock"
                color={mutedTextColor}
                size="sm"
                mr={2}
              />
              <Text fontSize="sm" color={textColor}>
                Due: {formattedDueDate}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Description section */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="md" color={textColor} mb={2}>Description</Heading>
          <Text color={textColor}>{currentCase.description}</Text>
        </Box>

        {/* Details section */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="md" color={textColor} mb={4}>Details</Heading>

          <HStack justifyContent="space-between" mb={3}>
            <Text color={mutedTextColor} fontSize="sm">Practice Area</Text>
            <Text color={textColor} fontSize="sm" fontWeight="medium">{currentCase.practiceArea}</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent="space-between" mb={3}>
            <Text color={mutedTextColor} fontSize="sm">Assigned To</Text>
            <VStack alignItems="flex-end">
              {currentCase.assignedTo.map((userId, index) => (
                <HStack key={index} alignItems="center">
                  <Icon
                    as={MaterialCommunityIcons}
                    name="account"
                    color="primary.500"
                    size="xs"
                    mr={1}
                  />
                  <Text color={textColor} fontSize="sm">User {userId}</Text>
                </HStack>
              ))}
            </VStack>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent="space-between">
            <Text color={mutedTextColor} fontSize="sm">Documents</Text>
            <Text color={textColor} fontSize="sm" fontWeight="medium">{currentCase.documents.length}</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent="space-between">
            <Text color={mutedTextColor} fontSize="sm">Tasks</Text>
            <Text color={textColor} fontSize="sm" fontWeight="medium">{currentCase.tasks.length}</Text>
          </HStack>
        </Box>

        {/* Notes section */}
        <Box bg={cardBg} p={4} mb={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Heading size="md" color={textColor}>Notes</Heading>
            <Button
              size="sm"
              leftIcon={<Icon as={MaterialCommunityIcons} name="note-plus" size="xs" />}
              onPress={handleViewNotes}
            >
              View All
            </Button>
          </HStack>

          {currentCase.notes.length > 0 ? (
            <VStack space={3} mt={2}>
              {currentCase.notes.slice(0, 2).map((note) => (
                <Box key={note.id} bg={sectionBg} p={3} rounded="md">
                  <Text color={textColor} fontSize="sm">{note.content}</Text>
                  <HStack justifyContent="space-between" mt={2}>
                    <Text color={mutedTextColor} fontSize="xs">By: User {note.createdBy}</Text>
                    <Text color={mutedTextColor} fontSize="xs">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                </Box>
              ))}

              {currentCase.notes.length > 2 && (
                <Text color="primary.500" fontSize="sm" textAlign="center" onPress={handleViewNotes}>
                  View {currentCase.notes.length - 2} more notes
                </Text>
              )}
            </VStack>
          ) : (
            <Box alignItems="center" py={4}>
              <Text color={mutedTextColor}>No notes yet</Text>
            </Box>
          )}
        </Box>
      </ScrollView>

      {/* Delete confirmation dialog */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Case</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this case? This action cannot be undone.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={() => setIsDeleteOpen(false)} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={confirmDelete}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default CaseDetailScreen;
