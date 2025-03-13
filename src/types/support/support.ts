import { Document } from "mongoose";
export interface ISupport extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber:number;
    password: string;
    date: Date;
    message: string;
}
