import { Router} from "express";
import { getCheckout, createCheckoutSession } from "../controllers/checkout.controller.js";
const router = Router();

router.get("/", getCheckout);
router.post("/", createCheckoutSession);
export default router;