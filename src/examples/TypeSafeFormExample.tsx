import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useForm from '../hooks/useForm';

interface ContactFormValues {
  name: string;
  phoneNumber: string;  // Should always remain a string even if all digits
  age: number;          // Should be converted to a number
  zipCode: string;      // Should always remain a string even if all digits
}

const TypeSafeFormExample: React.FC = () => {
  const initialValues: ContactFormValues = {
    name: '',
    phoneNumber: '',
    age: 0,
    zipCode: '',
  };

  const validateForm = (values: ContactFormValues) => {
    const errors: Record<string, string> = {};
    
    if (!values.name) {
      errors.name = 'Name is required';
    }
    
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (!values.age) {
      errors.age = 'Age is required';
    } else if (values.age < 18) {
      errors.age = 'You must be at least 18 years old';
    }
    
    if (!values.zipCode) {
      errors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}$/.test(values.zipCode)) {
      errors.zipCode = 'Zip code must be 5 digits';
    }
    
    return errors;
  };

  const handleSubmit = (values: ContactFormValues) => {
    // In a real app, you would submit the form data to an API
    console.log('Form submitted with values:', values);
    console.log('Types:', {
      name: typeof values.name,
      phoneNumber: typeof values.phoneNumber,
      age: typeof values.age,
      zipCode: typeof values.zipCode,
    });
    
    // This will show that phoneNumber and zipCode are strings
    // even though they contain only digits
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit: submitForm } = useForm<ContactFormValues>({
    initialValues,
    validate: validateForm,
    onSubmit: handleSubmit,
    fieldTypes: {
      name: 'string',
      phoneNumber: 'string',  // Explicitly mark as string to prevent conversion to number
      age: 'number',          // Will be converted to number
      zipCode: 'string',      // Explicitly mark as string to prevent conversion to number
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Form</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          onBlur={() => handleBlur('name')}
          placeholder="Enter your name"
        />
        {touched.name && errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={values.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
          onBlur={() => handleBlur('phoneNumber')}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        {touched.phoneNumber && errors.phoneNumber ? (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        ) : null}
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={values.age.toString()}
          onChangeText={(text) => handleChange('age', text)}
          onBlur={() => handleBlur('age')}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
        {touched.age && errors.age ? (
          <Text style={styles.errorText}>{errors.age}</Text>
        ) : null}
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          value={values.zipCode}
          onChangeText={(text) => handleChange('zipCode', text)}
          onBlur={() => handleBlur('zipCode')}
          placeholder="Enter your zip code"
          keyboardType="numeric"
        />
        {touched.zipCode && errors.zipCode ? (
          <Text style={styles.errorText}>{errors.zipCode}</Text>
        ) : null}
      </View>
      
      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default TypeSafeFormExample;
