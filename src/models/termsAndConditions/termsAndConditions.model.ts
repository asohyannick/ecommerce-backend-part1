import mongoose, { Schema } from 'mongoose';
import { ITermsAndConditions } from '../../types/termsAndConditionsType/termsAndConditionsType';
const  termsAndConditionsSchema: Schema = new Schema<ITermsAndConditions>({
title:{
    type: String,
    required: true,
    trim: true,
},
introduction:{
    type: String,
    required: true,
    trim: true,
},
definition:{
    type: [String],
    required: true,
    trim: true,
},
acceptanceOfTerms:{
    type: String,
    required: true,
    trim: true,
 },
 userAccounts: {
    type: String,
    required: true,
    trim: true,
},
 ordersAndPayments:{
    type: String,
    required: true,
    trim: true,
 },
 deliveryAndShipment:{
    type: String,
    required: true,
    trim: true,
 },
 returnsAndRefunds:{
    type: String,
    required: true,
    trim: true,
},
 userConduct:{
    type: String,
    required: true,
    trim: true,
 },
 intellectualProperty:{
    type: String,
    required: true,
    trim: true,
},
 disputeResolutions:{
    type: String,
    required: true,
    trim: true,
 },
 modificationsToTerms:{
    type: String,
    required: true,
    trim: true,
},
 contactInformations:{
    email:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
    },
 },
 effectiveDate:{
    type: Date,
    required: true,
    default: Date.now,
 },
}, {timestamps: true});
const TermsAndConditions = mongoose.model<ITermsAndConditions>('termsAndCondtion', termsAndConditionsSchema);
export default TermsAndConditions;
