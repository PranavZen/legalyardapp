import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  useColorMode,
  Switch,
  Select,
  Divider,
  Button,
  useToast,
  FormControl,
  Radio,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../themes/ThemeContext';

const SettingsScreen = () => {
  const { colorMode } = useColorMode();
  const { isDarkMode, toggleTheme } = useTheme();
  const toast = useToast();

  // App settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');

  // Security settings
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [autoLockTime, setAutoLockTime] = useState('5m');

  // Data settings
  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('15m');
  const [dataUsage, setDataUsage] = useState('wifi');

  const handleSaveSettings = () => {
    // In a real app, this would save settings to storage or API
    toast.show({
      title: 'Settings Saved',
      status: 'success',
      placement: 'top',
    });
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'} p={4}>
      <VStack space={6}>
        {/* App Settings */}
        <VStack space={4}>
          <Heading size="md" color="text.primary">
            App Settings
          </Heading>

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

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="notifications" />}
                  size={6}
                  color="warning.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Push Notifications
                </Text>
              </HStack>
              <Switch
                isChecked={notificationsEnabled}
                onToggle={setNotificationsEnabled}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={6}
                  color="primary.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Email Notifications
                </Text>
              </HStack>
              <Switch
                isChecked={emailNotificationsEnabled}
                onToggle={setEmailNotificationsEnabled}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="volume-up" />}
                  size={6}
                  color="success.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Sound Effects
                </Text>
              </HStack>
              <Switch
                isChecked={soundEnabled}
                onToggle={setSoundEnabled}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          <FormControl>
            <FormControl.Label>Language</FormControl.Label>
            <Select
              selectedValue={language}
              minWidth="200"
              accessibilityLabel="Choose Language"
              placeholder="Select language"
              onValueChange={(value) => setLanguage(value)}
              _selectedItem={{
                bg: 'primary.100',
              }}
            >
              <Select.Item label="English" value="en" />
              <Select.Item label="Spanish" value="es" />
              <Select.Item label="French" value="fr" />
              <Select.Item label="German" value="de" />
              <Select.Item label="Chinese" value="zh" />
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label>Currency</FormControl.Label>
            <Select
              selectedValue={currency}
              minWidth="200"
              accessibilityLabel="Choose Currency"
              placeholder="Select currency"
              onValueChange={(value) => setCurrency(value)}
              _selectedItem={{
                bg: 'primary.100',
              }}
            >
              <Select.Item label="USD ($)" value="USD" />
              <Select.Item label="EUR (€)" value="EUR" />
              <Select.Item label="GBP (£)" value="GBP" />
              <Select.Item label="JPY (¥)" value="JPY" />
              <Select.Item label="CAD (C$)" value="CAD" />
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label>Date Format</FormControl.Label>
            <Select
              selectedValue={dateFormat}
              minWidth="200"
              accessibilityLabel="Choose Date Format"
              placeholder="Select date format"
              onValueChange={(value) => setDateFormat(value)}
              _selectedItem={{
                bg: 'primary.100',
              }}
            >
              <Select.Item label="MM/DD/YYYY" value="MM/DD/YYYY" />
              <Select.Item label="DD/MM/YYYY" value="DD/MM/YYYY" />
              <Select.Item label="YYYY-MM-DD" value="YYYY-MM-DD" />
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label>Time Format</FormControl.Label>
            <Radio.Group
              name="timeFormat"
              value={timeFormat}
              onChange={(value) => setTimeFormat(value)}
            >
              <HStack space={4}>
                <Radio value="12h" my={1}>
                  12-hour (AM/PM)
                </Radio>
                <Radio value="24h" my={1}>
                  24-hour
                </Radio>
              </HStack>
            </Radio.Group>
          </FormControl>
        </VStack>

        <Divider />

        {/* Security Settings */}
        <VStack space={4}>
          <Heading size="md" color="text.primary">
            Security
          </Heading>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="fingerprint" />}
                  size={6}
                  color="primary.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Biometric Authentication
                </Text>
              </HStack>
              <Switch
                isChecked={biometricEnabled}
                onToggle={setBiometricEnabled}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={6}
                  color="warning.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Auto-Lock
                </Text>
              </HStack>
              <Switch
                isChecked={autoLockEnabled}
                onToggle={setAutoLockEnabled}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          {autoLockEnabled && (
            <FormControl>
              <FormControl.Label>Auto-Lock After</FormControl.Label>
              <Select
                selectedValue={autoLockTime}
                minWidth="200"
                accessibilityLabel="Choose Auto-Lock Time"
                placeholder="Select time"
                onValueChange={(value) => setAutoLockTime(value)}
                _selectedItem={{
                  bg: 'primary.100',
                }}
              >
                <Select.Item label="1 minute" value="1m" />
                <Select.Item label="5 minutes" value="5m" />
                <Select.Item label="15 minutes" value="15m" />
                <Select.Item label="30 minutes" value="30m" />
                <Select.Item label="1 hour" value="1h" />
              </Select>
            </FormControl>
          )}

          <Button
            colorScheme="primary"
            variant="outline"
            onPress={() => console.log('Change Password')}
          >
            Change Password
          </Button>
        </VStack>

        <Divider />

        {/* Data Settings */}
        <VStack space={4}>
          <Heading size="md" color="text.primary">
            Data & Sync
          </Heading>

          <Box
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center" space={4}>
                <Icon
                  as={<MaterialIcons name="sync" />}
                  size={6}
                  color="success.500"
                />
                <Text color="text.primary" fontWeight="medium">
                  Auto-Sync
                </Text>
              </HStack>
              <Switch
                isChecked={autoSync}
                onToggle={setAutoSync}
                colorScheme="primary"
              />
            </HStack>
          </Box>

          {autoSync && (
            <FormControl>
              <FormControl.Label>Sync Frequency</FormControl.Label>
              <Select
                selectedValue={syncFrequency}
                minWidth="200"
                accessibilityLabel="Choose Sync Frequency"
                placeholder="Select frequency"
                onValueChange={(value) => setSyncFrequency(value)}
                _selectedItem={{
                  bg: 'primary.100',
                }}
              >
                <Select.Item label="5 minutes" value="5m" />
                <Select.Item label="15 minutes" value="15m" />
                <Select.Item label="30 minutes" value="30m" />
                <Select.Item label="1 hour" value="1h" />
                <Select.Item label="4 hours" value="4h" />
              </Select>
            </FormControl>
          )}

          <FormControl>
            <FormControl.Label>Data Usage</FormControl.Label>
            <Radio.Group
              name="dataUsage"
              value={dataUsage}
              onChange={(value) => setDataUsage(value)}
            >
              <VStack space={2}>
                <Radio value="wifi" my={1}>
                  Wi-Fi Only
                </Radio>
                <Radio value="all" my={1}>
                  Wi-Fi & Cellular Data
                </Radio>
              </VStack>
            </Radio.Group>
          </FormControl>

          <Button
            colorScheme="primary"
            onPress={() => console.log('Sync Now')}
            leftIcon={<Icon as={<MaterialIcons name="sync" />} size="sm" />}
          >
            Sync Now
          </Button>

          <Button
            colorScheme="error"
            variant="outline"
            onPress={() => console.log('Clear Cache')}
            leftIcon={<Icon as={<MaterialIcons name="delete" />} size="sm" />}
          >
            Clear Cache
          </Button>
        </VStack>

        <Button
          colorScheme="primary"
          size="lg"
          onPress={handleSaveSettings}
          mt={4}
        >
          Save Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
