import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  Circle,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  FaRuler,
  FaFont,
  FaImage,
  FaCircle,
  FaShieldAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaHistory,
  FaLeaf,
  FaBookOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LogoGuidelines = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const GuidelinesContent = () => (
    <VStack spacing={8} align="stretch">
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        bgGradient="linear(to-r, brand.primary, brand.accent1)"
        bgClip="text"
        mb={4}
      >
        แนวทางการออกแบบตราสัญลักษณ์เทศบาล
      </Heading>

      <Text fontSize="lg" textAlign="center" color="gray.600">
        ตามระเบียบกระทรวงมหาดไทย พ.ศ. 2483 - ทำความเข้าใจง่ายๆ ใน 3 ขั้นตอน
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* Size and Shape */}
        <MotionBox
          whileHover={{ scale: 1.05 }}
          p={6}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <Circle size="60px" bg="brand.primary" color="white">
              <Icon as={FaRuler} boxSize={6} />
            </Circle>
            <Heading size="md" textAlign="center">
              1. ขนาดและรูปทรง
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaCircle} color="brand.primary" />
                <Text as="span" fontWeight="bold">
                  รูปทรง:
                </Text>{" "}
                วงกลมหรือรูปอาร์ม
              </ListItem>
              <ListItem>
                <ListIcon as={FaRuler} color="brand.primary" />
                <Text as="span" fontWeight="bold">
                  ขนาด:
                </Text>{" "}
                เส้นผ่าศูนย์กลาง 5 ซม.
              </ListItem>
            </List>
          </VStack>
        </MotionBox>

        {/* Text Requirements */}
        <MotionBox
          whileHover={{ scale: 1.05 }}
          p={6}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <Circle size="60px" bg="brand.secondary" color="white">
              <Icon as={FaFont} boxSize={6} />
            </Circle>
            <Heading size="md" textAlign="center">
              2. ข้อความบนตรา
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaCheck} color="brand.secondary" />
                <Text as="span" fontWeight="bold">
                  ด้านบน:
                </Text>{" "}
                "เทศบาล..." หรือ "สำนักเทศบาล..."
              </ListItem>
              <ListItem>
                <ListIcon as={FaMapMarkerAlt} color="brand.secondary" />
                <Text as="span" fontWeight="bold">
                  ด้านล่าง:
                </Text>{" "}
                "จังหวัด..."
              </ListItem>
            </List>
          </VStack>
        </MotionBox>

        {/* Center Image */}
        <MotionBox
          whileHover={{ scale: 1.05 }}
          p={6}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <Circle size="60px" bg="brand.accent1" color="white">
              <Icon as={FaImage} boxSize={6} />
            </Circle>
            <Heading size="md" textAlign="center">
              3. ภาพตรงกลาง
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaHistory} color="brand.accent1" />
                <Text as="span" fontWeight="bold">
                  สื่อถึง:
                </Text>{" "}
                ประวัติศาสตร์ท้องถิ่น
              </ListItem>
              <ListItem>
                <ListIcon as={FaLeaf} color="brand.accent1" />
                <Text as="span" fontWeight="bold">
                  แสดง:
                </Text>{" "}
                เอกลักษณ์ของท้องถิ่น
              </ListItem>
            </List>
          </VStack>
        </MotionBox>
      </SimpleGrid>

      <Box
        mt={8}
        p={6}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="lg"
        border="1px"
        borderColor={borderColor}
      >
        <Heading size="md" mb={6} color="brand.primary" textAlign="center">
          ตัวอย่าง: ตราสัญลักษณ์เทศบาลเมืองรังสิต
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={6}
          alignItems="center"
        >
          <Box>
            <Image
              src="/logo-desig-sample-rangsit.png"
              alt="ตัวอย่างตราสัญลักษณ์เทศบาลเมืองรังสิต"
              w="full"
              maxH="300px"
              objectFit="contain"
              borderRadius="lg"
              p={4}
              bg="white"
              boxShadow="sm"
            />
          </Box>
          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="brand.primary">
              องค์ประกอบหลัก:
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaCheck} color="green.500" />
                รูปทรงวงกลม ขนาดมาตรฐาน
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="green.500" />
                ชื่อเทศบาลและจังหวัดชัดเจน
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="green.500" />
                ภาพกลางสื่อถึงเอกลักษณ์ท้องถิ่น
              </ListItem>
            </List>
          </VStack>
        </SimpleGrid>
      </Box>
    </VStack>
  );

  return (
    <>
      <Button
        leftIcon={<Icon as={FaBookOpen} />}
        onClick={onOpen}
        colorScheme="blue"
        size="lg"
        boxShadow="lg"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "xl",
        }}
        transition="all 0.2s"
      >
        Guideline : ออกแบบโลโก้เทศบาล
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent mx={4}>
          <ModalCloseButton />
          <ModalBody p={8}>
            <GuidelinesContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoGuidelines;
