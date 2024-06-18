import express, {Request, Response} from "express";
import registerController from "../controllers/registerController";
import verifyAccountController from "../controllers/verifyAccountController";
import loginController from "../controllers/loginController";

const router = express.Router();

router.post('/register', registerController);
router.get('/verify-account', verifyAccountController);
router.post('/login', loginController);

export default router;