import {Router} from "express"; 
import { addProducts, getProducts } from "../controllers/products.controller.js";

import { get } from "mongoose";
const router=Router();

router.get("/", getProducts);
router.post("/add", addProducts);
export default router;
