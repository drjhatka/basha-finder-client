export interface IPayment {
    _id?:string;
    userId: string;
    requestId: string;
    listingId: string;
    method: 'COD' | 'Online';
    status: 'Pending' | 'Paid' | 'Failed'| 'Cancelled';
    transactionId?: string;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
  }