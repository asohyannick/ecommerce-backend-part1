import { verifyGeneralApplicationAuthenticationToken } from "../../middleware/auth/auth";
import { 
    createSupport,
    fetchSupports,
    fetchSupport,
    updateSupport,
    removeSupport 
} from "../../controllers/support/supportController";
import express from 'express';
const router = express.Router();
router.post('/create-support',
    verifyGeneralApplicationAuthenticationToken,
    createSupport
);
router.get('/fetch-supports',
    verifyGeneralApplicationAuthenticationToken,
    fetchSupports
);
router.get('/fetch-support/:id',
    verifyGeneralApplicationAuthenticationToken,
    fetchSupport,
);
router.put('/update-support/:id',
    verifyGeneralApplicationAuthenticationToken,
    updateSupport,
);
router.delete('/remove-support/:id',
    verifyGeneralApplicationAuthenticationToken,
    removeSupport
);
export default router;
