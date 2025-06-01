import { Stack, Box, Heading, Text } from "@chakra-ui/react";

export function PcBuildsListPage() {
  // Example static data
  const builds = [
    {
      name: "Gaming Beast",
      description: "High-end gaming PC with RTX 4090 and Ryzen 9.",
    },
    {
      name: "Budget Build",
      description: "Affordable build for everyday tasks and light gaming.",
    },
    {
      name: "Creator Pro",
      description:
        "Optimized for content creation with lots of RAM and storage.",
    },
  ];

  return (
    <Stack spaceX={6} maxW="700px" mx="auto" mt={8} px={4}>
      <Heading as="h1" size="xl" textAlign="center">
        PC Builds List
      </Heading>
      {builds.map((build, idx) => (
        <Box
          key={idx}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="gray.800"
          color="white"
        >
          <Heading as="h2" size="md">
            {build.name}
          </Heading>
          <Text mt={2}>{build.description}</Text>
        </Box>
      ))}

      <Text color="gray.400" textAlign="center">
        More builds coming soon!
      </Text>
    </Stack>
  );
}
