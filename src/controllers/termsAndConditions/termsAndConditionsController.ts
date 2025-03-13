import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import TermsAndConditions from "../../models/termsAndConditions/termsAndConditions.model";
const createTermsAndConditions = async(req: Request, res: Response): Promise<Response> => {
    const {
    title,
    introduction,
    definition,
    acceptanceOfTerms,
    userAccounts,
    ordersAndPayments,
    deliveryAndShipment,
    returnsAndRefunds,
    userConduct,
    intellectualProperty,
    disputeResolutions,
    modificationsToTerms,
    contactInformations,
    } = req.body;
    try {
        const newTermsAndConditions = new TermsAndConditions({
            title,
            introduction,
            definition,
            acceptanceOfTerms,
            userAccounts,
            ordersAndPayments,
            deliveryAndShipment,
            returnsAndRefunds,
            userConduct,
            intellectualProperty,
            disputeResolutions,
            modificationsToTerms,
            contactInformations,
            effectiveDate: Date.now(),
        })
        await newTermsAndConditions.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Terms and Conditions have been created successfully.",
            newTermsAndConditions
        });
    } catch (error) {
        console.error("Error occurred while creating a terms and conditions", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

const fetchTermsAndConditions = async(req: Request, res: Response): Promise<Response> => {
    try {
        const termsAndConditions = await TermsAndConditions.find();
        return res.status(StatusCodes.OK).json({
            message: "Terms and Conditions have been fetched successfully", 
            termsAndConditions
        });
    } catch (error) {
        console.error("Error occurred while fetching  terms and conditions", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

const fetchTermAndCondition = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const termAndCondition = await TermsAndConditions.findById(id);
        if (!termAndCondition) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Term and Condition does not exist!"});
        }
        return res.status(StatusCodes.OK).json({
            message: "Term and Condition has been fetched successfully", 
            termAndCondition
        });
    } catch (error) {
        console.error("Error occurred while fetching a term and condition", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

const updateTermAndCondition = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const termAndCondition = await TermsAndConditions.findByIdAndUpdate(id, req.body, {new: true});
        if (!termAndCondition) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Term and Condition does not exist!"})
        }
        return res.status(StatusCodes.OK).json({
            message: "Term and Condition have been fetched successfully", 
            termAndCondition
        });
    } catch (error) {
        console.error("Error occurred while fetching  terms and conditions", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

const removeTermAndCondition = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const termAndCondition = await TermsAndConditions.findByIdAndDelete(id);
        if (!termAndCondition) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Term and Condition does not exist!"})
        }
        return res.status(StatusCodes.OK).json({
            message: "Term and Condition has been deleted successfully", 
            termAndCondition
        });
    } catch (error) {
        console.error("Error occurred while fetching  terms and conditions", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export {
    createTermsAndConditions,
    fetchTermsAndConditions,
    fetchTermAndCondition,
    updateTermAndCondition,
    removeTermAndCondition
}
