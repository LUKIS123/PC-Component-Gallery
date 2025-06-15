import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useComponentTypeDataService } from "./services/component-type-data-service";
import { useComponentsDataService } from "./services/components-data-service";

export function ComponentsListPage() {
  const dataService = useComponentsDataService();
  const componentTypesDataService = useComponentTypeDataService();
  const { typeId } = useParams();
  const { data: components, isLoading: isComponentsLoading } = useQuery({
    queryKey: ["components"],
    queryFn: () =>
      dataService.getComponents(typeId ? parseInt(typeId, 10) : 0),
  });

  type SpecsAccumulator = { [key: string]: any[] };
  const allSpecs = components?.reduce(
    (acc: SpecsAccumulator, component) => {
      Object.entries(component.specification).forEach(([key, value]) => {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(value);
      });
      return acc;
    },
    {} as SpecsAccumulator
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: componentType, isLoading: isComponentTypeLoading } = useQuery({
    queryKey: ["componentType"],
    queryFn: () =>
      componentTypesDataService.getComponentTypeById(
        typeId ? parseInt(typeId, 10) : 0
      ),
  });

  const resetFilters = () => {
    setFilters({});
    document.querySelectorAll("input[type='radio']").forEach((input) => {
      (input as HTMLInputElement).checked = false;
    });
    document.querySelectorAll(".default-spec").forEach((input) => {
      (input as HTMLInputElement).checked = true;
    });
  };

  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  if (isComponentsLoading || isComponentTypeLoading) {
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
      <Stack direction="row">
        <Stack direction="column">
          <Input
            placeholder="Search components"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="300px"
          />

          <Box width='70vw'>
            {/* Components List Section */}
            <SimpleGrid columns={[1, 2, 3]} gap={4} marginTop={8}>
              {components.filter((component) =>
                component.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
                .filter((component) => {
                  return Object.entries(filters).every(([specName, filterValue]) => {
                    if (!filterValue) return true; // Skip empty filters
                    const specValue = Object.entries(component.specification).find(x => x[0] == specName);
                    if (!specValue) return false; // If spec not found, skip
                    return specValue[1] == filterValue;
                  });
                })
                .map((component) => (
                  <Box
                    key={component.id}
                    borderRadius="md"
                    boxShadow="lg"
                    bg="gray.700"
                    padding={4}
                  >
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
                          {new Intl.NumberFormat("pl-PL", {
                            style: "currency",
                            currency: "PLN",
                          }).format(component.price)}
                        </Text>
                        <Link to={`/components/3d/${component.id}`}>
                          <Button
                            colorScheme="teal"
                            backgroundColor="blue.600"
                            color="white"
                            fontSize="lg"
                            fontWeight="bold"
                            borderRadius="md"
                            padding="12px 24px"
                            _hover={{
                              backgroundColor: "teal.500",
                              boxShadow: "lg",
                              transform: "scale(1.05)",
                            }}
                            _active={{
                              backgroundColor: "blue.700",
                              transform: "scale(0.98)",
                            }}
                            _focus={{
                              outline: "none",
                              boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.5)",
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
        </Stack>
        {/* Search and Filter Section */}
        <Box
          marginTop={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={'30vw'}
        >
          <Stack>
            <Stack direction="column">
              <Heading fontWeight="bold">Filters</Heading>
              {Object.entries(allSpecs || {}).map(([specName, specValues]) => {

                return (
                  <Box key={specName}>
                    <Text fontWeight="bold">{specName}</Text>
                    <Stack direction="row" alignItems="center">
                      <Box key={`${specName}-${'all'}`}>
                        <input
                          className={'default-spec'}
                          defaultChecked={true}
                          type="radio"
                          id={`${specName}-${'all'}`}
                          name={specName}
                          value={''}
                          onChange={() => {
                            const newValue = '';
                            setFilters(prev => ({
                              ...prev,
                              [specName]: newValue
                            }));
                          }}
                          style={{ marginRight: '8px' }}
                        />
                        <label htmlFor={`${specName}-${'all'}`}>All</label>
                      </Box>
                      {Array.from(new Set(specValues)).map((value) => (
                        <Box key={`${specName}-${value}`}>
                          <input
                            type="radio"
                            id={`${specName}-${value}`}
                            name={specName}
                            value={value}
                            onChange={(e) => {
                              const newValue = e.target.checked ? value : '';
                              setFilters(prev => ({
                                ...prev,
                                [specName]: newValue
                              }));
                            }}
                            style={{ marginRight: '8px' }}
                          />
                          <label htmlFor={`${specName}-${value}`}>{value}</label>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )
              }
              )
              }
            </Stack>

            <Button
              colorScheme="cyan"
              onClick={() => {
                resetFilters();
              }}
            >
              Reset Filters
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
