import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
  Avatar,
  Divider,
  Switch,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '../../../store/types';
import { useTheme } from '../../../themes/ThemeContext';
import { logout } from '../../../store/slices/authSlice';

const MoreScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'} p={4}>
      <VStack space={6}>
        <Heading size="xl" color="primary.500">
          More
        </Heading>

        {/* User Profile Section */}
        <Pressable
          onPress={() => navigation.navigate('Profile' as never)}
          bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
          p={4}
          borderRadius="md"
        >
          <HStack space={4} alignItems="center">
            <Avatar
              size="md"
              bg="primary.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <VStack>
              <Heading size="sm" color="text.primary">
                {user?.name || 'User'}
              </Heading>
              <Text color="text.secondary">{user?.email || 'user@example.com'}</Text>
              <Text color="primary.500" fontSize="xs" mt={1}>
                {user?.subscription === 'premium'
                  ? 'Premium Subscription'
                  : user?.subscription === 'enterprise'
                  ? 'Enterprise Subscription'
                  : 'Free Account'}
              </Text>
            </VStack>
            <Icon
              as={<MaterialIcons name="chevron-right" />}
              size={6}
              color="text.tertiary"
              ml="auto"
            />
          </HStack>
        </Pressable>

        <Divider />

        {/* Settings Section */}
        <VStack space={4}>
          <Heading size="md" color="text.primary">
            Settings
          </Heading>

          <Pressable
            onPress={() => navigation.navigate('Settings' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="settings" />} size={6} color="primary.500" />
              <Text color="text.primary" fontWeight="medium">
                App Settings
              </Text>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Notifications' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="notifications" />} size={6} color="warning.500" />
              <Text color="text.primary" fontWeight="medium">
                Notifications
              </Text>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name={isDarkMode ? 'dark-mode' : 'light-mode'} />}
                  size={6}
                  color="info.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Dark Mode
                </Text>
              </HStack>
              <Switch
                isChecked={isDarkMode}
                onToggle={toggleTheme}
                colorScheme="primary"
              />
            </HStack>
          </Box>
        </VStack>

        <Divider />

        {/* Support Section */}
        <VStack space={4}>
          <Heading size="md" color="text.primary">
            Support
          </Heading>

          <Pressable
            onPress={() => navigation.navigate('Help' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="help" />} size={6} color="success.500" />
              <Text color="text.primary" fontWeight="medium">
                Help & Support
              </Text>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('About' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="info" />} size={6} color="error.500" />
              <Text color="text.primary" fontWeight="medium">
                About
              </Text>
              <Icon
                as={<MaterialIcons name="chevron-right" />}
                size={6}
                color="text.tertiary"
                ml="auto"
              />
            </HStack>
          </Pressable>
        </VStack>

        <Divider />

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
          p={4}
          borderRadius="md"
        >
          <HStack alignItems="center" space={4}>
            <Icon as={<MaterialIcons name="logout" />} size={6} color="error.500" />
            <Text color="error.500" fontWeight="medium">
              Logout
            </Text>
          </HStack>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
