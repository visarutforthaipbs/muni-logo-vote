import React from "react";
import {
  HStack,
  IconButton,
  Tooltip,
  useToast,
  Box,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLine,
  FaLink,
  FaWhatsapp,
} from "react-icons/fa";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title,
  url,
  description,
}) => {
  const toast = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "คัดลอกลิงก์แล้ว",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "ไม่สามารถคัดลอกลิงก์ได้",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const shareButtons = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "facebook.500",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "twitter.500",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Line",
      icon: FaLine,
      color: "green.500",
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "whatsapp.500",
      href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
    },
    {
      name: "คัดลอกลิงก์",
      icon: FaLink,
      color: "gray.500",
      onClick: handleCopyLink,
    },
  ];

  return (
    <Box>
      <Text fontSize="sm" color="gray.600" mb={2}>
        แชร์
      </Text>
      <HStack spacing={2}>
        {shareButtons.map((button) => (
          <Tooltip key={button.name} label={button.name}>
            {button.href ? (
              <ChakraLink
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: "none" }}
              >
                <IconButton
                  aria-label={button.name}
                  icon={<button.icon />}
                  colorScheme={button.color.split(".")[0]}
                  variant="ghost"
                  size="md"
                  _hover={{
                    transform: "scale(1.1)",
                    transition: "transform 0.2s",
                  }}
                />
              </ChakraLink>
            ) : (
              <IconButton
                aria-label={button.name}
                icon={<button.icon />}
                colorScheme={button.color.split(".")[0]}
                variant="ghost"
                size="md"
                onClick={button.onClick}
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s",
                }}
              />
            )}
          </Tooltip>
        ))}
      </HStack>
    </Box>
  );
};

export default SocialShare;
