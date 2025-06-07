import axios from "axios";
import { ComponentTypeDetails } from "../models/component-type-details";

interface GetComponentTypesResponse {
  componentTypeDetails: ComponentTypeDetails[];
}

export function useComponentTypeDataService() {
  return {
    async getComponentTypes() {
      const response = await axios.get<GetComponentTypesResponse>(
        `/api/componentTypes`
      );
      return response.data.componentTypeDetails;
    },
    async getComponentTypeById(typeId: number) {
      const response = await axios.get<ComponentTypeDetails>(
        `/api/componentType/${typeId}`
      );
      return response.data;
    },
  };
}
