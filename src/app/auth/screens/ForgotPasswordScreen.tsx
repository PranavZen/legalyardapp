import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Link,
  useToast,
  Icon,
  useColorMode,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../navigation/types';
import { authService } from '../services/authService';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const toast = useToast();
  const { colorMode } = useColorMode();

  interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
  }

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validate()) {
      setIsSubmitting(true);
      try {
        // In a real app, this would be an API call
        await authService.forgotPassword(email);

        toast.show({
          title: 'Reset Email Sent',
          description: 'Check your email for password reset instructions',
          placement: 'top',
        });

        navigation.navigate('Login');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.show({
          title: 'Request Failed',
          description: errorMessage,
          placement: 'top',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box flex={1} p={4} bg={colorMode === 'dark' ? 'background.primary' : 'white'}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <VStack space={8} mt={8}>
          <Heading size="xl" fontWeight="bold" color="primary.500">
            Forgot Password
          </Heading>
          <Heading color="muted.400" size="xs">
            Enter your email to reset your password
          </Heading>

          <VStack space={4}>
            <FormControl isInvalid={'email' in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    size={5}
                    ml={2}
                    color="muted.400"
                  />
                }
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            </FormControl>

            <Button
              colorScheme="primary"
              onPress={handleResetPassword}
              isLoading={isSubmitting}
              mt={4}
            >
              Reset Password
            </Button>

            <HStack mt={4} justifyContent="center">
              <Text fontSize="sm" color="muted.500">
                Remember your password?{' '}
              </Text>
              <Link
                _text={{ color: 'primary.500', fontWeight: 'medium', fontSize: 'sm' }}
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ForgotPasswordScreen;
