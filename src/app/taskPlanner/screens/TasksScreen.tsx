import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, VStack, HStack, Pressable, Icon, useColorMode } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const TasksScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'} p={4}>
      <VStack space={6}>
        <Heading size="xl" color="primary.500">
          Tasks
        </Heading>

        <VStack space={4}>
          <Pressable
            onPress={() => navigation.navigate('TaskList' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="check-circle" />} size={6} color="primary.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  My Tasks
                </Heading>
                <Text color="text.secondary">View and manage your tasks</Text>
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
            onPress={() => console.log('Calendar pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="calendar-today" />} size={6} color="info.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Calendar
                </Heading>
                <Text color="text.secondary">View tasks on calendar</Text>
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
            onPress={() => console.log('Deadlines pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="timer" />} size={6} color="error.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Deadlines
                </Heading>
                <Text color="text.secondary">View upcoming deadlines</Text>
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
            onPress={() => console.log('Team Tasks pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="people" />} size={6} color="success.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Team Tasks
                </Heading>
                <Text color="text.secondary">View team assignments</Text>
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
            onPress={() => console.log('Reminders pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="notifications" />} size={6} color="warning.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Reminders
                </Heading>
                <Text color="text.secondary">Set and manage reminders</Text>
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

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
