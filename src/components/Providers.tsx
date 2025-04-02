"use client";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { theme } from "@/theme";
import { VoteProvider } from "@/contexts/VoteContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

const { ToastContainer } = createStandaloneToast();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <NotificationProvider>
          <VoteProvider>{children}</VoteProvider>
        </NotificationProvider>
        <ToastContainer />
      </ChakraProvider>
    </CacheProvider>
  );
}
