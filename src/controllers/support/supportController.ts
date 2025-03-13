import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Support from '../../models/support/support.model';
const createSupport = async(req: Request, res: Response): Promise<Response> => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        message
    } = req.body;
    try {
        const newSupport = new Support({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            date: Date.now(),
            message
        });
        await newSupport.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message:"Support has been received successfully",
            newSupport
        });
    } catch (error) {
        console.error("Error occurred while sending support", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

const fetchSupports = async(req: Request, res: Response): Promise<Response> => {
    try {
        const supports = await Support.find();
        return res.status(StatusCodes.OK).json({
            message: "Supports has been fetched successfully.",
            supports
        });
    } catch (error) {
     console.error("Error occurred while fetching supports", error);
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};


const fetchSupport = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const support = await Support.findById(id);
        if (!support) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Support does not exist"});
        }
        return res.status(StatusCodes.OK).json({
            message: "Support has been fetched successfully.",
            support
        });
    } catch (error) {
     console.error("Error occurred while fetching support", error);
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};


const updateSupport = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const support = await Support.findByIdAndUpdate(id, req.body, {new: true});
        if (!support) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Support does not exist"});
        };
        return res.status(StatusCodes.OK).json({
            message: "Support has been updated successfully.",
            support
        });
    } catch (error) {
     console.error("Error occurred while fetching supports", error);
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};


const removeSupport = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const support = await Support.findByIdAndDelete(id);
        if (!support) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Support does not exist"});
        };
        return res.status(StatusCodes.OK).json({
            message: "Support has been deleted successfully.",
            support
        });
    } catch (error) {
     console.error("Error occurred while fetching supports", error);
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};
export {
    createSupport,
    fetchSupports,
    fetchSupport,
    updateSupport,
    removeSupport
}
