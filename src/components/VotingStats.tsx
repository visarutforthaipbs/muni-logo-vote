import React from "react";
import {
  Box,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { FaUsers, FaVoteYea, FaChartLine } from "react-icons/fa";
import { useVote } from "@/contexts/VoteContext";

const VotingStats = () => {
  const { municipalities } = useVote();

  const totalVotes = municipalities.reduce(
    (sum, m) => sum + (m.voteCount || 0),
    0
  );
  const uniqueMunicipalities = municipalities.length;
  const averageVotes =
    uniqueMunicipalities > 0 ? totalVotes / uniqueMunicipalities : 0;

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
      <Heading
        as="h2"
        size="md"
        mb={4}
        textAlign="center"
        className="gradient-text"
      >
        สถิติการโหวต
      </Heading>
      <VStack spacing={4} align="stretch">
        <Stat>
          <StatLabel display="flex" alignItems="center" gap={2} fontSize="sm">
            <Icon as={FaUsers} color="brand.primary" boxSize={4} />
            จำนวนเทศบาลทั้งหมด
          </StatLabel>
          <StatNumber fontSize="xl">
            {uniqueMunicipalities.toLocaleString()}
          </StatNumber>
          <StatHelpText fontSize="xs">เทศบาลที่เข้าร่วมโครงการ</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex" alignItems="center" gap={2} fontSize="sm">
            <Icon as={FaVoteYea} color="brand.secondary" boxSize={4} />
            จำนวนโหวตทั้งหมด
          </StatLabel>
          <StatNumber fontSize="xl">{totalVotes.toLocaleString()}</StatNumber>
          <StatHelpText fontSize="xs">คะแนนโหวตรวมทั้งหมด</StatHelpText>
        </Stat>
      </VStack>
    </Box>
  );
};

export default VotingStats;
