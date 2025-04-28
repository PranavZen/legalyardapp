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
  Pressable,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Mock data for documents
const MOCK_DOCUMENTS = [
  {
    id: '1',
    title: 'Smith Case Contract',
    description: 'Final contract for Smith vs. Johnson case. This document contains all the terms and conditions agreed upon by both parties.',
    content: 'This is a placeholder for the document content. In a real app, this would be the actual document content or a preview.',
    type: 'pdf',
    size: '2.4 MB',
    createdAt: '2023-05-01',
    updatedAt: '2023-05-10',
    category: 'Contracts',
    tags: ['legal', 'contract', 'smith'],
    caseId: '101',
    caseName: 'Smith vs. Johnson',
    sharedWith: ['Jane Smith', 'Bob Johnson'],
    versions: [
      { id: '1', version: '1.0', date: '2023-05-01', author: 'John Doe' },
      { id: '2', version: '1.1', date: '2023-05-05', author: 'Jane Smith' },
      { id: '3', version: '2.0', date: '2023-05-10', author: 'John Doe' },
    ],
    comments: [
      { id: '1', user: 'Jane Smith', text: 'Please review section 3.2', timestamp: '2023-05-05T10:30:00' },
      { id: '2', user: 'John Doe', text: 'Updated liability clauses', timestamp: '2023-05-08T14:15:00' },
    ],
  },
  {
    id: '2',
    title: 'Johnson Estate Will',
    description: 'Last will and testament for Johnson Estate case. This document outlines the distribution of assets and appointment of executors.',
    content: 'This is a placeholder for the document content. In a real app, this would be the actual document content or a preview.',
    type: 'docx',
    size: '1.8 MB',
    createdAt: '2023-04-15',
    updatedAt: '2023-05-05',
    category: 'Wills',
    tags: ['legal', 'will', 'johnson'],
    caseId: '102',
    caseName: 'Johnson Estate',
    sharedWith: ['Jane Smith'],
    versions: [
      { id: '4', version: '1.0', date: '2023-04-15', author: 'John Doe' },
      { id: '5', version: '1.1', date: '2023-05-05', author: 'John Doe' },
    ],
    comments: [
      { id: '3', user: 'Jane Smith', text: 'Executor information needs updating', timestamp: '2023-04-20T09:15:00' },
    ],
  },
];

const DocumentDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { documentId } = route.params;
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundDocument = MOCK_DOCUMENTS.find((d) => d.id === documentId);
    setDocument(foundDocument);
  }, [documentId]);

  const handleEditDocument = () => {
    navigation.navigate('EditDocument', { documentId: document.id } as never);
  };

  const handleShareDocument = () => {
    // In a real app, this would open a sharing dialog
    toast.show({
      title: 'Sharing options',
      description: 'This would open sharing options in a real app',
      placement: 'top',
      status: 'info',
    });
  };

  const handleDownloadDocument = () => {
    // In a real app, this would download the document
    toast.show({
      title: 'Download started',
      description: `Downloading ${document.title}`,
      placement: 'top',
      status: 'success',
    });
  };

  if (!document) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading document details...</Text>
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
                  document.type === 'pdf'
                    ? 'error'
                    : document.type === 'docx'
                    ? 'primary'
                    : 'gray'
                }
                variant="subtle"
                rounded="full"
              >
                {document.type.toUpperCase()}
              </Badge>
              <Text color="text.tertiary" fontSize="sm">
                {document.size}
              </Text>
            </HStack>

            {/* Title and Description */}
            <VStack space={2}>
              <Heading size="lg" color="text.primary">
                {document.title}
              </Heading>
              <Text color="text.secondary" fontSize="md">
                {document.description}
              </Text>
            </VStack>

            {/* Document Preview */}
            <Box
              bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
              p={4}
              borderRadius="md"
              borderWidth={1}
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
              height={200}
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={
                  <MaterialIcons
                    name={
                      document.type === 'pdf'
                        ? 'picture-as-pdf'
                        : document.type === 'docx'
                        ? 'description'
                        : 'insert-drive-file'
                    }
                  />
                }
                size={16}
                color={
                  document.type === 'pdf'
                    ? 'error.500'
                    : document.type === 'docx'
                    ? 'primary.500'
                    : 'gray.500'
                }
              />
              <Text color="text.secondary" mt={2}>
                Tap to preview document
              </Text>
            </Box>

            <Divider />

            {/* Document Details */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Details
              </Heading>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="folder" />} size={5} color="primary.500" />
                <Text color="text.secondary">Category: {document.category}</Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="label" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Tags: {document.tags.join(', ')}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="gavel" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Related Case: {document.caseName} (#{document.caseId})
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="access-time" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Created: {new Date(document.createdAt).toLocaleDateString()}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={<MaterialIcons name="update" />} size={5} color="primary.500" />
                <Text color="text.secondary">
                  Last Updated: {new Date(document.updatedAt).toLocaleDateString()}
                </Text>
              </HStack>
            </VStack>

            <Divider />

            {/* Shared With */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Shared With ({document.sharedWith.length})
              </Heading>

              {document.sharedWith.length > 0 ? (
                document.sharedWith.map((person, index) => (
                  <HStack
                    key={index}
                    space={3}
                    alignItems="center"
                    bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
                    p={3}
                    borderRadius="md"
                  >
                    <Icon as={<MaterialIcons name="person" />} size={5} color="info.500" />
                    <Text color="text.primary">{person}</Text>
                  </HStack>
                ))
              ) : (
                <Text color="text.tertiary">Not shared with anyone</Text>
              )}

              <Button
                leftIcon={<Icon as={<MaterialIcons name="share" />} size="sm" />}
                variant="outline"
                onPress={handleShareDocument}
              >
                Share Document
              </Button>
            </VStack>

            <Divider />

            {/* Versions */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Versions ({document.versions.length})
              </Heading>

              {document.versions.map((version) => (
                <Pressable
                  key={version.id}
                  onPress={() => console.log('View version:', version.version)}
                >
                  <HStack
                    space={3}
                    alignItems="center"
                    bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
                    p={3}
                    borderRadius="md"
                    justifyContent="space-between"
                  >
                    <HStack space={3} alignItems="center">
                      <Icon as={<MaterialIcons name="history" />} size={5} color="primary.500" />
                      <VStack>
                        <Text color="text.primary" fontWeight="medium">
                          Version {version.version}
                        </Text>
                        <Text color="text.tertiary" fontSize="xs">
                          {new Date(version.date).toLocaleDateString()} by {version.author}
                        </Text>
                      </VStack>
                    </HStack>
                    <Icon
                      as={<MaterialIcons name="file-download" />}
                      size={5}
                      color="primary.500"
                    />
                  </HStack>
                </Pressable>
              ))}
            </VStack>

            <Divider />

            {/* Comments */}
            <VStack space={3}>
              <Heading size="sm" color="text.primary">
                Comments ({document.comments.length})
              </Heading>

              {document.comments.map((comment) => (
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
          colorScheme="primary"
          onPress={handleDownloadDocument}
          leftIcon={<Icon as={<MaterialIcons name="file-download" />} size="sm" />}
        >
          Download
        </Button>
        <IconButton
          ml={2}
          icon={<Icon as={<MaterialIcons name="edit" />} />}
          colorScheme="primary"
          variant="solid"
          onPress={handleEditDocument}
        />
        <IconButton
          ml={2}
          icon={<Icon as={<MaterialIcons name="share" />} />}
          colorScheme="primary"
          variant="solid"
          onPress={handleShareDocument}
        />
      </HStack>
    </Box>
  );
};

export default DocumentDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
