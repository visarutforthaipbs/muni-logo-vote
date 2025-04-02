import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Link as ChakraLink,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaFacebook, FaGlobe, FaHeart } from "react-icons/fa";
import { useVote } from "@/contexts/VoteContext";
import { Municipality } from "@/types/mongodb";
import MunicipalityLogo from "./MunicipalityLogo";

interface MunicipalityCardProps {
  municipality: Municipality;
}

const MunicipalityCard: React.FC<MunicipalityCardProps> = ({
  municipality,
}) => {
  const { voteForMunicipality } = useVote();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = async () => {
    const success = await voteForMunicipality(municipality.muni_code);
    if (!success) {
      return;
    }
  };

  return (
    <>
      <Box
        className="card glass-effect"
        bg="white"
        p={6}
        position="relative"
        overflow="hidden"
        boxShadow="lg"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="5px"
          bgGradient="linear(to-r, brand.primary, brand.secondary)"
        />
        <VStack spacing={4}>
          <Box
            position="relative"
            w="full"
            h="200px"
            borderRadius="xl"
            overflow="hidden"
            className="hover-glow"
            cursor="pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <MunicipalityLogo municipality={municipality} objectFit="contain" />
          </Box>
          <VStack spacing={2} align="stretch">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
              noOfLines={2}
            >
              {municipality.mun_name}
            </Text>
            <VStack spacing={1} align="stretch">
              <Text color="gray.600" fontSize="sm">
                อำเภอ{municipality.amp_name}
              </Text>
              <Text color="gray.600" fontSize="sm">
                จังหวัด{municipality.cwt_name}
              </Text>
            </VStack>
            <HStack justify="space-between" mt={2}>
              <Text color="brand.primary" fontWeight="bold" fontSize="lg">
                {municipality.voteCount || 0} โหวต
              </Text>
              <Button
                className="button-bounce"
                bgGradient="linear(to-r, brand.primary, brand.accent1)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, brand.accent1, brand.primary)",
                }}
                size="md"
                onClick={handleVote}
                leftIcon={<Icon as={FaHeart} />}
              >
                โหวต
              </Button>
            </HStack>
            <HStack spacing={4} justify="center" mt={2}>
              {municipality.Facebook && (
                <ChakraLink
                  href={municipality.Facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-bounce"
                >
                  <Icon
                    as={FaFacebook}
                    boxSize={6}
                    color="brand.accent3"
                    _hover={{ color: "brand.primary" }}
                  />
                </ChakraLink>
              )}
              {municipality.Website && (
                <ChakraLink
                  href={municipality.Website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-bounce"
                >
                  <Icon
                    as={FaGlobe}
                    boxSize={6}
                    color="brand.accent2"
                    _hover={{ color: "brand.primary" }}
                  />
                </ChakraLink>
              )}
            </HStack>
          </VStack>
        </VStack>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="white" p={6}>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box w="full" h="500px">
                <MunicipalityLogo
                  municipality={municipality}
                  objectFit="contain"
                />
              </Box>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {municipality.mun_name}
              </Text>
              <Text fontSize="lg" color="gray.600" textAlign="center">
                {municipality.cwt_name}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MunicipalityCard;
