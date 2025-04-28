import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  CaseManagementStackParamList,
  CaseStatus,
  CasePriority,
  CaseCreateInput,
  FormErrors,
} from '../../../types';
import { AppDispatch, RootState } from '../../../store/types';
import { addCase, editCase, fetchCaseById } from '../../../store/slices/caseSlice';

const CaseFormScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<CaseManagementStackParamList>>();
  const route = useRoute<RouteProp<CaseManagementStackParamList, 'CaseForm'>>();
  const toast = useToast();
  const { id } = route.params || {};
  const { currentCase, isLoading, error } = useSelector((state: RootState) => state.cases);

  // Form state
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState<CaseStatus>('active');
  const [priority, setPriority] = useState<CasePriority>('medium');
  const [description, setDescription] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  // Form validation
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Load case data if editing
  useEffect(() => {
    if (id) {
      dispatch(fetchCaseById(id));
    }
  }, [id, dispatch]);

  // Populate form with case data when available
  useEffect(() => {
    if (id && currentCase) {
      setTitle(currentCase.title);
      setClientName(currentCase.clientName);
      setStatus(currentCase.status);
      setPriority(currentCase.priority);
      setDescription(currentCase.description);
      setPracticeArea(currentCase.practiceArea);
      setDueDate(new Date(currentCase.dueDate));
    }
  }, [id, currentCase]);

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

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!title) { newErrors.title = 'Title is required'; }
    if (!clientName) { newErrors.clientName = 'Client name is required'; }
    if (!description) { newErrors.description = 'Description is required'; }
    if (!practiceArea) { newErrors.practiceArea = 'Practice area is required'; }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const caseData: CaseCreateInput = {
          title,
          clientId: '123', // In a real app, this would be selected from a list
          clientName,
          status,
          priority,
          description,
          practiceArea,
          assignedTo: ['1'], // In a real app, this would be selected from a list
          dueDate: dueDate.toISOString(),
        };

        if (id) {
          // Update existing case
          await dispatch(editCase({ id, ...caseData }));
          toast.show({
            title: 'Case updated',
            variant: 'success',
            placement: 'top',
          });
        } else {
          // Create new case
          await dispatch(addCase(caseData));
          toast.show({
            title: 'Case created',
            variant: 'success',
            placement: 'top',
          });
        }

        navigation.goBack();
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
    }
  };

  // No need for onDateChange as we're using a mock implementation

  if (isLoading && id) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="primary.500" />
      </Center>
    );
  }

  return (
    <Box flex={1} bg={bgColor} safeArea>
      <ScrollView>
        <Box bg={cardBg} p={4} m={4} rounded="lg" shadow={1}>
          <Heading size="lg" color={textColor} mb={6}>
            {id ? 'Edit Case' : 'Create New Case'}
          </Heading>

          <VStack space={4}>
            {/* Title */}
            <FormControl isRequired isInvalid={'title' in errors}>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                placeholder="Case title"
                value={title}
                onChangeText={setTitle}
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.title}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Client */}
            <FormControl isRequired isInvalid={'clientName' in errors}>
              <FormControl.Label>Client</FormControl.Label>
              <Input
                placeholder="Client name"
                value={clientName}
                onChangeText={setClientName}
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.clientName}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Status */}
            <FormControl>
              <FormControl.Label>Status</FormControl.Label>
              <Select
                selectedValue={status}
                minWidth="200"
                accessibilityLabel="Choose case status"
                placeholder="Choose case status"
                _selectedItem={{
                  bg: 'primary.100',
                  endIcon: <CheckIcon size="5" />,
                }}
                size="lg"
                onValueChange={(itemValue) => setStatus(itemValue as CaseStatus)}
              >
                <Select.Item label="Active" value="active" />
                <Select.Item label="Pending" value="pending" />
                <Select.Item label="Closed" value="closed" />
              </Select>
            </FormControl>

            {/* Priority */}
            <FormControl>
              <FormControl.Label>Priority</FormControl.Label>
              <Select
                selectedValue={priority}
                minWidth="200"
                accessibilityLabel="Choose priority level"
                placeholder="Choose priority level"
                _selectedItem={{
                  bg: 'primary.100',
                  endIcon: <CheckIcon size="5" />,
                }}
                size="lg"
                onValueChange={(itemValue) => setPriority(itemValue as CasePriority)}
              >
                <Select.Item label="High" value="high" />
                <Select.Item label="Medium" value="medium" />
                <Select.Item label="Low" value="low" />
              </Select>
            </FormControl>

            {/* Description */}
            <FormControl isRequired isInvalid={'description' in errors}>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                placeholder="Case description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                h={20}
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.description}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Practice Area */}
            <FormControl isRequired isInvalid={'practiceArea' in errors}>
              <FormControl.Label>Practice Area</FormControl.Label>
              <Input
                placeholder="Practice area"
                value={practiceArea}
                onChangeText={setPracticeArea}
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.practiceArea}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Due Date */}
            <FormControl>
              <FormControl.Label>Due Date</FormControl.Label>
              <Pressable onPress={() => {
                // Mock date picker functionality
                toast.show({
                  title: 'Date Picker',
                  description: 'Date picker would open here in a real implementation',
                  variant: 'info',
                  placement: 'top',
                });
              }}>
                <HStack
                  alignItems="center"
                  borderWidth={1}
                  borderColor="gray.300"
                  p={3}
                  borderRadius="lg"
                  justifyContent="space-between"
                >
                  <Text color={textColor}>
                    {dueDate.toLocaleDateString()}
                  </Text>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="calendar"
                    size="sm"
                    color={mutedTextColor}
                  />
                </HStack>
              </Pressable>
            </FormControl>

            {/* Submit Button */}
            <Button
              mt={6}
              colorScheme="primary"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              isLoadingText="Saving"
              size="lg"
            >
              {id ? 'Update Case' : 'Create Case'}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CaseFormScreen;
