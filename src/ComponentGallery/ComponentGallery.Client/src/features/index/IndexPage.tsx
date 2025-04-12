import Scene from "@/components/ui/3dscene";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function IndexPage() {
  return (
    <Stack>
      <Heading size="2xl" as={"p"}>
        Welcome to the Component Gallery
      </Heading>
      <Text>
        This is a collection of reusable components that you can use in your
        applications.
      </Text>
      <Link to={"/components"}>
        <Button variant="subtle">ComponentsPage</Button>
      </Link>
      <Scene />
    </Stack>
  );
}
