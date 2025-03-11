import { useQuery } from "@tanstack/react-query";
import { useComponentsDataService } from "./services/components-data-service";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";

export function ComponentsListPage() {
  const dataService = useComponentsDataService();
  const [page] = useState(0);
  const { data: components, isLoading: isComponentsLoading } = useQuery({
    queryKey: ["components", page],
    queryFn: () => dataService.getComponents(page),
  });

  if (isComponentsLoading) {
    return <VStack>Loading...</VStack>;
  }

  if (!components) {
    return <VStack>No components found</VStack>;
  }

  return (
    <VStack>
      {components.map((component) => (
        <div key={component.id}>
          <h2>{component.name}</h2>
        </div>
      ))}
    </VStack>
  );
}
