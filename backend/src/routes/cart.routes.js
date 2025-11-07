import { Router} from "express";
import { getCart, addToCart, removeFromCart ,updateCart} from "../controllers/cart.controller.js";
const router = Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.patch("/:id", updateCart); // Added PATCH route for updating cart item quantity

export default router;