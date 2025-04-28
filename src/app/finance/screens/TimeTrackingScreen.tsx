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
  Menu,
  Badge,
  Button,
  Modal,
  FormControl,
  Select,
  TextArea,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Mock data for time entries
const MOCK_TIME_ENTRIES = [
  {
    id: '1',
    description: 'Client consultation',
    date: '2023-05-15',
    startTime: '09:00',
    endTime: '10:30',
    duration: 1.5,
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    clientName: 'Smith & Co.',
    billable: true,
    billed: false,
    rate: 200,
    amount: 300,
    notes: 'Initial consultation regarding contract dispute',
  },
  {
    id: '2',
    description: 'Document review',
    date: '2023-05-15',
    startTime: '11:00',
    endTime: '13:00',
    duration: 2,
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    clientName: 'Smith & Co.',
    billable: true,
    billed: false,
    rate: 200,
    amount: 400,
    notes: 'Reviewed contract documents and prepared notes',
  },
  {
    id: '3',
    description: 'Research',
    date: '2023-05-14',
    startTime: '14:00',
    endTime: '16:30',
    duration: 2.5,
    caseId: '102',
    caseName: 'Johnson Estate',
    clientName: 'Johnson Estate',
    billable: true,
    billed: true,
    rate: 200,
    amount: 500,
    notes: 'Researched precedents for estate case',
  },
  {
    id: '4',
    description: 'Team meeting',
    date: '2023-05-14',
    startTime: '10:00',
    endTime: '11:00',
    duration: 1,
    caseId: null,
    caseName: null,
    clientName: null,
    billable: false,
    billed: false,
    rate: 0,
    amount: 0,
    notes: 'Weekly team meeting',
  },
  {
    id: '5',
    description: 'Court preparation',
    date: '2023-05-13',
    startTime: '13:00',
    endTime: '17:00',
    duration: 4,
    caseId: '103',
    caseName: 'Davis Contract Dispute',
    clientName: 'Davis LLC',
    billable: true,
    billed: true,
    rate: 200,
    amount: 800,
    notes: 'Prepared for court hearing',
  },
];

// Mock data for cases
const MOCK_CASES = [
  { id: '101', name: 'Smith vs. Johnson', client: 'Smith & Co.' },
  { id: '102', name: 'Johnson Estate', client: 'Johnson Estate' },
  { id: '103', name: 'Davis Contract Dispute', client: 'Davis LLC' },
  { id: '104', name: 'Wilson Trademark', client: 'Wilson Enterprises' },
  { id: '105', name: 'Brown Family Trust', client: 'Brown Family Trust' },
];

const TimeTrackingScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, billable, non-billable, billed, unbilled
  const [timeEntries, setTimeEntries] = useState(MOCK_TIME_ENTRIES);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    description: '',
    caseId: '',
    billable: true,
    notes: '',
  });

  const filteredTimeEntries = timeEntries.filter((entry) => {
    // Filter by status
    if (filter === 'billable' && !entry.billable) return false;
    if (filter === 'non-billable' && entry.billable) return false;
    if (filter === 'billed' && !entry.billed) return false;
    if (filter === 'unbilled' && (!entry.billable || entry.billed)) return false;

    // Filter by search query
    if (
      searchQuery &&
      !entry.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(entry.caseName && entry.caseName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !(entry.clientName && entry.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const formatElapsedTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    const startTime = new Date();
    setTimerStartTime(startTime);
    setIsTimerRunning(true);
    setElapsedTime(0);

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    setTimerInterval(interval);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setIsTimerRunning(false);
    setShowNewEntryModal(true);
  };

  const handleSaveNewEntry = () => {
    const now = new Date();
    const startTime = timerStartTime;
    const duration = elapsedTime / 3600; // Convert seconds to hours

    const selectedCase = MOCK_CASES.find((c) => c.id === newEntry.caseId);

    const newTimeEntry = {
      id: (timeEntries.length + 1).toString(),
      description: newEntry.description,
      date: now.toISOString().split('T')[0],
      startTime: startTime.toTimeString().substring(0, 5),
      endTime: now.toTimeString().substring(0, 5),
      duration,
      caseId: newEntry.caseId || null,
      caseName: selectedCase ? selectedCase.name : null,
      clientName: selectedCase ? selectedCase.client : null,
      billable: newEntry.billable,
      billed: false,
      rate: newEntry.billable ? 200 : 0,
      amount: newEntry.billable ? Math.round(duration * 200 * 100) / 100 : 0,
      notes: newEntry.notes,
    };

    setTimeEntries([newTimeEntry, ...timeEntries]);
    setShowNewEntryModal(false);
    setNewEntry({
      description: '',
      caseId: '',
      billable: true,
      notes: '',
    });
  };

  const renderTimeEntryItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => console.log('Time entry pressed:', item.id)}
        mb={2}
      >
        <Box
          bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
          p={4}
          borderRadius="md"
          borderWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <VStack>
              <Text color="text.primary" fontWeight="bold" fontSize="md">
                {item.description}
              </Text>
              {item.caseName && (
                <Text color="text.secondary" fontSize="sm">
                  {item.caseName} • {item.clientName}
                </Text>
              )}
            </VStack>
            <Badge
              colorScheme={
                item.billable
                  ? item.billed
                    ? 'success'
                    : 'warning'
                  : 'gray'
              }
              variant="subtle"
              rounded="full"
            >
              {item.billable
                ? item.billed
                  ? 'BILLED'
                  : 'BILLABLE'
                : 'NON-BILLABLE'}
            </Badge>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={2} alignItems="center">
              <Icon as={<MaterialIcons name="access-time" />} size={4} color="text.tertiary" />
              <Text color="text.tertiary" fontSize="sm">
                {formatDuration(item.duration)}
              </Text>
            </HStack>
            <HStack space={4} alignItems="center">
              <Text color="text.tertiary" fontSize="sm">
                {new Date(item.date).toLocaleDateString()}
              </Text>
              {item.billable && (
                <Text color="text.primary" fontWeight="bold">
                  ${item.amount.toFixed(2)}
                </Text>
              )}
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'gray.50'} p={4}>
      <VStack space={4}>
        {/* Timer Section */}
        <Box
          bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
          p={4}
          borderRadius="md"
          borderWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <VStack space={4} alignItems="center">
            <Heading size="md" color="text.primary">
              Time Tracker
            </Heading>
            <Text fontSize="4xl" fontWeight="bold" color="primary.500">
              {formatElapsedTime(elapsedTime)}
            </Text>
            <Button
              width="full"
              colorScheme={isTimerRunning ? 'error' : 'success'}
              onPress={isTimerRunning ? stopTimer : startTimer}
              leftIcon={
                <Icon
                  as={<MaterialIcons name={isTimerRunning ? 'stop' : 'play-arrow'} />}
                  size="sm"
                />
              }
            >
              {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
            </Button>
          </VStack>
        </Box>

        {/* Search and Filter */}
        <HStack space={2} alignItems="center">
          <Input
            flex={1}
            placeholder="Search time entries..."
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
            <Menu.Item onPress={() => setFilter('all')}>All Entries</Menu.Item>
            <Menu.Item onPress={() => setFilter('billable')}>Billable</Menu.Item>
            <Menu.Item onPress={() => setFilter('non-billable')}>Non-Billable</Menu.Item>
            <Menu.Item onPress={() => setFilter('billed')}>Billed</Menu.Item>
            <Menu.Item onPress={() => setFilter('unbilled')}>Unbilled</Menu.Item>
          </Menu>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.primary">
            Time Entries
          </Heading>
          <Text color="text.secondary" fontSize="sm">
            {filteredTimeEntries.length} entries
          </Text>
        </HStack>

        <FlatList
          data={filteredTimeEntries}
          renderItem={renderTimeEntryItem}
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
        onPress={() => setShowNewEntryModal(true)}
      />

      {/* New Time Entry Modal */}
      <Modal isOpen={showNewEntryModal} onClose={() => setShowNewEntryModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>New Time Entry</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <FormControl isRequired>
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  value={newEntry.description}
                  onChangeText={(value) => setNewEntry({ ...newEntry, description: value })}
                  placeholder="What did you work on?"
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Case</FormControl.Label>
                <Select
                  selectedValue={newEntry.caseId}
                  minWidth="200"
                  accessibilityLabel="Choose Case"
                  placeholder="Select a case"
                  onValueChange={(value) => setNewEntry({ ...newEntry, caseId: value })}
                  _selectedItem={{
                    bg: 'primary.100',
                  }}
                >
                  {MOCK_CASES.map((caseItem) => (
                    <Select.Item
                      key={caseItem.id}
                      label={`${caseItem.name} (${caseItem.client})`}
                      value={caseItem.id}
                    />
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Billable</FormControl.Label>
                <HStack space={2}>
                  <Pressable
                    flex={1}
                    onPress={() => setNewEntry({ ...newEntry, billable: true })}
                  >
                    <Box
                      p={2}
                      borderWidth={1}
                      borderColor={newEntry.billable ? 'primary.500' : 'gray.300'}
                      borderRadius="md"
                      bg={newEntry.billable ? 'primary.50' : 'transparent'}
                    >
                      <Text
                        textAlign="center"
                        color={newEntry.billable ? 'primary.500' : 'text.secondary'}
                      >
                        Billable
                      </Text>
                    </Box>
                  </Pressable>
                  <Pressable
                    flex={1}
                    onPress={() => setNewEntry({ ...newEntry, billable: false })}
                  >
                    <Box
                      p={2}
                      borderWidth={1}
                      borderColor={!newEntry.billable ? 'primary.500' : 'gray.300'}
                      borderRadius="md"
                      bg={!newEntry.billable ? 'primary.50' : 'transparent'}
                    >
                      <Text
                        textAlign="center"
                        color={!newEntry.billable ? 'primary.500' : 'text.secondary'}
                      >
                        Non-Billable
                      </Text>
                    </Box>
                  </Pressable>
                </HStack>
              </FormControl>

              <FormControl>
                <FormControl.Label>Notes</FormControl.Label>
                <TextArea
                  value={newEntry.notes}
                  onChangeText={(value) => setNewEntry({ ...newEntry, notes: value })}
                  placeholder="Add notes about this time entry"
                  autoCompleteType={undefined}
                />
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowNewEntryModal(false)}
              >
                Cancel
              </Button>
              <Button onPress={handleSaveNewEntry}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default TimeTrackingScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
});
