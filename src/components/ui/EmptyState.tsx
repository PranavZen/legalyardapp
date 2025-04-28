import React from 'react';
import { Center, Icon, Text, VStack, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <Center flex={1} p={4}>
      <VStack space={4} alignItems="center">
        <Icon
          as={<MaterialIcons name={icon} />}
          size={16}
          color="gray.400"
        />
        <Text fontSize="xl" fontWeight="bold" color="text.primary" textAlign="center">
          {title}
        </Text>
        {message && (
          <Text color="text.secondary" textAlign="center">
            {message}
          </Text>
        )}
        {actionLabel && onAction && (
          <Button onPress={onAction} mt={2}>
            {actionLabel}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default EmptyState;
