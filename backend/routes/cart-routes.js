import express from 'express';
import {
  addItemToCart,
  getUserCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from '../controllers/cart-controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/items', authMiddleware, getUserCartItems);
cartRouter.post('/add', authMiddleware, addItemToCart);
cartRouter.put('/update-quantity', authMiddleware, updateCartItemQuantity);
cartRouter.delete('/remove-item/:itemId', authMiddleware, removeCartItem);

export default cartRouter;
