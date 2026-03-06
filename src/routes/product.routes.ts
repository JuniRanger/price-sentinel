import { Router } from "express";
import {
  listProducts,
  showCreateForm,
  createProductHandler,
} from "../controllers/product.controller";

const router = Router();

router.get("/", (_req, res) => res.redirect("/products"));

router.get("/products", listProducts);
router.get("/products/create", showCreateForm);
router.post("/products", createProductHandler);

export default router;

