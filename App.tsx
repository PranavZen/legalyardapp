/**
 * Legalyard Suite Mobile App
 * A comprehensive legal and finance management app
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider, extendTheme, ColorMode } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store';
import RootNavigator from './src/navigation';
import { ThemeProvider } from './src/themes/ThemeContext';
import { lightTheme, darkTheme } from './src/themes';
import { loginSuccess } from './src/store/slices/authSlice';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// Create a theme config that includes both light and dark themes
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light' as ColorMode,
};

// Extend the theme with components, colors, etc.
const customTheme = extendTheme({
  ...lightTheme,
  config,
});

function App(): React.JSX.Element {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          // In a real app, you would validate the token with your backend
          // For now, we'll just simulate a successful login
          const mockUser = {
            id: '1',
            email: 'lawyer@example.com',
            name: 'John Doe',
            role: 'lawyer' as 'lawyer' | 'finance' | 'general',
            subscription: 'premium' as 'premium' | 'free' | 'enterprise',
          };
          store.dispatch(loginSuccess({ user: mockUser, token }));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  if (!isReady) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <RootNavigator />
          </SafeAreaProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
