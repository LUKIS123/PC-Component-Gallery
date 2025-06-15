import axios from "axios";
import { ComponentDetails } from "../models/component-details";

interface GetComponentsResponse {
  components: ComponentDetails[];
}

export function useComponentsDataService() {
  return {
    async getComponents(typeId: number | string) {
      const response = await axios.get<GetComponentsResponse>(
        `/api/components?typeId=${typeId}`
      );
      return response.data.components;
    },
    async getComponentById(componentId: number) {
      const response = await axios.get<ComponentDetails>(
        `/api/components/${componentId}`
      );
      return response.data;
    },
  };
}
