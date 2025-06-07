import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <Flex h="100vh" direction="column">
      {/* Header */}
      <Box p={4} bg="blue.900">
        <Link to="/">
          <Heading>Component Gallery</Heading>
        </Link>
      </Box>

      {/* Main Content - will grow to fill available space */}
      <Box flex="1" overflowY="auto">
        <Outlet />
      </Box>

      {/* Footer Section - will stick to bottom */}
      <Box textAlign="center" py="1" bg="gray.800" color="white">
        <Text>© 2025 PC Component Gallery | All Rights Reserved</Text>
      </Box>
    </Flex>
  );
}
