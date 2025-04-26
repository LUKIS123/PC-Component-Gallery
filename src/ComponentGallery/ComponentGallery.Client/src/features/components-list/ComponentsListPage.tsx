import { useQuery } from "@tanstack/react-query";
import { useComponentsDataService } from "./services/components-data-service";
import { useState } from "react";
import { Box, Button, CardBody, Heading, Input, Select, SimpleGrid, VStack, Image, Stack, Text, Badge, LocaleProvider, FormatNumber } from "@chakra-ui/react";
import { Link, useParams } from "react-router";
import { useComponentTypeDataService } from "./services/component-type-data-service";

export function ComponentsListPage() {
  const dataService = useComponentsDataService();
  const componentTypesDataService = useComponentTypeDataService();
  const [page] = useState(0);
  const { typeId } = useParams();
  const { data: components, isLoading: isComponentsLoading } = useQuery({
    queryKey: ["components", page],
    queryFn: () => dataService.getComponents(page, typeId ? parseInt(typeId, 10) : 0),
  });

  const { data: componentType, isLoading: isComponentTypeLoading } = useQuery({
    queryKey: ["componentType"],
    queryFn: () => componentTypesDataService.getComponentTypeById(typeId ? parseInt(typeId, 10) : 0),
  });


  if (isComponentsLoading) {
    return <VStack>Loading...</VStack>;
  }

  if (!components) {
    return <VStack>No components found</VStack>;
  }

  return (
    <Box padding={4}>
      {/* Category Banner Section */}
      <Box
        position="relative"
        height="300px"
        // backgroundImage="url('https://static.vecteezy.com/system/resources/previews/003/800/708/non_2x/quantum-computer-large-data-processing-database-concept-cpu-isometric-banner-central-computer-processors-cpu-concept-digital-chip-futuristic-microchip-processor-vector.jpg')"
        // backgroundImage="url('https://www.pcworld.com/wp-content/uploads/2024/01/best-graphics-cards-banner-100815257-orig.jpg?quality=50&strip=all')"
        // backgroundImage="url('https://png.pngtree.com/thumb_back/fw800/background/20240525/pngtree-motherboard-background-design-image_15805164.jpg')"
        // backgroundImage="url('https://as1.ftcdn.net/v2/jpg/03/52/65/22/1000_F_352652202_gle5fJmbH5GXns32aosr5j8WeBpVLBUs.jpg')"
        // backgroundImage="url('https://image.semiconductor.samsung.com/image/samsung/p6/semiconductor/consumer-storage/kv/kv-product-internalssd-970-EVOPlus-pc.png?$ORIGIN_PNG$')"
        backgroundImage={`url('${componentType!.imageUrl}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="md"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.4)"
          borderRadius="md"
        />
        <Heading
          position="absolute"
          bottom="20px"
          left="20px"
          color="white"
          fontSize="3xl"
        >
          {componentType?.name}
        </Heading>
      </Box>

      {/* Search and Filter Section */}
      <Box marginTop={4} display="flex" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Search components"
          // value={searchQuery}
          // onChange={handleSearch}
          width="300px"
        />
        {/* <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          placeholder="Filter by Type"
          width="200px"
        >
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          <option value="3">Type 3</option>
        </Select> */}
        <Button colorScheme="cyan">Apply Filters</Button>
      </Box>

      {/* Components List Section */}
      <SimpleGrid columns={[1, 2, 3]} gap={4} marginTop={8}>
        {components
          // .filter((component) => component.name.toLowerCase().includes(searchQuery.toLowerCase()))
          // .filter((component) => (selectedType ? component.type.toString() === selectedType : true))
          .map((component) => (
            <Box key={component.id} borderRadius="md" boxShadow="lg" bg="gray.700" padding={4}>
              <Box>
                <Image
                  src={component.imageUrl}
                  alt={component.name}
                  borderRadius="md"
                  boxSize="200px"
                  objectFit="cover"
                />
                <Stack gap={2} marginTop={4}>
                  <Heading size="md">{component.name}</Heading>
                  <Text>{component.description}</Text>
                  <Text fontWeight="bold" color="teal.600">
                    {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(component.price)}
                  </Text>
                  {/* Specifications (optional) */}
                  {/* <Text>
                    <strong>Clock Speed:</strong> {component.specification.ClockSpeed}
                  </Text>
                  <Text>
                    <strong>Cores:</strong> {component.specification.Cores}
                  </Text>
                  <Text>
                    <strong>Threads:</strong> {component.specification.Threads}
                  </Text> */}
                  <Link
                    to={`/components/3d/${component.id}`}  // Navigate to the 3D view page
                  >
                    <Button
                      colorScheme="teal" // Base color for the button
                      backgroundColor="blue.600" // Default blue background
                      color="white" // Text color
                      fontSize="lg"
                      fontWeight="bold"
                      borderRadius="md" // Rounded corners
                      padding="12px 24px" // Padding for the button
                      _hover={{
                        backgroundColor: "teal.500", // Hover effect with teal
                        boxShadow: "lg", // Adding shadow on hover
                        transform: "scale(1.05)", // Slight scale-up effect on hover
                      }}
                      _active={{
                        backgroundColor: "blue.700", // Darker blue when button is clicked
                        transform: "scale(0.98)", // Slight scale-down effect on click
                      }}
                      _focus={{
                        outline: "none", // Removing default outline when focused
                        boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.5)", // Focus ring with blue
                      }}
                    >
                      View in 3D
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}
