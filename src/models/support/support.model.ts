import mongoose, {  Schema } from 'mongoose';
import { ISupport } from '../../types/support/support';
const supportSchema: Schema = new Schema<ISupport>({
firstName: {
    type: String,
    required: true,
    trim: true,
},
lastName:{
    type: String,
    required: true,
    trim: true,
},
email:{
    type: String,
    required: true,
    trim: true,
},
phoneNumber:{
    type:Number,
    required: true,
    trim: true,
},
password:{
    type:String,
    required: true,
    trim: true,
},
date:{
    type:Date,
    required: true,
    trim: true,
    default: Date.now,
},
message:{
    type:String,
    required: true,
    trim: true,
},
}, {timestamps: true});
const Support = mongoose.model<ISupport>('Support', supportSchema);
export default Support;
