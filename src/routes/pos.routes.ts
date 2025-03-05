import express from "express";
import { createMenu, deleteMenu, updateMenu } from "../controllers/menu.controller";
import { loginRestaurant, registerRestaurant } from "../controllers/store.controller";
import * as orderController from "../controllers/order.controller";
import { authenticateStore } from "../middleware/pos.middleware";

const router = express.Router();

// store routes
router.route("/register").post(registerRestaurant as any);
router.route("/login").post(loginRestaurant as any);
// menu routes
router.route("/menu").post(authenticateStore as any, createMenu as any);
router.route("/menu/:id")
    .patch(authenticateStore as any, updateMenu as any)
    .delete(authenticateStore as any, deleteMenu as any);

router.route('/order')
    .post(orderController.createOrderController as any)

router.route('/order/:orderId')
    .patch(authenticateStore as any, orderController.updateOrderController as any);


export default router;
