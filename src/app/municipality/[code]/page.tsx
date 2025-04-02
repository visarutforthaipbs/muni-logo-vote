"use client";

import { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Box,
  HStack,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useVote } from "@/contexts/VoteContext";
import { Municipality } from "@/types/mongodb";
import MunicipalityLogo from "@/components/MunicipalityLogo";
import SocialShare from "@/components/SocialShare";
import JsonLd from "@/components/JsonLd";

export default function MunicipalityDetail({
  params,
}: {
  params: { code: string };
}) {
  const [municipality, setMunicipality] = useState<Municipality | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { voteForMunicipality } = useVote();
  const toast = useToast();

  useEffect(() => {
    const fetchMunicipality = async () => {
      try {
        const response = await fetch(`/api/municipalities/${params.code}`);
        if (!response.ok) {
          throw new Error("Failed to fetch municipality");
        }
        const data = await response.json();
        setMunicipality(data);
      } catch (error) {
        console.error("Error fetching municipality:", error);
        toast({
          title: "ไม่พบข้อมูลเทศบาล",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchMunicipality();
  }, [params.code, toast]);

  const handleVote = async () => {
    if (!municipality) return;

    const success = await voteForMunicipality(municipality.muni_code);
    if (success) {
      setHasVoted(true);
      toast({
        title: "โหวตสำเร็จ",
        description: "ขอบคุณที่ร่วมโหวตโลโก้เทศบาล",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!municipality) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>กำลังโหลด...</Text>
      </Container>
    );
  }

  const shareText = `มาดูโลโก้สวยๆ จาก ${municipality.mun_name} กันเถอะ!`;
  const shareUrl = `${window.location.origin}/municipality/${municipality.muni_code}`;

  return (
    <>
      <JsonLd municipality={municipality} type="organization" />
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center" color="brand.red">
            {municipality.mun_name}
          </Heading>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              w="300px"
              h="300px"
              position="relative"
              overflow="hidden"
              borderRadius="md"
              mb={4}
            >
              <MunicipalityLogo
                municipality={municipality}
                objectFit="contain"
              />
            </Box>

            <Text fontSize="xl" fontWeight="bold">
              {municipality.cwt_name}
            </Text>
            {municipality.amp_name && (
              <Text fontSize="lg" color="gray.600">
                {municipality.amp_name}
              </Text>
            )}

            <Text fontSize="xl" color="brand.gold" mt={4}>
              {municipality.voteCount || 0} โหวต
            </Text>

            <Button
              colorScheme="red"
              size="lg"
              mt={4}
              onClick={handleVote}
              isDisabled={hasVoted}
            >
              {hasVoted ? "โหวตแล้ว" : "โหวต"}
            </Button>

            <Divider my={6} />

            <SocialShare
              title={shareText}
              url={shareUrl}
              description={`ดูและโหวตโลโก้ของเทศบาล${municipality.mun_name} จังหวัด${municipality.cwt_name}`}
            />

            {municipality.Website && (
              <Button
                as="a"
                href={municipality.Website}
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="blue"
                variant="outline"
                mt={4}
              >
                เว็บไซต์เทศบาล
              </Button>
            )}
          </Box>
        </VStack>
      </Container>
    </>
  );
}
