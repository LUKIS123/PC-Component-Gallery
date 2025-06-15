import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { useComponentTypeDataService } from "../components-list/services/component-type-data-service";
import { useQuery } from "@tanstack/react-query";

export function IndexPage() {

  return (
    <Stack h="100vh" direction="column">
      <Box bg="black" color="white">
        {/* Hero Section */}
        <Box
          position="relative"
          // w="100vw"

          // minHeight="50vh"
          overflow="hidden"
        >
          <Image
            src="https://getwallpapers.com/wallpaper/full/8/d/c/38236.jpg" // Use a high-quality image of a PC setup here
            alt="PC Setup"
            width="100%"
            height="300px"
            objectFit="cover"
            filter="brightness(0.6)"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
          >
            <Heading
              as="h1"
              size="5xl" // Larger size for prominence
              mb={4}
              color="cyan.400"
              textShadow="0px 0px 5px rgb(0, 0, 0), 0px 0px 10px rgb(255, 255, 255)"
            >
              PC Component Gallery
            </Heading>
            <Text fontSize="xl" mb="6" mt="20">
              Browse and explore the best PC components for your next build.
            </Text>
          </Box>
        </Box>

        {/* Introduction Section */}
        <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
          <Heading as="h2" size="xl" color="white">
            What is the PC Component Gallery?
          </Heading>
          <Text fontSize="lg" color="gray.300">
            Discover and compare the latest PC components for building your
            dream computer. Whether you're a beginner or an expert, our gallery
            provides all the info you need to make informed decisions.
          </Text>
        </Stack>

        {/* Featured Categories Section */}
        <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
          <Heading as="h2" size="lg" color="white" textAlign="center">
            Explore Featured Categories
          </Heading>
          <Stack direction="row" gap={8} justify="center" wrap="wrap">
            {/* Category Buttons with Background Images */}
            <Link to="/components/1">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-7800x3d-og.jpg')"
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
                CPU
              </Button>
            </Link>
            <Link to="/components/4">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://www.pcgamesn.com/wp-content/sites/pcgamesn/2021/09/geforce-rtx-3080-ti-product-gallery-full-screen-3840-3_7b0335b3-f6b3-45d5-89f2-206d2a4e190e-prv-550x309.jpg')"
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
                GPU
              </Button>
            </Link>
            <Link to="/components/2">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://io.bikegremlin.com/wp-content/uploads/2024/07/modern-pc-computer-motherboard.jpg')"
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
                Motherboards
              </Button>
            </Link>
            <Link to="/components/3">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://miro.medium.com/v2/resize:fit:1061/0*6k9X6LPiM4XKyssm.jpg')"
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
                RAM
              </Button>
            </Link>

            <Link to="/components/5">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://ithardware.pl/artykuly/max/29233_1.jpg')"
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
                Storage
              </Button>
            </Link>

            <Link to="/categoriesList">
              <Button
                as="div" // Ensure the button is a div so that bgImage can apply correctly
                variant="solid"
                color="white"
                bgImage="url('https://static.pcbuilder.net/assets/images/builds/pc-builds.jpg')"
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
                Other...
              </Button>
            </Link>
          </Stack>
        </Stack>

        {/* PC Assembly Section - Visually separated */}
        <Stack w={["100%", "75%"]} mx="auto" p={6} mt={12}>
          <Heading as="h2" size="lg" color="white" textAlign="center">
            Build Your Dream PC
          </Heading>
          <Box
            border="2px dashed"
            borderColor="cyan.400"
            borderRadius="md"
            p={6}
            mx="auto"
            mt={4}
            bg="rgba(0, 0, 0, 0.7)"
          >
            <Link to="/pcAssembly/2">
              <Button
                as="div"
                variant="solid"
                color="white"
                bgImage="url('https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1626840661916_pc-assembly-hero.jpg')"
                bgSize="cover"
                bgPos="center"
                h="250px"
                w={["100%", "400px"]}
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "0 0 15px cyan",
                }}
                transition="all 0.3s"
                fontSize="2xl"
                fontWeight="bold"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  textAlign={"center"}
                  bg="rgba(0, 0, 0, 0.8)"
                  w="100%"
                  p={3}
                >
                  3D PC Assembly
                </Box>
                <Text mt="auto" fontSize="md" p={2} bg="rgba(0, 0, 0, 0.8)">
                  Create your perfect build
                </Text>
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
