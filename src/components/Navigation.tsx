import { Box, Flex, Link, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Navigation() {
  return (
    <Box bg="brand.blue" color="white" py={4}>
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        align="center"
        justify="space-between"
      >
        <NextLink href="/" passHref>
          <Link _hover={{ textDecoration: "none" }}>
            <Heading size="md">โหวตโลโก้ไทย</Heading>
          </Link>
        </NextLink>

        <Flex gap={6} align="center">
          <NextLink href="/" passHref>
            <Link _hover={{ textDecoration: "none" }}>หน้าแรก</Link>
          </NextLink>
          <NextLink href="/about" passHref>
            <Link _hover={{ textDecoration: "none" }}>เกี่ยวกับเรา</Link>
          </NextLink>
          <NextLink href="/contact" passHref>
            <Link _hover={{ textDecoration: "none" }}>ติดต่อเรา</Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
}
