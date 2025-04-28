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

// Mock data for invoices
const MOCK_INVOICES = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    clientName: 'Smith & Co.',
    amount: 1500.00,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-05-15',
    issueDate: '2023-05-01',
    paymentDate: '2023-05-10',
    items: [
      { id: '1', description: 'Legal Consultation', hours: 5, rate: 200, amount: 1000 },
      { id: '2', description: 'Document Preparation', hours: 2.5, rate: 200, amount: 500 },
    ],
    notes: 'Payment received via bank transfer',
    caseId: '101',
    caseName: 'Smith vs. Johnson',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023-002',
    clientName: 'Johnson Estate',
    amount: 2200.00,
    currency: 'USD',
    status: 'pending',
    dueDate: '2023-05-30',
    issueDate: '2023-05-10',
    paymentDate: null,
    items: [
      { id: '3', description: 'Estate Planning', hours: 8, rate: 200, amount: 1600 },
      { id: '4', description: 'Court Filing Fees', hours: null, rate: null, amount: 600 },
    ],
    notes: 'Net 20 payment terms',
    caseId: '102',
    caseName: 'Johnson Estate',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-003',
    clientName: 'Davis LLC',
    amount: 3500.00,
    currency: 'USD',
    status: 'overdue',
    dueDate: '2023-05-05',
    issueDate: '2023-04-15',
    paymentDate: null,
    items: [
      { id: '5', description: 'Contract Review', hours: 10, rate: 200, amount: 2000 },
      { id: '6', description: 'Negotiation Services', hours: 7.5, rate: 200, amount: 1500 },
    ],
    notes: 'Second reminder sent on May 10',
    caseId: '103',
    caseName: 'Davis Contract Dispute',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2023-004',
    clientName: 'Wilson Enterprises',
    amount: 1800.00,
    currency: 'USD',
    status: 'draft',
    dueDate: null,
    issueDate: null,
    paymentDate: null,
    items: [
      { id: '7', description: 'Trademark Registration', hours: 6, rate: 200, amount: 1200 },
      { id: '8', description: 'Research', hours: 3, rate: 200, amount: 600 },
    ],
    notes: 'Draft invoice - pending review',
    caseId: '104',
    caseName: 'Wilson Trademark',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2023-005',
    clientName: 'Brown Family Trust',
    amount: 4200.00,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-04-30',
    issueDate: '2023-04-10',
    paymentDate: '2023-04-25',
    items: [
      { id: '9', description: 'Trust Formation', hours: 15, rate: 200, amount: 3000 },
      { id: '10', description: 'Document Preparation', hours: 6, rate: 200, amount: 1200 },
    ],
    notes: 'Payment received via check',
    caseId: '105',
    caseName: 'Brown Family Trust',
  },
];

const InvoiceListScreen = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, paid, pending, overdue, draft
  const [invoices, setInvoices] = useState(MOCK_INVOICES);

  const filteredInvoices = invoices.filter((invoice) => {
    // Filter by status
    if (filter !== 'all' && invoice.status !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'info';
      case 'overdue':
        return 'error';
      case 'draft':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const renderInvoiceItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('InvoiceDetails', { invoiceId: item.id } as never)}
        mb={2}
      >
        <Box
          bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
          p={4}
          borderRadius="md"
          borderWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <VStack>
              <Text color="text.primary" fontWeight="bold" fontSize="md">
                {item.invoiceNumber}
              </Text>
              <Text color="text.secondary" fontSize="sm">
                {item.clientName}
              </Text>
            </VStack>
            <Badge
              colorScheme={getStatusColor(item.status)}
              variant="subtle"
              rounded="full"
            >
              {item.status.toUpperCase()}
            </Badge>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <Text color="text.primary" fontWeight="bold" fontSize="lg">
              {formatCurrency(item.amount, item.currency)}
            </Text>
            <VStack alignItems="flex-end">
              {item.dueDate && (
                <Text color="text.tertiary" fontSize="xs">
                  Due: {new Date(item.dueDate).toLocaleDateString()}
                </Text>
              )}
              {item.issueDate && (
                <Text color="text.tertiary" fontSize="xs">
                  Issued: {new Date(item.issueDate).toLocaleDateString()}
                </Text>
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
            placeholder="Search invoices..."
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
            <Menu.Item onPress={() => setFilter('all')}>All Invoices</Menu.Item>
            <Menu.Item onPress={() => setFilter('paid')}>Paid</Menu.Item>
            <Menu.Item onPress={() => setFilter('pending')}>Pending</Menu.Item>
            <Menu.Item onPress={() => setFilter('overdue')}>Overdue</Menu.Item>
            <Menu.Item onPress={() => setFilter('draft')}>Drafts</Menu.Item>
          </Menu>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.primary">
            {filter === 'all'
              ? 'All Invoices'
              : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Invoices`}
          </Heading>
          <Text color="text.secondary" fontSize="sm">
            {String(filteredInvoices.length)} invoices
          </Text>
        </HStack>

        <FlatList
          data={filteredInvoices}
          renderItem={renderInvoiceItem}
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
        onPress={() => navigation.navigate('NewInvoice' as never)}
      />
    </Box>
  );
};

export default InvoiceListScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
});
