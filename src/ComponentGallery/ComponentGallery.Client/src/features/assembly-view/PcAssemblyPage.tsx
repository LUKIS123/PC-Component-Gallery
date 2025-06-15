import Scene from "@/components/ui/3d-pc-assembly-scene";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Accordion,
  Span,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { usePcBuildsDataService } from "../assembly-builds-list/services/pc-builds-data-service";
import { useComponentTypeDataService } from "../components-list/services/component-type-data-service";
import { useComponentsDataService } from "../components-list/services/components-data-service";
import { useState } from "react";
import {
  replaceRAM,
  replaceCPU,
  replaceMB,
  replaceGPU,
} from "@/components/ui/3d-pc-assembly-scene";

// First, define interfaces for your data types
interface Component {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  type: number;
}

export function PcAssemblyPage() {
  const { pcBuildId } = useParams();
  const dataService = usePcBuildsDataService();
  const componentTypesDataService = useComponentTypeDataService();

  // Fix the type for selectedComponent
  const [selectedComponents, setSelectedComponents] = useState<Component[]>(
    []
  );

  // Pobierz dane o PC build
  const { data: pcBuild, isLoading: isPcBuildLoading } = useQuery({
    queryKey: ["pcBuild", pcBuildId],
    queryFn: async () => {
      const data = await dataService.getPcBuildById(
        pcBuildId ? parseInt(pcBuildId, 10) : 0
      );
      return data || null; // Ensure we don't return undefined
    },
    enabled: !!pcBuildId, // Only run query if pcBuildId exists
  });

  // Pobierz typy komponentów
  const { data: componentTypes = [], isLoading: isComponentTypesLoading } =
    useQuery({
      queryKey: ["componentTypes"],
      queryFn: async () => {
        try {
          const data = await componentTypesDataService.getComponentTypes();
          return data || []; // Return empty array instead of undefined
        } catch (error) {
          console.error("Error fetching component types:", error);
          return []; // Return empty array on error
        }
      },
    });

  // Funkcja do obsługi kliknięcia komponentu (na razie pusta)
  const handleComponentClick = (component: Component) => {
    console.log("Selected component:", component);
    console.log(selectedComponents);
    console.log(selectedComponents.filter(c => c.type !== component.type));

    if (selectedComponents.some(c => c.id === component.id)) {
      return;
    }
    if (selectedComponents.some(c => c.type === component.type)) {
      const selectedComponentsWihtoutSameType = selectedComponents.filter(c => c.type !== component.type);
      setSelectedComponents(
        [
          ...selectedComponentsWihtoutSameType,
          component
        ]
      );
    }
    else {
      setSelectedComponents([...selectedComponents, component]);
    }

    // W zależności od typu komponentu, wywołaj odpowiednią funkcję
    if (component.type === 1) {
      // CPU - procesor
      replaceCPU(component.id);
    } else if (component.type === 2) {
      // MB - płyta główna
      replaceMB(component.id);
    } else if (component.type === 3) {
      // RAM - pamięć RAM
      replaceRAM(component.id);
    } else if (component.type === 4) {
      // GPU - karta graficzna
      replaceGPU(component.id);
    }
  };

  if (isPcBuildLoading || isComponentTypesLoading) {
    return <Box padding={8}>Loading...</Box>;
  }

  if (!pcBuild) {
    return <Box padding={8}>PC Build not found</Box>;
  }

  return (
    <Grid templateColumns={["1fr", "1fr", "2fr 1fr"]} gap={6} padding={4}>
      {/* Lewa kolumna - główna zawartość */}
      <GridItem>
        <Box padding={4}>
          {/* Header Section */}
          <Heading as="h1" size="2xl" marginBottom={4}>
            Build Your PC
          </Heading>

          {/* 3D Model Section */}
          <Box
            height="600px"
            width="100%"
            backgroundColor="gray.900"
            borderRadius="md"
            boxShadow="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={6}
          >
            <Box w="100%" h="100%">
              <Scene />
            </Box>
          </Box>
        </Box>
      </GridItem>

      {/* Prawa kolumna - sidebar z komponentami */}
      <GridItem>
        <Box
          padding={4}
          backgroundColor="gray.800"
          borderRadius="md"
          boxShadow="md"
          position="sticky"
          top="20px"
          maxHeight="calc(100vh - 40px)"
          overflowY="auto"
        >
          <Heading as="h2" size="lg" marginBottom={4}>
            Avaliable Components{" "}
            {componentTypes.length === 0 ? "(No categories found)" : ""}
          </Heading>

          {/* Use a conditional check for componentTypes */}
          {componentTypes.length > 0 ? (
            <Accordion.Root
              defaultValue={[componentTypes[0]?.id?.toString()]}
              collapsible
              border="none"
              backgroundColor="gray.800"
            >
              {componentTypes.map((type) => (
                <Accordion.Item
                  key={type.id}
                  value={type.id.toString()}
                  border="none"
                  spaceY={1}
                >
                  <Accordion.ItemTrigger
                    bg="gray.700"
                    borderRadius="md"
                    _hover={{ bg: "gray.600" }}
                  >
                    <Span flex="1" px={3} textAlign="left" fontWeight="bold">
                      {type.name}
                    </Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <ComponentsByType
                        typeId={type.id}
                        onComponentClick={handleComponentClick}
                      />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          ) : (
            <Text color="gray.400">No component categories available</Text>
          )}

          {/* Wyświetlanie informacji o wybranym komponencie */}
          {selectedComponents && selectedComponents.length != 0 && (
            <Box mt={4} p={4} backgroundColor="gray.700" borderRadius="md">
              <Heading size="md" mb={2}>
                Chosen Component
              </Heading>
              {(selectedComponents || []).map((component) => (
                <Box>
                  <Text>{component.name}</Text>
                  <Text fontWeight="bold" color="teal.500">
                    {new Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    }).format(component.price)}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
}

// Komponent pomocniczy do pobierania komponentów dla danego typu
// Add types to ComponentsByType props
interface ComponentsByTypeProps {
  typeId: number | string;
  onComponentClick: (component: Component) => void;
}

function ComponentsByType({ typeId, onComponentClick }: ComponentsByTypeProps) {
  const componentsDataService = useComponentsDataService();

  // Remove the explicit Component[] type and use type assertion inside
  const { data: components = [], isLoading } = useQuery({
    queryKey: ["components", typeId],
    queryFn: async () => {
      try {
        const data = await componentsDataService.getComponents(typeId);

        // Map ComponentDetails to Component, adding missing properties if needed
        const componentData = (data || []).map((item) => ({
          ...item,
          // Convert id from string to number
          id: typeof item.id === "string" ? parseInt(item.id, 10) : item.id,
          // Add type property if missing, using typeId as fallback
          type: Number(typeId),
        })) as Component[];

        return componentData;
      } catch (error) {
        console.error(`Error fetching components for type ${typeId}:`, error);
        return [] as Component[];
      }
    },
    enabled: !!typeId,
  });

  if (isLoading) {
    return <Text>Loading components...</Text>;
  }

  if (!components || components.length === 0) {
    return <Text color="gray.400">No available components</Text>;
  }

  return (
    <Stack spaceY={1}>
      {components.map((component) => (
        <Box
          key={component.id}
          p={2}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.600"
          bg="gray.700"
          _hover={{ bg: "gray.600", cursor: "pointer" }}
          onClick={() => onComponentClick(component)}
        >
          <Stack direction="row" spaceY={1} alignItems="center">
            <Image
              src={
                component.imageUrl ||
                "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              }
              alt={component.name}
              boxSize="40px"
              objectFit="cover"
              borderRadius="sm"
            />
            <Box>
              <Text fontWeight="bold" fontSize="sm">
                {component.name}
              </Text>
              <Text fontSize="xs" color="teal.300">
                {new Intl.NumberFormat("pl-PL", {
                  style: "currency",
                  currency: "PLN",
                }).format(component.price)}
              </Text>
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
