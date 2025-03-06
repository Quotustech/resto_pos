import express from "express";
import * as menuControllers from "../controllers/menu.controller";
import * as authControllers from "../controllers/store.controller";
import * as orderController from "../controllers/order.controller";
import { authenticateStore } from "../middleware/pos.middleware";

const router = express.Router();

// store routes
router.route("/register").post(authControllers.registerRestaurant as any);
router.route("/login").post(authControllers.loginRestaurant as any);

// menu routes
router.route("/menu")
    .post(authenticateStore as any, menuControllers.createMenuController as any)
    .get(authenticateStore as any, menuControllers.getAllMenuController as any);

router.route("/menu/:id")
    .patch(authenticateStore as any, menuControllers.updateMenuController as any)
    .delete(authenticateStore as any, menuControllers.deleteMenuController as any);

// order routes
router.route('/order')
    .post(orderController.createOrderController as any)

router.route('/order/:orderId')
    .patch(authenticateStore as any, orderController.updateOrderController as any);


export default router;
