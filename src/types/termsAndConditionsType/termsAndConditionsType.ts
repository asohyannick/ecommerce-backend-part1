import {Document } from 'mongoose';
export interface ITermsAndConditions extends Document {
    title: string;
    introduction: string;
    definition:string[];
    acceptanceOfTerms: string;
    userAccounts: string;
    ordersAndPayments: string;
    deliveryAndShipment: string;
    returnsAndRefunds: string;
    userConduct: string;
    intellectualProperty: string;
    disputeResolutions: string;
    modificationsToTerms: string;
    contactInformations:{
        email: string;
        phone: string;
    };
    effectiveDate:Date;
}
