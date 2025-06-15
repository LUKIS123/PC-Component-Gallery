import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useComponentTypeDataService } from "../components-list/services/component-type-data-service";

export function CategoriesListPage() {
    const componentTypesDataService = useComponentTypeDataService();
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

    if (isComponentTypesLoading) {
        return (


            <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
                <Heading as="h2" size="lg" color="white" textAlign="center">
                    Explore Categories
                </Heading>
                <Box padding={8}>
                    <Text>Loading component types...</Text>
                </Box>
            </Stack>
        );
    }

    return (
        <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
            <Heading as="h2" size="lg" color="white" textAlign="center">
                Explore All Categories
            </Heading>
            <Stack direction="row" gap={8} justify="center" wrap="wrap">
                {componentTypes.map((category) => (
                    < Link to={`/components/${category.id}`} key={category.id}>
                        <Button
                            as="div" // Ensure the button is a div so that bgImage can apply correctly
                            variant="solid"
                            color="white"
                            bgImage={`url('${category.imageUrl}')`}
                            bgSize="cover"
                            bgPos="center"
                            h="200px"
                            w="200px"
                            _hover={{ opacity: 0.8 }}
                            fontSize="xl"
                            fontWeight="bold"
                            colorScheme="cyan"
                            textAlign="center"
                        >
                            {category.name}
                        </Button>
                    </Link>
                ))}
            </Stack>
        </Stack >
    )
}