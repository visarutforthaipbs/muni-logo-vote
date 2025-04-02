import React from "react";
import { Box, VStack, Text, HStack, Image, Heading } from "@chakra-ui/react";
import { useVote } from "@/contexts/VoteContext";

const TopVoted = () => {
  const { municipalities } = useVote();

  const topMunicipalities = [...municipalities]
    .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
    .slice(0, 5);

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" w="full">
      <Heading
        as="h2"
        size="md"
        mb={4}
        textAlign="center"
        className="gradient-text"
        zIndex={9999}
      >
        อันดับโหวตสูงสุด
      </Heading>
      <VStack spacing={3} align="stretch">
        {topMunicipalities.map((municipality, index) => (
          <Box
            key={municipality.muni_code}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{
              transform: "translateX(5px)",
              boxShadow: "md",
            }}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="3px"
              bgGradient={`linear(to-r, ${
                index === 0
                  ? "yellow.400, yellow.600"
                  : index === 1
                  ? "gray.400, gray.600"
                  : index === 2
                  ? "orange.400, orange.600"
                  : "blue.400, blue.600"
              })`}
            />
            <HStack spacing={3} p={3}>
              <Box
                w="50px"
                h="50px"
                borderRadius="md"
                overflow="hidden"
                flexShrink={0}
              >
                <Image
                  src={municipality.logo}
                  alt={municipality.mun_name}
                  w="full"
                  h="full"
                  objectFit="contain"
                  bg="white"
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                  {municipality.mun_name}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {municipality.cwt_name}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="brand.primary"
                  textAlign="right"
                >
                  {municipality.voteCount || 0}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  โหวต
                </Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TopVoted;
