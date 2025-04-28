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
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Mock data for documents
const MOCK_DOCUMENTS = [
  {
    id: '1',
    title: 'Smith Case Contract',
    description: 'Final contract for Smith vs. Johnson case',
    type: 'pdf',
    size: '2.4 MB',
    createdAt: '2023-05-01',
    updatedAt: '2023-05-10',
    category: 'Contracts',
    tags: ['legal', 'contract', 'smith'],
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    sharedWith: ['Jane Smith', 'Bob Johnson'],
  },
  {
    id: '2',
    title: 'Johnson Estate Will',
    description: 'Last will and testament for Johnson Estate case',
    type: 'docx',
    size: '1.8 MB',
    createdAt: '2023-04-15',
    updatedAt: '2023-05-05',
    category: 'Wills',
    tags: ['legal', 'will', 'johnson'],
    caseId: '102',
    caseName: 'Johnson Estate',
    sharedWith: ['Jane Smith'],
  },
  {
    id: '3',
    title: 'Meeting Notes - May 5',
    description: 'Notes from client meeting on May 5th',
    type: 'docx',
    size: '0.8 MB',
    createdAt: '2023-05-05',
    updatedAt: '2023-05-05',
    category: 'Notes',
    tags: ['meeting', 'notes', 'smith'],
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    sharedWith: [],
  },
  {
    id: '4',
    title: 'Motion for Extension',
    description: 'Motion for extension of time in Johnson case',
    type: 'pdf',
    size: '3.2 MB',
    createdAt: '2023-05-03',
    updatedAt: '2023-05-11',
    category: 'Court Filings',
    tags: ['legal', 'motion', 'johnson'],
    caseId: '102',
    caseName: 'Johnson Estate',
    sharedWith: ['Jane Smith', 'Bob Johnson'],
  },
  {
    id: '5',
    title: 'Client Information Form',
    description: 'New client information form for Smith',
    type: 'pdf',
    size: '1.1 MB',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    category: 'Forms',
    tags: ['form', 'client', 'smith'],
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    sharedWith: [],
  },
];

const DocumentListScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, pdf, docx, etc.
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  const filteredDocuments = documents.filter((doc) => {
    // Filter by type
    if (filter !== 'all' && doc.type !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  const renderDocumentItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('DocumentDetail', { id: item.id } as never)}
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
            <Icon
              as={
                <MaterialIcons
                  name={
                    item.type === 'pdf'
                      ? 'picture-as-pdf'
                      : item.type === 'docx'
                      ? 'description'
                      : 'insert-drive-file'
                  }
                />
              }
              size={10}
              color={
                item.type === 'pdf'
                  ? 'error.500'
                  : item.type === 'docx'
                  ? 'primary.500'
                  : 'gray.500'
              }
            />
            <VStack flex={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="text.primary" fontWeight="medium" fontSize="md">
                  {item.title}
                </Text>
                <Badge colorScheme="info" variant="subtle" rounded="full">
                  {item.type.toUpperCase()}
                </Badge>
              </HStack>
              <Text color="text.secondary" fontSize="sm" numberOfLines={2}>
                {item.description}
              </Text>
              <HStack justifyContent="space-between" mt={2}>
                <Text color="text.tertiary" fontSize="xs">
                  {String(item.size)} • {new Date(item.updatedAt).toLocaleDateString()}
                </Text>
                <Text color="text.tertiary" fontSize="xs">
                  {item.category}
                </Text>
              </HStack>
              {item.sharedWith.length > 0 && (
                <HStack mt={1} space={1} alignItems="center">
                  <Icon as={<MaterialIcons name="people" />} size={3} color="info.500" />
                  <Text color="info.500" fontSize="2xs">
                    Shared with {item.sharedWith.length} people
                  </Text>
                </HStack>
              )}
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
            placeholder="Search documents..."
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
            <Menu.Item onPress={() => setFilter('all')}>All Documents</Menu.Item>
            <Menu.Item onPress={() => setFilter('pdf')}>PDF Files</Menu.Item>
            <Menu.Item onPress={() => setFilter('docx')}>Word Documents</Menu.Item>
          </Menu>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.primary">
            {filter === 'all'
              ? 'All Documents'
              : filter === 'pdf'
              ? 'PDF Documents'
              : 'Word Documents'}
          </Heading>
          <Text color="text.secondary" fontSize="sm">
            {filteredDocuments.length} documents
          </Text>
        </HStack>

        <FlatList
          data={filteredDocuments}
          renderItem={renderDocumentItem}
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
        onPress={() => navigation.navigate('DocumentForm' as never)}
      />
    </Box>
  );
};

export default DocumentListScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
});
