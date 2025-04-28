import React from 'react';
import { Center, Spinner, Text, VStack } from 'native-base';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  size = 'lg',
}) => {
  return (
    <Center flex={1}>
      <VStack space={2} alignItems="center">
        <Spinner size={size} color="primary.500" />
        {text && <Text color="text.secondary">{text}</Text>}
      </VStack>
    </Center>
  );
};

export default LoadingSpinner;
