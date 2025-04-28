import React from 'react';
import { StatusBar } from 'react-native';
import { Box, HStack, Text, IconButton, Icon, useColorMode } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
}) => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === 'dark' ? '#1F2937' : '#FFFFFF'}
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Box
        bg={colorMode === 'dark' ? 'background.primary' : 'white'}
        px={4}
        py={3}
        borderBottomWidth={1}
        borderBottomColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space={4}>
            {showBackButton && (
              <IconButton
                icon={
                  <Icon
                    as={<MaterialIcons name="arrow-back" />}
                    size={6}
                    color="text.primary"
                  />
                }
                onPress={() => navigation.goBack()}
              />
            )}
            <Text fontSize="xl" fontWeight="bold" color="text.primary">
              {title}
            </Text>
          </HStack>
          {rightIcon && (
            <IconButton
              icon={
                <Icon
                  as={<MaterialIcons name={rightIcon} />}
                  size={6}
                  color="text.primary"
                />
              }
              onPress={onRightIconPress}
            />
          )}
        </HStack>
      </Box>
    </>
  );
};

export default HeaderBar;
