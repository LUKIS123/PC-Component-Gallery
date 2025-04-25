import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <Stack h="100vh">
      <Box p={4} bg="blue.900">
        <Link to="/">
          <Heading>Component Gallery</Heading>
        </Link>
      </Box>
      <Outlet />
      <Box flex="1 1">
          
          </Box>
  
          {/* Footer Section */}
          <Box textAlign="center" py="4" bg="gray.800" color="white">
            <Text>© 2025 PC Component Gallery | All Rights Reserved</Text>
          </Box>
    </Stack>
  );
}
