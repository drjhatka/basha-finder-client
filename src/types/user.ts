export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "tenant" | "admin"|"landlord";
  iat?: number;
  exp?: number;
}
