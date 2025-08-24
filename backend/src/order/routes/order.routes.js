import express from "express";
import { createNewOrder,getSingleOrder,findMyOrders,getAllPlacedOrders,updateOrderStatus } from "../controllers/order.controller.js";
import { auth,authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/:id").get(auth,getSingleOrder);
router.route("/my/orders").get(auth,findMyOrders);
router.route("/orders/placed").get(auth,authByUserRole("admin"),getAllPlacedOrders);
router.route("/update/:id").put(auth,authByUserRole("admin"),updateOrderStatus);
export default router;
