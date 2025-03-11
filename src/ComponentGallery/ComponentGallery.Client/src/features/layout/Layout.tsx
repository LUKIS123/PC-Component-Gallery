import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <Box p={4} bg="blue.900">
        <Link to="/">
          <Heading>Component Gallery</Heading>
        </Link>
      </Box>
      <Stack w={['100%', '75%']} mx="auto" p={4}>
        <Outlet />
      </Stack>
    </>
  );
}
