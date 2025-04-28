import React, { useEffect, useState } from 'react';
import {
  Box,
  ScrollView,
  Heading,
  FormControl,
  Input,
  TextArea,
  Select,
  CheckIcon,
  Button,
  VStack,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
  Icon,
  HStack,
  Text,
  Pressable,
  Badge,
  IconButton,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentById } from '../../../store/slices/documentSlice';
import { RootState } from '../../../store/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
// import * as DocumentPicker from 'react-native-document-picker';

const DocumentFormScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const { id, caseId } = route.params || {};
  const { currentDocument, isLoading, error } = useSelector((state: RootState) => state.documents);
  const { cases } = useSelector((state: RootState) => state.cases);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(caseId || '');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<any>(null);

  // Form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Categories
  const categories = [
    'Legal Documents',
    'Contracts',
    'Correspondence',
    'Evidence',
    'Financial',
    'Corporate',
    'Other',
  ];

  // Load document data if editing
  useEffect(() => {
    if (id) {
      dispatch(fetchDocumentById(id));
    }
  }, [id]);

  // Populate form with document data when available
  useEffect(() => {
    if (id && currentDocument) {
      setTitle(currentDocument.title);
      setDescription(currentDocument.description);
      setCategory(currentDocument.category);
      setSelectedCaseId(currentDocument.caseId || '');
      setTags(currentDocument.tags || []);
    }
  }, [id, currentDocument]);

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

  // Pick document (mock implementation for debugging)
  const pickDocument = () => {
    // Mock file data
    const mockFile = {
      uri: 'file:///mock/path/document.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 1024 * 1024, // 1MB
    };

    setFile(mockFile);

    // Auto-fill title if empty
    if (!title) {
      setTitle('Sample Document');
    }

    toast.show({
      title: "Document selected",
      description: "Sample document selected for debugging",
      placement: "top",
    });
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!id && !file) newErrors.file = "Please select a file";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // In a real app, this would upload the file and save the document
        // For now, we'll just simulate success

        setTimeout(() => {
          toast.show({
            title: id ? "Document updated" : "Document uploaded",
            placement: "top",
          });

          navigation.goBack();
        }, 1500);
      } catch (error) {
        toast.show({
          title: "Error",
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          placement: "top",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading && id) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="primary.500" />
      </Center>
    );
  }

  return (
    <Box flex={1} bg={useColorModeValue("gray.50", "gray.900")} safeArea>
      <ScrollView>
        <Box bg={cardBg} p={4} m={4} rounded="lg" shadow={1}>
          <Heading size="lg" color={textColor} mb={6}>
            {id ? "Edit Document" : "Upload Document"}
          </Heading>

          <VStack space={4}>
            {/* File Upload (only for new documents) */}
            {!id && (
              <FormControl isRequired isInvalid={'file' in errors}>
                <FormControl.Label>Document File</FormControl.Label>
                <Pressable
                  onPress={pickDocument}
                  borderWidth={1}
                  borderColor={file ? "primary.500" : "gray.300"}
                  borderStyle="dashed"
                  borderRadius="md"
                  p={4}
                  bg={file ? "primary.50" : "transparent"}
                  _dark={{
                    bg: file ? "primary.900" : "transparent",
                    borderColor: file ? "primary.500" : "gray.600",
                  }}
                >
                  <VStack space={2} alignItems="center">
                    <Icon
                      as={MaterialCommunityIcons}
                      name={file ? "file-check" : "file-upload"}
                      size="4xl"
                      color={file ? "primary.500" : mutedTextColor}
                    />

                    {file ? (
                      <VStack space={1} alignItems="center">
                        <Text color={textColor} fontWeight="bold">{file.name}</Text>
                        <Text color={mutedTextColor} fontSize="xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                      </VStack>
                    ) : (
                      <Text color={mutedTextColor}>
                        Click to select a document
                      </Text>
                    )}
                  </VStack>
                </Pressable>
                <FormControl.ErrorMessage>
                  {errors.file}
                </FormControl.ErrorMessage>
              </FormControl>
            )}

            {/* Title */}
            <FormControl isRequired isInvalid={'title' in errors}>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                placeholder="Document title"
                value={title}
                onChangeText={setTitle}
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.title}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Description */}
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <TextArea
                placeholder="Document description"
                value={description}
                onChangeText={setDescription}
                autoCompleteType="off"
                h={20}
                size="lg"
              />
            </FormControl>

            {/* Category */}
            <FormControl isRequired isInvalid={'category' in errors}>
              <FormControl.Label>Category</FormControl.Label>
              <Select
                selectedValue={category}
                minWidth="200"
                accessibilityLabel="Choose document category"
                placeholder="Choose document category"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size="5" />
                }}
                size="lg"
                onValueChange={itemValue => setCategory(itemValue)}
              >
                {categories.map((cat) => (
                  <Select.Item key={cat} label={cat} value={cat} />
                ))}
              </Select>
              <FormControl.ErrorMessage>
                {errors.category}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Related Case */}
            <FormControl>
              <FormControl.Label>Related Case (Optional)</FormControl.Label>
              <Select
                selectedValue={selectedCaseId}
                minWidth="200"
                accessibilityLabel="Choose related case"
                placeholder="Choose related case"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size="5" />
                }}
                size="lg"
                onValueChange={itemValue => setSelectedCaseId(itemValue)}
              >
                <Select.Item label="None" value="" />
                {cases.map((caseItem) => (
                  <Select.Item key={caseItem.id} label={caseItem.title} value={caseItem.id} />
                ))}
              </Select>
            </FormControl>

            {/* Tags */}
            <FormControl>
              <FormControl.Label>Tags (Optional)</FormControl.Label>
              <HStack space={2} alignItems="center" mb={2}>
                <Input
                  flex={1}
                  placeholder="Add tags"
                  value={tagInput}
                  onChangeText={setTagInput}
                  onSubmitEditing={addTag}
                  returnKeyType="done"
                />
                <Button onPress={addTag} leftIcon={<Icon as={MaterialCommunityIcons} name="plus" size="sm" />}>
                  Add
                </Button>
              </HStack>

              <HStack flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="primary"
                    m={1}
                    rounded="md"
                    variant="subtle"
                  >
                    <HStack alignItems="center" space={1}>
                      <Text fontSize="xs">{tag}</Text>
                      <IconButton
                        icon={<Icon as={MaterialCommunityIcons} name="close" size="xs" />}
                        size="xs"
                        rounded="full"
                        onPress={() => removeTag(index)}
                      />
                    </HStack>
                  </Badge>
                ))}
              </HStack>
            </FormControl>

            {/* Submit Button */}
            <Button
              mt={6}
              colorScheme="primary"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              isLoadingText={id ? "Updating" : "Uploading"}
              size="lg"
            >
              {id ? "Update Document" : "Upload Document"}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DocumentFormScreen;
