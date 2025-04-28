/**
 * Common styles for the Legalyard Suite app
 */

import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // FlatList styles
  flatListContent: {
    padding: 16,
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
});
