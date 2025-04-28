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
  Pressable,
  Radio,
  useColorMode,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../navigation/types';
import { authService } from '../services/authService';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const toast = useToast();
  const { colorMode } = useColorMode();

  interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    [key: string]: string | undefined;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'general',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        // In a real app, this would be an API call
        await authService.register(formData);

        toast.show({
          title: 'Registration Successful',
          description: 'You can now login with your credentials',
          placement: 'top',
        });

        navigation.navigate('Login');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.show({
          title: 'Registration Failed',
          description: errorMessage,
          placement: 'top',
        });
      }
    }
  };

  return (
    <Box flex={1} p={4} bg={colorMode === 'dark' ? 'background.primary' : 'white'}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <VStack space={4} mt={4}>
          <Heading size="xl" fontWeight="bold" color="primary.500">
            Create Account
          </Heading>
          <Heading color="muted.400" size="xs">
            Sign up to get started
          </Heading>

          <VStack space={4} mt={4}>
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml={2}
                    color="muted.400"
                  />
                }
                placeholder="Full Name"
                value={formData.name}
                onChangeText={(value) => setFormData({ ...formData, name: value })}
              />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>

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

            <FormControl isInvalid={'confirmPassword' in errors}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Icon
                      as={<MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} />}
                      size={5}
                      mr={2}
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
              />
              <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl>
              <FormControl.Label>I am a</FormControl.Label>
              <Radio.Group
                name="role"
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
              >
                <HStack space={4} flexWrap="wrap">
                  <Radio value="lawyer" my={1}>
                    Legal Professional
                  </Radio>
                  <Radio value="finance" my={1}>
                    Finance Expert
                  </Radio>
                  <Radio value="general" my={1}>
                    General User
                  </Radio>
                </HStack>
              </Radio.Group>
            </FormControl>

            <Button
              colorScheme="primary"
              onPress={handleRegister}
              mt={4}
            >
              Sign Up
            </Button>

            <HStack mt={4} justifyContent="center">
              <Text fontSize="sm" color="muted.500">
                Already have an account?{' '}
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

export default RegisterScreen;
