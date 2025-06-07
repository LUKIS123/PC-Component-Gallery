import Scene from "@/components/ui/3d-pc-assembly-scene";
import { Box, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { usePcBuildsDataService } from "../assembly-builds-list/services/pc-builds-data-service";

export function PcAssemblyPage() {
  const { pcBuildId } = useParams();
  const dataService = usePcBuildsDataService();

  const { data: component, isLoading: isComponentLoading } = useQuery({
    queryKey: ["component", pcBuildId],
    queryFn: () =>
      dataService.getPcBuildById(pcBuildId ? parseInt(pcBuildId, 10) : 0),
  });

  if (isComponentLoading) {
    return <Box padding={8}>Loading...</Box>;
  }

  if (!component) {
    return <Box padding={8}>Component not found</Box>;
  }

  return (
    <Box padding={8}>
      {/* Header Section */}
      <Heading as="h1" size="2xl" marginBottom={4}>
        {component.name}
      </Heading>

      {/* 3D Model Placeholder Section */}
      <Box
        height="400px"
        width="100%"
        backgroundColor="gray.900"
        borderRadius="md"
        boxShadow="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={6}
      >
        {/* <Text fontSize="2xl" color="gray.500"> */}
        <Box w="100%" h="100%">
          <Scene />
        </Box>
        {/* </Text> */}
      </Box>

      {/* Component Info */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Text fontSize="lg" color="gray.200" marginBottom={6}>
            {component.description}
          </Text>
        </GridItem>

        <GridItem>
          <Stack gap={4}>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: "PLN",
              }).format(component.price)}
            </Text>

            <Box height="1px" backgroundColor="gray.300" width="100%" />

            {/* <Stack gap={2}>
              {Object.entries(component.swaps).map(([key, value]) => (
                <Stack key={key} direction="row" justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.200">
                    {key}
                  </Text>
                  <Text color="gray.400">{value.name}</Text>
                </Stack>
              ))}
            </Stack> */}
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}
