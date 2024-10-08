import express from 'express';
import userRouter from './routes/user-routes.js';
import productRouter from './routes/product-routes.js';
import cartRouter from './routes/cart-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'https://e-commerce.abelparayil.co',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {});
