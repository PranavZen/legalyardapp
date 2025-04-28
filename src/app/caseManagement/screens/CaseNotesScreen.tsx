import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/types';
import { addNote, fetchCaseById } from '../../../store/slices/caseSlice';
import {
  CaseManagementStackParamList,
  CaseNoteInput,
} from '../../../types';
import { commonStyles } from '../../../styles/common';

interface NoteItem {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

const CaseNotesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<CaseManagementStackParamList>>();
  const route = useRoute<RouteProp<CaseManagementStackParamList, 'CaseNotes'>>();
  const toast = useToast();
  const { id } = route.params;
  const { currentCase, isLoading, error } = useSelector((state: RootState) => state.cases);

  const [refreshing, setRefreshing] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const noteBg = useColorModeValue('gray.50', 'gray.700');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    dispatch(fetchCaseById(id));
  }, [id, dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchCaseById(id))
      .finally(() => setRefreshing(false));
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      toast.show({
        title: 'Error',
        description: 'Note content cannot be empty',
        variant: 'error',
        placement: 'top',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!currentCase) {
        throw new Error('Case not found');
      }

      const noteData: CaseNoteInput = {
        caseId: currentCase.id,
        content: noteContent,
      };

      await dispatch(addNote(noteData));
      setNoteContent('');
      toast.show({
        title: 'Note added',
        variant: 'success',
        placement: 'top',
      });
    } catch (err: any) {
      toast.show({
        title: 'Error',
        description: err?.message || 'An error occurred',
        variant: 'error',
        placement: 'top',
      });
    } finally {
      setIsSubmitting(false);
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

  // Render note item
  const renderNoteItem = ({ item }: { item: NoteItem }) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString();
    const formattedTime = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <Box bg={noteBg} p={4} rounded="md" mb={3}>
        <HStack alignItems="flex-start" space={3}>
          <Avatar
            bg="primary.500"
            size="sm"
          >
            {item.createdBy.substring(0, 2).toUpperCase()}
          </Avatar>
          <VStack flex={1}>
            <HStack justifyContent="space-between" alignItems="center" mb={1}>
              <Text color={textColor} fontWeight="bold">User {item.createdBy}</Text>
              <Text color={mutedTextColor} fontSize="xs">
                {formattedDate} at {formattedTime}
              </Text>
            </HStack>
            <Text color={textColor}>{item.content}</Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  if (isLoading && !refreshing) {
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

  // Sort notes by date (newest first)
  const sortedNotes = [...currentCase.notes].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Box flex={1} bg={bgColor} safeArea>
      {/* Header */}
      <Box bg={cardBg} p={4} mb={4}>
        <Heading size="md" color={textColor}>
          Notes for {currentCase.title}
        </Heading>
        <Text color={mutedTextColor} fontSize="sm">
          {currentCase.notes.length} {currentCase.notes.length === 1 ? 'note' : 'notes'}
        </Text>
      </Box>

      {/* Add note form */}
      <Box bg={cardBg} p={4} mb={4}>
        <Input
          placeholder="Add a note..."
          value={noteContent}
          onChangeText={setNoteContent}
          multiline
          numberOfLines={3}
          h={20}
          mb={3}
        />
        <Button
          onPress={handleAddNote}
          isLoading={isSubmitting}
          isLoadingText="Adding"
          leftIcon={<Icon as={MaterialCommunityIcons} name="note-plus" size="sm" />}
        >
          Add Note
        </Button>
      </Box>

      {/* Notes list */}
      <FlatList
        data={sortedNotes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={commonStyles.flatListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <Box alignItems="center" justifyContent="center" py={10}>
            <Icon
              as={MaterialCommunityIcons}
              name="note-text-outline"
              size="6xl"
              color="gray.300"
              mb={4}
            />
            <Text fontSize="lg" color={mutedTextColor} textAlign="center">
              No notes yet
            </Text>
            <Text fontSize="sm" color={mutedTextColor} textAlign="center" mt={2}>
              Add a note to keep track of important information
            </Text>
          </Box>
        }
      />
    </Box>
  );
};

export default CaseNotesScreen;
