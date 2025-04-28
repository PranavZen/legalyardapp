import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Badge,
  Box,
  Center,
  CheckIcon,
  Fab,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Select,
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
import { CaseManagementStackParamList, Case } from '../../../types';
import { AppDispatch, RootState } from '../../../store/types';
import { fetchCases } from '../../../store/slices/caseSlice';
import { commonStyles } from '../../../styles/common';

const CaseListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<CaseManagementStackParamList>>();
  const toast = useToast();
  const { cases, isLoading, error } = useSelector((state: RootState) => state.cases);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchCases())
      .finally(() => setRefreshing(false));
  };

  const handleCasePress = (id: string) => {
    navigation.navigate('CaseDetail', { id });
  };

  const handleAddCase = () => {
    navigation.navigate('CaseForm', {});
  };

  // Filter cases based on search query and filters
  const filteredCases = cases.filter((caseItem: Case) => {
    const matchesSearch =
      searchQuery === '' ||
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === '' ||
      caseItem.status === statusFilter;

    const matchesPriority =
      priorityFilter === '' ||
      caseItem.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
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

  // Get priority icon
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return { name: 'flag', color: 'red.500' };
      case 'medium':
        return { name: 'flag', color: 'orange.500' };
      case 'low':
        return { name: 'flag', color: 'green.500' };
      default:
        return { name: 'flag', color: 'gray.500' };
    }
  };

  // Render case item
  const renderCaseItem = ({ item }: { item: Case }) => {
    const priorityIcon = getPriorityIcon(item.priority);
    const statusColor = getStatusColor(item.status);
    const dueDate = new Date(item.dueDate).toLocaleDateString();

    return (
      <Pressable onPress={() => handleCasePress(item.id)} mb={3}>
        <Box
          bg={cardBg}
          rounded="lg"
          overflow="hidden"
          borderWidth={1}
          borderColor={borderColor}
          shadow={1}
          p={4}
        >
          <HStack alignItems="center" mb={2}>
            <VStack flex={1}>
              <Heading size="sm" color={textColor}>{item.title}</Heading>
              <Text color={mutedTextColor} fontSize="xs">{item.clientName}</Text>
            </VStack>
            <Badge colorScheme={statusColor} variant="solid" rounded="md">
              <Text color="white" fontSize="xs" textTransform="capitalize">{item.status}</Text>
            </Badge>
          </HStack>

          <Text color={textColor} fontSize="xs" numberOfLines={2} mb={3}>
            {item.description}
          </Text>

          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={1} alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name={priorityIcon.name}
                color={priorityIcon.color}
                size="xs"
              />
              <Text fontSize="xs" color={mutedTextColor} textTransform="capitalize">
                {item.priority} priority
              </Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="calendar"
                color={mutedTextColor}
                size="xs"
              />
              <Text fontSize="xs" color={mutedTextColor}>
                Due: {dueDate}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    );
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

  // Colors for the background
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box flex={1} bg={bgColor} safeArea>
      {/* Search and filters */}
      <Box px={4} pt={4} pb={2}>
        <Input
          placeholder="Search cases..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          width="100%"
          borderRadius="lg"
          py={3}
          px={2}
          mb={3}
          InputLeftElement={
            <Icon
              as={MaterialCommunityIcons}
              name="magnify"
              color="gray.400"
              size={5}
              ml={2}
            />
          }
          InputRightElement={
            searchQuery ? (
              <IconButton
                icon={<Icon as={MaterialCommunityIcons} name="close" size={5} color="gray.400" />}
                onPress={() => setSearchQuery('')}
                mr={1}
              />
            ) : null
          }
        />

        <HStack space={2} mb={2}>
          <Select
            selectedValue={statusFilter}
            minWidth="48%"
            accessibilityLabel="Filter by status"
            placeholder="Status: All"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setStatusFilter(itemValue)}
          >
            <Select.Item label="All" value="" />
            <Select.Item label="Active" value="active" />
            <Select.Item label="Pending" value="pending" />
            <Select.Item label="Closed" value="closed" />
          </Select>

          <Select
            selectedValue={priorityFilter}
            minWidth="48%"
            accessibilityLabel="Filter by priority"
            placeholder="Priority: All"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setPriorityFilter(itemValue)}
          >
            <Select.Item label="All" value="" />
            <Select.Item label="High" value="high" />
            <Select.Item label="Medium" value="medium" />
            <Select.Item label="Low" value="low" />
          </Select>
        </HStack>
      </Box>

      {/* Case list */}
      {isLoading && !refreshing ? (
        <Center flex={1}>
          <Spinner size="lg" color="primary.500" />
        </Center>
      ) : (
        <FlatList
          data={filteredCases}
          renderItem={renderCaseItem}
          keyExtractor={item => item.id}
          contentContainerStyle={commonStyles.flatListContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Box alignItems="center" justifyContent="center" py={10}>
              <Icon
                as={MaterialCommunityIcons}
                name="briefcase-outline"
                size="6xl"
                color="gray.300"
                mb={4}
              />
              <Text fontSize="lg" color={mutedTextColor} textAlign="center">
                {searchQuery || statusFilter || priorityFilter
                  ? 'No cases match your filters'
                  : 'No cases found'}
              </Text>
              {!searchQuery && !statusFilter && !priorityFilter && (
                <Pressable
                  onPress={handleAddCase}
                  mt={4}
                  bg="primary.500"
                  px={6}
                  py={2}
                  rounded="md"
                >
                  <Text color="white" fontWeight="medium">Create your first case</Text>
                </Pressable>
              )}
            </Box>
          }
        />
      )}

      {/* Add button */}
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon as={MaterialCommunityIcons} name="plus" size="sm" color="white" />}
        onPress={handleAddCase}
        renderInPortal={false}
        shadow={2}
        right={4}
        bottom={4}
      />
    </Box>
  );
};

export default CaseListScreen;
