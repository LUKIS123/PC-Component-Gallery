import { Stack } from "@chakra-ui/react/stack";

export function PcAssemblyPage() {
  return (
    <Stack h="100vh" direction="column">
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h1>Component View Page</h1>
            <p>This is the component view page.</p>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h2>3D Model Placeholder</h2>
            <p>This is where the 3D model will be displayed.</p>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h2>Component Info</h2>
            <p>This is where the component information will be displayed.</p>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h2>Specifications</h2>
            <p>This is where the component specifications will be displayed.</p>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h2>Reviews</h2>
            <p>This is where the component reviews will be displayed.</p>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={8} w={["100%", "75%"]} mx="auto" p={4}>
        <Stack gap={4} w="100%">
          <Stack gap={2}>
            <h2>Related Components</h2>
            <p>This is where related components will be displayed.</p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
