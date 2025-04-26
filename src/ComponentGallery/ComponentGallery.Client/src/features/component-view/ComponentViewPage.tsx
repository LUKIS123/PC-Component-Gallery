import Scene from "@/components/ui/3dscene";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useComponentsDataService } from "../components-list/services/components-data-service";

export function ComponentViewPage() {
  const { componentId } = useParams();
  const dataService = useComponentsDataService();

  const { data: component, isLoading: isComponentLoading } = useQuery({
    queryKey: ["component", componentId],
    queryFn: () =>
      dataService.getComponentById(componentId ? parseInt(componentId, 10) : 0),
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
      <Text fontSize="lg" color="gray.200" marginBottom={6}>
        {component.description}
      </Text>

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
        <Box w="500px" h="100%">
          <Scene />
        </Box>
        {/* </Text> */}
      </Box>

      {/* Component Info */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Image
            src={component.imageUrl}
            alt={component.name}
            borderRadius="md"
            boxSize="300px"
            objectFit="cover"
            boxShadow="lg"
          />
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

            <Stack gap={2}>
              {Object.entries(component.specification).map(([key, value]) => (
                <Stack key={key} direction="row" justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.200">
                    {key}
                  </Text>
                  <Text color="gray.400">{value}</Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}
