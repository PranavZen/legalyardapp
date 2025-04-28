import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, VStack, HStack, useColorMode } from 'native-base';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, onPress }) => {
  const { colorMode } = useColorMode();

  return (
    <Pressable onPress={onPress}>
      <Box
        bg={colorMode === 'dark' ? 'background.secondary' : 'gray.50'}
        p={4}
        borderRadius="lg"
        width="48%"
        mb={4}
        shadow={1}
      >
        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <Text color="text.secondary" fontSize="sm">
            {title}
          </Text>
          {icon}
        </HStack>
        <Text color="text.primary" fontSize="2xl" fontWeight="bold">
          {value}
        </Text>
      </Box>
    </Pressable>
  );
};

export default DashboardCard;
