import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  Pressable,
  useColorMode,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../navigation/types';
import { loginStart, loginSuccess, loginFailure } from '../../../store/slices/authSlice';
import { authService } from '../services/authService';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();

  interface FormData {
    email: string;
    password: string;
  }

  interface FormErrors {
    email?: string;
    password?: string;
    [key: string]: string | undefined;
  }

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        dispatch(loginStart());

        // In a real app, this would be an API call
        const response = await authService.login(formData.email, formData.password);

        dispatch(loginSuccess(response));

        toast.show({
          title: 'Login Successful',
          placement: 'top',
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(loginFailure(errorMessage));

        toast.show({
          title: 'Login Failed',
          description: errorMessage,
          placement: 'top',
        });
      }
    }
  };

  return (
    <Box flex={1} p={4} bg={colorMode === 'dark' ? 'background.primary' : 'white'}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <VStack space={8} mt={8}>
          <Heading size="xl" fontWeight="bold" color="primary.500">
            Legalyard Suite
          </Heading>
          <Heading color="muted.400" size="xs" fontWeight="normal">
            Sign in to continue
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
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
              />
              <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={'password' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                      size={5}
                      mr={2}
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => setFormData({ ...formData, password: value })}
              />
              <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
            </FormControl>

            <Button
              colorScheme="primary"
              onPress={handleLogin}
              mt={4}
            >
              Sign In
            </Button>

            <HStack mt={4} justifyContent="center">
              <Text fontSize="sm" color="muted.500">
                Don't have an account?{' '}
              </Text>
              <Link
                _text={{ color: 'primary.500', fontWeight: 'medium', fontSize: 'sm' }}
                onPress={() => navigation.navigate('Register')}
              >
                Sign Up
              </Link>
            </HStack>

            <Link
              _text={{ color: 'primary.500', fontWeight: 'medium', fontSize: 'sm', textAlign: 'center' }}
              onPress={() => navigation.navigate('ForgotPassword')}
              mt={2}
            >
              Forgot Password?
            </Link>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginScreen;
