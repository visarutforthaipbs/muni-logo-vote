"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Center,
  Icon,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useVote } from "@/contexts/VoteContext";
import { parseCSV } from "@/utils/csvParser";
import { Municipality } from "@/types/mongodb";
import JsonLd from "@/components/JsonLd";

// Dynamically import components that use client-side features
const MunicipalityCard = dynamic(
  () => import("@/components/MunicipalityCard"),
  {
    ssr: false,
  }
);
const SearchFilters = dynamic(() => import("@/components/SearchFilters"), {
  ssr: false,
});
const VotingStats = dynamic(() => import("@/components/VotingStats"), {
  ssr: false,
});
const TopVoted = dynamic(() => import("@/components/TopVoted"), {
  ssr: false,
});
const LogoGuidelines = dynamic(() => import("@/components/LogoGuidelines"), {
  ssr: false,
});
const TopRightMenu = dynamic(() => import("@/components/TopRightMenu"), {
  ssr: false,
});

export default function Home() {
  const {
    municipalities,
    setMunicipalities,
    searchMunicipalities,
    displayedMunicipalities,
    hasMore,
    loadMore,
  } = useVote();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState<string[]>([]);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<
    Municipality[]
  >([]);
  const observerRef = useRef<IntersectionObserver>();
  const loadingRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );

  // Load data from MongoDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/municipalities");
        if (!response.ok) {
          throw new Error("Failed to fetch municipalities");
        }
        const data = await response.json();
        setMunicipalities(data);

        // Extract unique provinces
        const uniqueProvinces = Array.from(
          new Set(data.map((m: Municipality) => m.cwt_name))
        ).sort() as string[];
        setProvinces(uniqueProvinces);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [setMunicipalities]);

  // Filter municipalities when search query or province changes
  useEffect(() => {
    let filtered = [...municipalities];

    // Apply search filter
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      filtered = filtered.filter((municipality) => {
        const searchString =
          `${municipality.mun_name} ${municipality.amp_name} ${municipality.cwt_name}`.toLowerCase();
        return searchTerms.every((term) => searchString.includes(term));
      });
    }

    // Apply province filter
    if (selectedProvince) {
      filtered = filtered.filter((m) => m.cwt_name === selectedProvince);
    }

    setFilteredMunicipalities(filtered);
  }, [searchQuery, selectedProvince, municipalities]);

  // Display municipalities with pagination
  const paginatedMunicipalities = filteredMunicipalities.slice(
    0,
    displayedMunicipalities.length
  );
  const hasMoreFiltered =
    paginatedMunicipalities.length < filteredMunicipalities.length;

  return (
    <>
      <JsonLd type="website" />
      <TopRightMenu />
      <Container maxW="100%" px={{ base: 4, xl: 8 }} py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, brand.primary, brand.accent1)"
              bgClip="text"
              fontWeight="extrabold"
              pt={4}
            >
              ขอ 1 โหวตให้โลโก้เทศบาลในใจเธอ ❤️
            </Heading>
          </Box>

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 350px" }}
            gap={{ base: 6, lg: 8 }}
            alignItems="start"
            maxW="2400px"
            mx="auto"
          >
            <GridItem>
              <VStack spacing={6} align="stretch">
                <SearchFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedProvince={selectedProvince}
                  onProvinceChange={setSelectedProvince}
                  provinces={provinces}
                />

                {filteredMunicipalities.length > 0 ? (
                  <>
                    <SimpleGrid
                      columns={{ base: 1, sm: 2, lg: 3, xl: 4, "2xl": 5 }}
                      spacing={{ base: 4, lg: 6 }}
                      w="full"
                    >
                      {paginatedMunicipalities.map((municipality) => (
                        <MunicipalityCard
                          key={municipality.muni_code}
                          municipality={municipality}
                        />
                      ))}
                    </SimpleGrid>
                    {hasMoreFiltered && (
                      <Box
                        ref={loadingRef}
                        h="20px"
                        w="full"
                        textAlign="center"
                      >
                        <Text color="gray.500">กำลังโหลด...</Text>
                      </Box>
                    )}
                  </>
                ) : (
                  <Center py={12}>
                    <VStack spacing={4}>
                      <Icon as={FaSearch} boxSize={12} color="gray.400" />
                      <Text color="gray.500" fontSize="lg">
                        ไม่พบเทศบาลที่ค้นหา
                      </Text>
                    </VStack>
                  </Center>
                )}
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={6} align="stretch">
                <Box position="static" top="24px">
                  <TopVoted />
                </Box>
                <VotingStats />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>

      {/* Fixed position LogoGuidelines */}
      <Box
        position="fixed"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
        zIndex={10}
      >
        <LogoGuidelines />
      </Box>
    </>
  );
}
