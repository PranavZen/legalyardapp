import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, HStack, Icon, useColorMode } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AISuggestionCardProps {
  title: string;
  description: string;
  type: 'alert' | 'suggestion' | 'reminder';
  onPress?: () => void;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({
  title,
  description,
  type,
  onPress,
}) => {
  const { colorMode } = useColorMode();

  const getIconAndColor = () => {
    switch (type) {
      case 'alert':
        return {
          icon: 'warning',
          color: 'error.500',
          bgColor: colorMode === 'dark' ? 'error.900' : 'error.50',
        };
      case 'suggestion':
        return {
          icon: 'lightbulb',
          color: 'info.500',
          bgColor: colorMode === 'dark' ? 'info.900' : 'info.50',
        };
      case 'reminder':
        return {
          icon: 'notifications',
          color: 'warning.500',
          bgColor: colorMode === 'dark' ? 'warning.900' : 'warning.50',
        };
      default:
        return {
          icon: 'info',
          color: 'primary.500',
          bgColor: colorMode === 'dark' ? 'primary.900' : 'primary.50',
        };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();

  return (
    <Pressable onPress={onPress}>
      <Box
        bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
        p={4}
        borderRadius="md"
        borderLeftWidth={4}
        borderLeftColor={color}
      >
        <HStack space={3} alignItems="center">
          <Box bg={bgColor} p={2} borderRadius="full">
            <Icon as={<MaterialIcons name={icon} />} size={5} color={color} />
          </Box>
          <Box flex={1}>
            <Text color="text.primary" fontWeight="bold" mb={1}>
              {title}
            </Text>
            <Text color="text.secondary" fontSize="sm">
              {description}
            </Text>
          </Box>
          <Icon
            as={<MaterialIcons name="chevron-right" />}
            size={6}
            color="text.tertiary"
          />
        </HStack>
      </Box>
    </Pressable>
  );
};

export default AISuggestionCard;
