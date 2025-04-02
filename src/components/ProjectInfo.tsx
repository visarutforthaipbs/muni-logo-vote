import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Link,
  Box,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface ProjectInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectInfo = ({ isOpen, onClose }: ProjectInfoProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={4}>
        <ModalHeader>
          <Heading pt={4} size="lg" className="gradient-text">
            เกี่ยวกับเว็บไซต์นี้
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch" pb={6}>
            <Text>
              เว็บไซต์นี้ถูกพัฒนาขึ้นเพื่อให้ผู้คนรู้จักเทศบาลของตนเองมากขึ้นในช่วงใกล้เลือกตั้งเทศบาลปี
              2568 โดยเริ่มต้นจากโลโก้หรือตราสัญลักษณ์ของเทศบาลเอง
            </Text>

            <Text>
              การรวบรวมข้อมูลทั้งโลโก้ url, website, facebook ของเทศบาลทั้ง
              2,474 แห่ง มาจากกลุ่มคนที่ "อยากเล่นกับข้อมูล" ชื่อ{" "}
              <Text as="span" fontWeight="bold">
                "🥊 นักสู้ PDF" ที่ใช้คนกว่า 4 คน และเวลาร่วมกว่า 40
                ชั่วโมงในการรวบรวมข้อมูลเหล่านี้ขึ้นมา
              </Text>
            </Text>

            <Box>
              <Text fontWeight="bold" mb={2}>
                หากท่านชื่อชอบเว็บไซต์แบบนี้สามารถร่วมสนับสนุนเราได้ผ่าน
              </Text>
              <UnorderedList spacing={2} pl={4}>
                <ListItem>
                  เข้าร่วมเป็นส่วนหนึ่งของกลุ่ม{" "}
                  <Link
                    href="https://www.facebook.com/groups/2172894203162631"
                    color="blue.500"
                    isExternal
                  >
                    "🥊 นักสู้ PDF"
                  </Link>
                </ListItem>
                <ListItem>หรือดาวน์โหลดข้อมูลชุดนี้ได้ในกลุ่มเช่นกัน</ListItem>
              </UnorderedList>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectInfo;
