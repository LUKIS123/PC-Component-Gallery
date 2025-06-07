import { Stack, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { usePcBuildsDataService } from "./services/pc-builds-data-service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export function PcBuildsListPage() {
  const dataService = usePcBuildsDataService();
  const [page] = useState(0);
  const { data: builds, isLoading: isBuildsLoading } = useQuery({
    queryKey: ["components", page],
    queryFn: () => dataService.getPcBuilds(page),
  });

  if (isBuildsLoading) {
    return <VStack>Loading...</VStack>;
  }

  if (!builds) {
    return <VStack>No PC-Builds found</VStack>;
  }

  return (
    <Stack spaceY={4} maxW="700px" mx="auto" mt={8} px={4}>
      <Heading as="h1" size="xl" textAlign="center">
        PC Builds List
      </Heading>
      {builds.map((build, idx) => (
        <Link
          to={`/pcAssembly/${build.id}`}
          key={idx}
          style={{ textDecoration: "none" }}
        >
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="gray.800"
            color="white"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
              borderColor: "cyan.400",
              bg: "gray.700",
            }}
          >
            <Heading as="h2" size="md">
              {build.name}
            </Heading>
            <Text mt={2}>{build.description}</Text>
          </Box>
        </Link>
      ))}
      <Text color="gray.400" textAlign="center">
        More builds coming soon!
      </Text>
    </Stack>
  );
}
