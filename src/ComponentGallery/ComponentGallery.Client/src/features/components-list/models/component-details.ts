export interface ComponentDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  specification: Map<string, string>;
}