"use client";

import { Container, Heading, Text, VStack, Box } from "@chakra-ui/react";

export default function About() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" color="brand.red">
          เกี่ยวกับเรา
        </Heading>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Text fontSize="lg" lineHeight="tall">
            LogoVote Thailand
            มีเป้าหมายเพื่อให้คนไทยได้มีส่วนร่วมในการเลือกโลโก้เทศบาลที่ชื่นชอบ
            และส่งเสริมความสนใจในชุมชนท้องถิ่น
          </Text>
          <Text mt={4} fontSize="lg" lineHeight="tall">
            เราเชื่อว่าโลโก้เทศบาลเป็นสัญลักษณ์ที่สำคัญที่แสดงถึงอัตลักษณ์และวัฒนธรรมของแต่ละท้องถิ่น
            การให้ประชาชนได้มีส่วนร่วมในการโหวตและแสดงความคิดเห็นเกี่ยวกับโลโก้
            จะช่วยสร้างความตระหนักรู้และความภาคภูมิใจในท้องถิ่นของตน
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
