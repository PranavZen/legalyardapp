import React, { useEffect, useState } from 'react';
import {
  Box,
  ScrollView,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
  IconButton,
  Menu,
  Pressable,
  AlertDialog,
  Flex,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentById, removeDocument } from '../../../store/slices/documentSlice';
import { RootState } from '../../../store/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DocumentDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const { id } = route.params;
  const { currentDocument, isLoading, error } = useSelector((state: RootState) => state.documents);

  // Delete confirmation dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cancelRef = React.useRef(null);

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = () => {
    dispatch(fetchDocumentById(id));
  };

  const handleEdit = () => {
    navigation.navigate('DocumentForm', { id });
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleteOpen(false);
    try {
      await dispatch(removeDocument(id));
      toast.show({
        title: "Document deleted",
        placement: "top",
      });
      navigation.goBack();
    } catch (error) {
      toast.show({
        title: "Error",
        description: "Failed to delete document",
        placement: "top",
      });
    }
  };

  const handleShare = () => {
    navigation.navigate('DocumentShare', { id });
  };

  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return { name: 'file-pdf-box', color: 'red.500' };
      case 'docx':
      case 'doc':
        return { name: 'file-word-box', color: 'blue.500' };
      case 'xlsx':
      case 'xls':
        return { name: 'file-excel-box', color: 'green.500' };
      case 'pptx':
      case 'ppt':
        return { name: 'file-powerpoint-box', color: 'orange.500' };
      case 'jpg':
      case 'jpeg':
      case 'png':
        return { name: 'file-image-box', color: 'purple.500' };
      default:
        return { name: 'file-document-box', color: 'gray.500' };
    }
  };

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.show({
        title: "Error",
        description: error,
        placement: "top",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="primary.500" />
      </Center>
    );
  }

  if (!currentDocument) {
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
          Document not found
        </Text>
        <Button mt={4} onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </Center>
    );
  }

  const docIcon = getDocumentIcon(currentDocument.type);
  const formattedCreatedDate = new Date(currentDocument.createdAt).toLocaleDateString();
  const formattedUpdatedDate = new Date(currentDocument.updatedAt).toLocaleDateString();

  return (
    <Box flex={1} bg={useColorModeValue("gray.50", "gray.900")} safeArea>
      <ScrollView>
        {/* Header section */}
        <Box bg={cardBg} p={4} mb={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color={textColor}>{currentDocument.title}</Heading>
            <Menu
              w="190"
              trigger={triggerProps => {
                return (
                  <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="dots-vertical"
                      size="lg"
                      color={mutedTextColor}
                    />
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={handleEdit}>
                <HStack alignItems="center">
                  <Icon as={MaterialCommunityIcons} name="pencil" size="sm" color={textColor} mr={2} />
                  <Text color={textColor}>Edit Document</Text>
                </HStack>
              </Menu.Item>
              <Menu.Item onPress={handleShare}>
                <HStack alignItems="center">
                  <Icon as={MaterialCommunityIcons} name="share-variant" size="sm" color={textColor} mr={2} />
                  <Text color={textColor}>Share Document</Text>
                </HStack>
              </Menu.Item>
              <Menu.Item onPress={handleDelete}>
                <HStack alignItems="center">
                  <Icon as={MaterialCommunityIcons} name="delete" size="sm" color="red.500" mr={2} />
                  <Text color="red.500">Delete Document</Text>
                </HStack>
              </Menu.Item>
            </Menu>
          </HStack>

          <Center mb={6}>
            <Icon
              as={MaterialCommunityIcons}
              name={docIcon.name}
              color={docIcon.color}
              size="6xl"
            />
            <HStack mt={2} alignItems="center" space={1}>
              <Text color={mutedTextColor} fontSize="md" textTransform="uppercase" fontWeight="bold">
                {String(currentDocument.type)}
              </Text>
              <Text color={mutedTextColor} fontSize="md">•</Text>
              <Text color={mutedTextColor} fontSize="md">{String(currentDocument.size)}</Text>
            </HStack>
          </Center>

          <Divider my={2} />

          <VStack space={3} mt={2}>
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
                Last Updated: {formattedUpdatedDate}
              </Text>
            </HStack>

            {currentDocument.caseName && (
              <HStack alignItems="center">
                <Icon
                  as={MaterialCommunityIcons}
                  name="briefcase"
                  color={mutedTextColor}
                  size="sm"
                  mr={2}
                />
                <Text fontSize="sm" color={textColor}>
                  Related Case: {currentDocument.caseName}
                </Text>
              </HStack>
            )}
          </VStack>
        </Box>

        {/* Description section */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="md" color={textColor} mb={2}>Description</Heading>
          <Text color={textColor}>{currentDocument.description}</Text>
        </Box>

        {/* Details section */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="md" color={textColor} mb={4}>Details</Heading>

          <HStack justifyContent="space-between" mb={3}>
            <Text color={mutedTextColor} fontSize="sm">Category</Text>
            <Text color={textColor} fontSize="sm" fontWeight="medium">{currentDocument.category}</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent="space-between" mb={3}>
            <Text color={mutedTextColor} fontSize="sm">Shared With</Text>
            <VStack alignItems="flex-end">
              {currentDocument.sharedWith.length > 0 ? (
                currentDocument.sharedWith.map((userId, index) => (
                  <HStack key={index} alignItems="center">
                    <Icon
                      as={MaterialCommunityIcons}
                      name="account"
                      color="primary.500"
                      size="xs"
                      mr={1}
                    />
                    <Text color={textColor} fontSize="sm">User {String(userId)}</Text>
                  </HStack>
                ))
              ) : (
                <Text color={textColor} fontSize="sm">Not shared</Text>
              )}
            </VStack>
          </HStack>

          <Divider my={2} />

          <VStack space={2}>
            <Text color={mutedTextColor} fontSize="sm">Tags</Text>
            <Flex direction="row" wrap="wrap">
              {currentDocument.tags.map((tag, index) => (
                <Badge
                  key={index}
                  colorScheme="primary"
                  variant="subtle"
                  rounded="md"
                  m={1}
                >
                  <Text fontSize="xs">{tag}</Text>
                </Badge>
              ))}
            </Flex>
          </VStack>
        </Box>

        {/* Versions section */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="md" color={textColor} mb={4}>Versions</Heading>

          {currentDocument.versions.map((version, index) => (
            <Box
              key={index}
              bg={sectionBg}
              p={3}
              rounded="md"
              mb={2}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text color={textColor} fontSize="sm" fontWeight="bold">
                    Version {String(version.version)}
                  </Text>
                  <Text color={mutedTextColor} fontSize="xs">
                    {new Date(version.date).toLocaleDateString()} by User {String(version.author)}
                  </Text>
                </VStack>
                <IconButton
                  icon={<Icon as={MaterialCommunityIcons} name="download" size="sm" color="primary.500" />}
                  variant="ghost"
                  onPress={() => {
                    toast.show({
                      title: "Download started",
                      description: `Downloading version ${version.version}`,
                      placement: "top",
                    });
                  }}
                />
              </HStack>
            </Box>
          ))}
        </Box>

        {/* Action buttons */}
        <HStack space={4} p={4} mb={4}>
          <Button
            flex={1}
            leftIcon={<Icon as={MaterialCommunityIcons} name="download" size="sm" />}
            onPress={() => {
              toast.show({
                title: "Download started",
                description: "Downloading latest version",
                placement: "top",
              });
            }}
          >
            Download
          </Button>

          <Button
            flex={1}
            leftIcon={<Icon as={MaterialCommunityIcons} name="share-variant" size="sm" />}
            onPress={handleShare}
          >
            Share
          </Button>
        </HStack>
      </ScrollView>

      {/* Delete confirmation dialog */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Document</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this document? This action cannot be undone.
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

export default DocumentDetailScreen;
