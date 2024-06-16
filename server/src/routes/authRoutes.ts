import express, {Request, Response} from "express";
import registerController from "../controllers/registerController";

const router = express.Router();

router.post('/register', registerController);

export default router;