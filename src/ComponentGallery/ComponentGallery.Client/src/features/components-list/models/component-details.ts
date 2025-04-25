export interface ComponentDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  specification: [key: string, value: string][];
}