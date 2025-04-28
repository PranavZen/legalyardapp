import React, { useEffect, useState } from 'react';
import {
  Box,
  ScrollView,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
  Input,
  Button,
  Checkbox,
  Divider,
  Avatar,
  IconButton,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentById } from '../../../store/slices/documentSlice';
import { RootState } from '../../../store/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Clipboard } from 'react-native';

const DocumentShareScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const { id } = route.params;
  const { currentDocument, isLoading, error } = useSelector((state: RootState) => state.documents);

  // Share state
  const [email, setEmail] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState('');

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Mock users
  const users = [
    { id: '1', name: 'Jane Doe', email: 'jane@example.com', role: 'Attorney' },
    { id: '2', name: 'John Smith', email: 'john@example.com', role: 'Paralegal' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Finance Manager' },
    { id: '4', name: 'Michael Brown', email: 'michael@example.com', role: 'Attorney' },
  ];

  useEffect(() => {
    loadDocument();
  }, [id]);

  useEffect(() => {
    if (currentDocument) {
      // Initialize selected users from document's sharedWith
      setSelectedUsers(currentDocument.sharedWith || []);

      // Generate a mock share link
      const baseUrl = 'https://legalyard.com/shared/';
      const randomString = Math.random().toString(36).substring(2, 10);
      setShareLink(`${baseUrl}${randomString}`);
    }
  }, [currentDocument]);

  const loadDocument = () => {
    dispatch(fetchDocumentById(id));
  };

  // Handle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle share by email
  const handleShareByEmail = () => {
    if (!email.trim()) {
      toast.show({
        title: "Error",
        description: "Please enter an email address",
        placement: "top",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');

      toast.show({
        title: "Invitation sent",
        description: `Invitation sent to ${email}`,
        placement: "top",
      });
    }, 1000);
  };

  // Handle share with selected users
  const handleShareWithUsers = () => {
    if (selectedUsers.length === 0) {
      toast.show({
        title: "Error",
        description: "Please select at least one user",
        placement: "top",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      toast.show({
        title: "Document shared",
        description: `Document shared with ${selectedUsers.length} users`,
        placement: "top",
      });

      navigation.goBack();
    }, 1000);
  };

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    Clipboard.setString(shareLink);

    toast.show({
      title: "Link copied",
      description: "Share link copied to clipboard",
      placement: "top",
    });
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

  const docIcon = getDocumentIcon(currentDocument.type);

  return (
    <Box flex={1} bg={useColorModeValue("gray.50", "gray.900")} safeArea>
      <ScrollView>
        {/* Document info */}
        <Box bg={cardBg} p={4} mb={4}>
          <HStack space={3} alignItems="center">
            <Icon
              as={MaterialCommunityIcons}
              name={docIcon.name}
              color={docIcon.color}
              size="xl"
            />
            <VStack flex={1}>
              <Heading size="md" color={textColor}>{currentDocument.title}</Heading>
              <HStack alignItems="center" space={1}>
                <Text color={mutedTextColor} fontSize="xs" textTransform="uppercase">
                  {currentDocument.type}
                </Text>
                <Text color={mutedTextColor} fontSize="xs">•</Text>
                <Text color={mutedTextColor} fontSize="xs">{currentDocument.size}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Share link */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="sm" color={textColor} mb={4}>Share Link</Heading>

          <HStack space={2} alignItems="center">
            <Input
              flex={1}
              value={shareLink}
              isReadOnly
              size="md"
            />
            <IconButton
              icon={<Icon as={MaterialCommunityIcons} name="content-copy" size="sm" />}
              onPress={copyLinkToClipboard}
            />
          </HStack>

          <Text color={mutedTextColor} fontSize="xs" mt={2}>
            Anyone with this link can view this document
          </Text>
        </Box>

        {/* Share by email */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="sm" color={textColor} mb={4}>Share by Email</Heading>

          <HStack space={2} alignItems="center">
            <Input
              flex={1}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              size="md"
            />
            <Button
              leftIcon={<Icon as={MaterialCommunityIcons} name="email-outline" size="sm" />}
              onPress={handleShareByEmail}
              isLoading={isSubmitting}
            >
              Send
            </Button>
          </HStack>
        </Box>

        {/* Share with users */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="sm" color={textColor} mb={4}>Share with Team Members</Heading>

          <VStack space={3}>
            {users.map((user) => (
              <HStack key={user.id} alignItems="center" space={3}>
                <Checkbox
                  value={user.id}
                  isChecked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  accessibilityLabel={`Select ${user.name}`}
                />
                <Avatar size="sm" bg="primary.500">
                  {user.name.substring(0, 2).toUpperCase()}
                </Avatar>
                <VStack flex={1}>
                  <Text color={textColor} fontWeight="medium">{user.name}</Text>
                  <Text color={mutedTextColor} fontSize="xs">{user.role}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>

          <Button
            mt={4}
            leftIcon={<Icon as={MaterialCommunityIcons} name="share-variant" size="sm" />}
            onPress={handleShareWithUsers}
            isLoading={isSubmitting}
          >
            Share with Selected
          </Button>
        </Box>

        {/* Currently shared with */}
        <Box bg={cardBg} p={4} mb={4}>
          <Heading size="sm" color={textColor} mb={4}>Currently Shared With</Heading>

          {currentDocument.sharedWith && currentDocument.sharedWith.length > 0 ? (
            <VStack space={3}>
              {currentDocument.sharedWith.map((userId) => {
                const user = users.find(u => u.id === userId);
                return (
                  <HStack key={userId} alignItems="center" space={3}>
                    <Avatar size="sm" bg="primary.500">
                      {user ? user.name.substring(0, 2).toUpperCase() : userId.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <VStack flex={1}>
                      <Text color={textColor} fontWeight="medium">
                        {user ? user.name : `User ${userId}`}
                      </Text>
                      <Text color={mutedTextColor} fontSize="xs">
                        {user ? user.role : 'Team Member'}
                      </Text>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
          ) : (
            <Text color={mutedTextColor} textAlign="center">
              This document is not shared with anyone yet
            </Text>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DocumentShareScreen;
