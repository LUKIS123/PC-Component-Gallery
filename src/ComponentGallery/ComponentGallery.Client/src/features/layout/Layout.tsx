import { Box, Heading, Flex, Text, Stack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <Flex h="100vh" direction="column">
      {/* Header */}
      <Box p={4} bg="blue.900">
        <Stack direction="row" align="center" justify="space-between">
          <Link to="/">
        <Heading size="lg">Component Gallery</Heading>
          </Link>
          <Stack direction="row" gap={8} align="center">
        <Link to="/categoriesList">
          <Text fontSize="md" fontWeight="medium">Categories</Text>
        </Link>
        <Link to="/pcAssembly/2">
          <Text fontSize="md" fontWeight="medium">Build Your PC in 3D</Text>
        </Link>
          </Stack>
        </Stack>
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
