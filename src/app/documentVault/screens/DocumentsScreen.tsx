import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, VStack, HStack, Pressable, Icon, useColorMode } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DocumentsScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'} p={4}>
      <VStack space={6}>
        <Heading size="xl" color="primary.500">
          Documents
        </Heading>

        <VStack space={4}>
          <Pressable
            onPress={() => navigation.navigate('DocumentList' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="folder" />} size={6} color="primary.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  All Documents
                </Heading>
                <Text color="text.secondary">View all your documents</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => console.log('Recent Documents pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="history" />} size={6} color="info.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Recent
                </Heading>
                <Text color="text.secondary">Recently accessed documents</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => console.log('Shared Documents pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="people" />} size={6} color="success.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Shared
                </Heading>
                <Text color="text.secondary">Documents shared with you</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => console.log('Templates pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="description" />} size={6} color="warning.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Templates
                </Heading>
                <Text color="text.secondary">Document templates</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => console.log('Scan Document pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="document-scanner" />} size={6} color="error.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Scan Document
                </Heading>
                <Text color="text.secondary">Scan and digitize documents</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => console.log('AI Document Analysis pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="psychology" />} size={6} color="primary.700" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  AI Analysis
                </Heading>
                <Text color="text.secondary">Analyze documents with AI</Text>
              </VStack>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>
        </VStack>
      </VStack>
    </Box>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
