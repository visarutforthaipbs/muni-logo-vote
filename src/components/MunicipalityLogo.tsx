import { useState } from "react";
import { Box, Image, Text, Skeleton } from "@chakra-ui/react";
import { Municipality } from "@/types/mongodb";

interface MunicipalityLogoProps {
  municipality: Municipality;
  width?: string | number;
  height?: string | number;
  showName?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * Component for displaying municipality logos with GitHub fallback
 *
 * If the logo URL in the CSV fails to load, it will try to load from GitHub using the municipality code
 */
const MunicipalityLogo: React.FC<MunicipalityLogoProps> = ({
  municipality,
  width = "full",
  height = "full",
  showName = false,
  objectFit = "contain",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [primaryImageError, setPrimaryImageError] = useState(false);
  const [fallbackImageError, setFallbackImageError] = useState(false);

  // Generate GitHub fallback URL
  const githubFallbackUrl = `https://raw.githubusercontent.com/visarutforthaipbs/muni-vote-logo/main/logos/${municipality.muni_code}.png`;

  // Logo URL from the municipality data
  const primaryLogoUrl = municipality.logo;

  // Handle primary image error
  const handlePrimaryImageError = () => {
    setPrimaryImageError(true);
    setIsLoading(false);
  };

  // Handle fallback image error
  const handleFallbackImageError = () => {
    setFallbackImageError(true);
    setIsLoading(false);
  };

  return (
    <Box position="relative" w={width} h={height} overflow="hidden">
      <Skeleton
        isLoaded={!isLoading}
        w="full"
        h="full"
        position="absolute"
        top={0}
        left={0}
      >
        {!primaryImageError ? (
          // Try loading the primary logo URL first
          <Image
            src={primaryLogoUrl}
            alt={`${municipality.mun_name} logo`}
            w="full"
            h="full"
            objectFit={objectFit}
            bg="white"
            onLoad={() => setIsLoading(false)}
            onError={handlePrimaryImageError}
          />
        ) : !fallbackImageError ? (
          // If primary fails, try the GitHub fallback URL
          <Image
            src={githubFallbackUrl}
            alt={`${municipality.mun_name} logo`}
            w="full"
            h="full"
            objectFit={objectFit}
            bg="white"
            onLoad={() => setIsLoading(false)}
            onError={handleFallbackImageError}
          />
        ) : (
          // If both fail, show a text fallback
          <Box
            w="full"
            h="full"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <Text color="gray.500" textAlign="center">
              {municipality.mun_name}
            </Text>
          </Box>
        )}
      </Skeleton>

      {showName && (
        <Text
          fontSize="sm"
          textAlign="center"
          mt={2}
          fontWeight="medium"
          color="gray.700"
        >
          {municipality.mun_name}
        </Text>
      )}
    </Box>
  );
};

export default MunicipalityLogo;
