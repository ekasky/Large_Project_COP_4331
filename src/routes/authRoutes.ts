import express, {Request, Response} from "express";
import registerController from "../controllers/registerController";
import verifyAccountController from "../controllers/verifyAccountController";

const router = express.Router();

router.post('/register', registerController);
router.get('/verify-account', verifyAccountController);

export default router;