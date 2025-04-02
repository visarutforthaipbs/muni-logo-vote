import React, { useEffect } from "react";
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      bg="green.50"
      borderWidth="1px"
      borderColor="green.200"
      borderRadius="md"
      p={4}
      boxShadow="md"
      zIndex={1000}
      maxW="sm"
    >
      <VStack align="start" gap={2}>
        <HStack>
          <Icon as={FaCheckCircle} color="green.500" />
          <Text color="green.800" fontWeight="medium">
            {message}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Notification;
