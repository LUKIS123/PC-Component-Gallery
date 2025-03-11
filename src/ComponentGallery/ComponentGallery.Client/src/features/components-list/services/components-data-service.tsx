import axios from "axios";
import { ComponentDetails } from "../models/component-details";

interface GetComponentsResponse {
  components: ComponentDetails[];
}

export function useComponentsDataService() {
  return {
    async getComponents(pageIndex: number) {
      const response = await axios.get<GetComponentsResponse>(`/api/components?pageIndex=${pageIndex}`);
      return response.data.components;
    },
  };
}
