export interface ProductType {
  key: string;
  id: string;
  name: string;
  image: string;
  finalPrice: number;
  shippingType: "Free" | "Paid";
  createdAt: string;
  state: "In Stock" | "Out of Stock" | "Discontinued";
  category: string;
  subcategory: string;
  partner: string;
}
