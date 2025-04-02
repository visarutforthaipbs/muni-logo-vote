"use client";

import { useState } from "react";
import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "ส่งข้อความสำเร็จ",
      description: "ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" color="brand.red">
          ติดต่อเรา
        </Heading>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ชื่อ</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="กรอกชื่อของคุณ"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>อีเมล</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="กรอกอีเมลของคุณ"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>ข้อความ</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="กรอกข้อความของคุณ"
                  rows={4}
                />
              </FormControl>

              <Button type="submit" colorScheme="red" width="full" size="lg">
                ส่ง
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}
