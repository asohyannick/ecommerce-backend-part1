import {
    createTermsAndConditions, 
    fetchTermsAndConditions, 
    fetchTermAndCondition, 
    updateTermAndCondition, 
    removeTermAndCondition 
} from "../../controllers/termsAndConditions/termsAndConditionsController";
import { 
    verifySuperAdminToken, 
    verifyAdminExist
} from "../../middleware/auth/auth";
import express from 'express';
const router = express.Router();
router.post('/create-terms-and-conditions',
    verifySuperAdminToken,
    verifyAdminExist,
    createTermsAndConditions
);
router.get('/fetch-terms-and-conditions',
    verifySuperAdminToken,
    verifyAdminExist,
    fetchTermsAndConditions,
);
router.get('/fetchTermAndCondition/:id',
    verifySuperAdminToken,
    verifyAdminExist,
    fetchTermAndCondition,
);
router.put('/update-terms-and-conditions/:id',
    verifySuperAdminToken,
    verifyAdminExist,
    updateTermAndCondition
);
router.delete('/remove-terms-and-condition/:id',
    verifySuperAdminToken,
    verifyAdminExist,
    removeTermAndCondition
)
export default router;
