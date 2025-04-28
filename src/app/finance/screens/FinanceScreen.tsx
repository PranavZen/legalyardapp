import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, VStack, HStack, Pressable, Icon, useColorMode } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FinanceScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'background.primary' : 'white'} p={4}>
      <VStack space={6}>
        <Heading size="xl" color="primary.500">
          Finance
        </Heading>

        <VStack space={4}>
          <Pressable
            onPress={() => navigation.navigate('InvoiceList' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="receipt" />} size={6} color="primary.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Invoices
                </Heading>
                <Text color="text.secondary">Manage client invoices</Text>
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
            onPress={() => navigation.navigate('TimeTracking' as never)}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="timer" />} size={6} color="info.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Time Tracking
                </Heading>
                <Text color="text.secondary">Track billable hours</Text>
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
            onPress={() => console.log('Reports pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="bar-chart" />} size={6} color="success.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Reports
                </Heading>
                <Text color="text.secondary">Financial reports and analytics</Text>
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
            onPress={() => console.log('Expenses pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="account-balance-wallet" />} size={6} color="warning.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Expenses
                </Heading>
                <Text color="text.secondary">Track and manage expenses</Text>
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
            onPress={() => console.log('Payments pressed')}
            bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
            p={4}
            borderRadius="md"
          >
            <HStack alignItems="center" space={4}>
              <Icon as={<MaterialIcons name="payment" />} size={6} color="error.500" />
              <VStack>
                <Heading size="sm" color="text.primary">
                  Payments
                </Heading>
                <Text color="text.secondary">Process and track payments</Text>
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

export default FinanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
