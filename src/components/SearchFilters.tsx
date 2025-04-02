import React from "react";
import {
  Box,
  Input,
  Select,
  HStack,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedProvince: string;
  onProvinceChange: (value: string) => void;
  provinces: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  provinces,
}) => {
  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" mb={8}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="gray.700">
          ค้นหาและกรอง
        </Text>
        <HStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="ค้นหาชื่อเทศบาล..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              size="lg"
              borderRadius="lg"
            />
          </InputGroup>
          <Select
            placeholder="เลือกจังหวัด"
            value={selectedProvince}
            onChange={(e) => onProvinceChange(e.target.value)}
            size="lg"
            borderRadius="lg"
            maxW="200px"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </Select>
        </HStack>
        <Flex justifyContent="flex-end">
          <Link
            href="https://www.xn--12cq4bkc0ebu0gf4mrb6e.site/"
            isExternal
            color="brand.primary"
            fontSize="sm"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "underline" }}
          >
            <Text mr={1}>ไม่ทราบว่าอยู่ในเทศบาลใด? ตรวจสอบที่นี่</Text>
            <Icon as={FaExternalLinkAlt} boxSize={3} />
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SearchFilters;
