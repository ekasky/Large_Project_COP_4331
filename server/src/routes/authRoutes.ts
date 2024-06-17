import express, {Request, Response} from "express";
import registerController from "../controllers/registerController";
import verifyEmailController from "../controllers/verifyEmailController";

const router = express.Router();

router.post('/register', registerController);
router.get('/verify-email', verifyEmailController);

export default router;