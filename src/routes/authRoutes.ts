import express, {Request, Response} from "express";
import registerController from "../controllers/registerController";
import verifyAccountController from "../controllers/verifyAccountController";
import loginController from "../controllers/loginController";
import resetPasswordController from "../controllers/resetPasswordController";

const router = express.Router();

router.post('/register', registerController);
router.get('/verify-account', verifyAccountController);
router.post('/login', loginController);
router.post('/reset-password', resetPasswordController);

export default router;