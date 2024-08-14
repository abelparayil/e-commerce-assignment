import express from 'express';
import { addItem, getAllItems } from '../controllers/product-controller.js';

const productRouter = express.Router();

productRouter.post('/add', addItem);
productRouter.get('/', getAllItems);

export default productRouter;
