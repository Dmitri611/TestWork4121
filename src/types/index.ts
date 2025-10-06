export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  gender: string;
  user: User;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
};
