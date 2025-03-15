export interface IRequest {
    _id?:string;
    tenantId:string;
    listingId:string;
    landlordId:string;
    moveInDate?:Date;
    message:string;
    requestDate: Date;
    approvedDate?: Date;
    checkoutDate?:Date;
    status:'approved'|'pending'|'completed';
    transactionId?: string; // Payment transaction reference
    landlordResponseMessage?: string; // Reason for approval/rejection
    tenantPhone?: string;
    tenantEmail?: string;

}