import { ComponentDetails } from "@/features/components-list/models/component-details";

export interface PcBuildDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  swaps: [key: string, value: ComponentDetails][];
}
