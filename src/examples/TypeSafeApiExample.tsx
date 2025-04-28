import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { get, getArray } from '../services/api/apiClient';

// Define the shape of our data
interface Contact {
  id: string;           // Should be a string even if it's all digits
  name: string;
  phoneNumber: string;  // Should be a string even if it's all digits
  age: number;          // Should be a number
  zipCode: string;      // Should be a string even if it's all digits
}

// Define the field types for our API response
const contactFieldTypes = {
  id: 'string',
  name: 'string',
  phoneNumber: 'string',
  age: 'number',
  zipCode: 'string',
};

const TypeSafeApiExample: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch contacts with type preservation
    const fetchContacts = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be a real API endpoint
        // For this example, we're using a mock endpoint
        const data = await getArray<Contact>(
          '/contacts',
          undefined,
          contactFieldTypes  // Pass the field types to ensure proper type conversion
        );
        
        setContacts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // For demonstration purposes, let's log the types of our data
  useEffect(() => {
    if (contacts.length > 0) {
      const firstContact = contacts[0];
      console.log('Contact data types:');
      console.log('id:', typeof firstContact.id);
      console.log('name:', typeof firstContact.name);
      console.log('phoneNumber:', typeof firstContact.phoneNumber);
      console.log('age:', typeof firstContact.age);
      console.log('zipCode:', typeof firstContact.zipCode);
    }
  }, [contacts]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text>Phone: {item.phoneNumber}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Zip Code: {item.zipCode}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactCard: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 24,
    color: '#666',
  },
});

export default TypeSafeApiExample;
