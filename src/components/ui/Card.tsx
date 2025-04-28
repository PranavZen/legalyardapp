import React from 'react';
import { Box, useColorMode } from 'native-base';

interface CardProps {
  children: React.ReactNode;
  mb?: number;
  p?: number;
  borderRadius?: string;
  shadow?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  mb = 4,
  p = 4,
  borderRadius = 'md',
  shadow = 1,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'dark' ? 'background.secondary' : 'white'}
      p={p}
      borderRadius={borderRadius}
      mb={mb}
      shadow={shadow}
      borderWidth={1}
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      {children}
    </Box>
  );
};

export default Card;
