import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Link,
  Icon,
  Text,
  VStack,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars, FaGithub, FaLine } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import dynamic from "next/dynamic";

const ProjectInfo = dynamic(() => import("@/components/ProjectInfo"), {
  ssr: false,
});

export default function TopRightMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="fixed" top={4} right={4} zIndex={1000}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaBars />}
            variant="solid"
            colorScheme="blue"
            size="lg"
            rounded="full"
            shadow="lg"
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
          />
          <MenuList shadow="xl" minW="300px">
            <MenuItem onClick={onOpen}>
              <VStack align="start" width="100%" spacing={1}>
                <Text fontWeight="bold">เกี่ยวกับโครงการ</Text>
                <Text fontSize="sm" color="gray.600">
                  ดูรายละเอียดโครงการ
                </Text>
              </VStack>
            </MenuItem>
            <Divider />
            <Text
              px={3}
              py={2}
              fontSize="sm"
              fontWeight="bold"
              color="gray.600"
            >
              ช่องทางติดต่อปรับปรุงแก้ไขข้อมูล
            </Text>
            <MenuItem
              as={Link}
              href="mailto:contact@creatorsgarten.org"
              isExternal
              icon={<Icon as={MdEmail} boxSize={5} color="red.500" />}
            >
              <VStack align="start" width="100%" spacing={0}>
                <Text>Email</Text>
                <Text fontSize="xs" color="gray.600">
                  visarut298@gmail.com
                </Text>
              </VStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ProjectInfo isOpen={isOpen} onClose={onClose} />
    </>
  );
}
