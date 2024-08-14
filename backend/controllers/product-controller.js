import { PrismaClient } from '@prisma/client';
import { itemSchema } from '../validations/item-validation.js';

const prisma = new PrismaClient();

export const addItem = async (req, res) => {
  try {
    const { title, price, image } = itemSchema.parse(req.body);

    const newItem = await prisma.item.create({
      data: {
        title,
        price,
        image,
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
