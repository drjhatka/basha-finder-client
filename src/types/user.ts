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


export interface TUser {
  _id?:string;
  name: string;
  email: string;
  password: string;
  role: 'admin'|'landlord'|'tenant';
  image?:string;
  address?:string;
  phone?:string;
  lastLogin?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
  needsPasswordChange?:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


