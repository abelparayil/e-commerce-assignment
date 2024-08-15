import { PrismaClient } from '@prisma/client';
import { cartSchema } from '../validations/cart-validation.js';

const prisma = new PrismaClient();

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = cartSchema.parse(req.body);

    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + (quantity || 1),
        },
      });

      return res.status(200).json(updatedCartItem);
    }

    const newCartItem = await prisma.cart.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        item: {
          connect: {
            id: itemId,
          },
        },
        quantity: quantity || 1,
      },
    });

    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { itemId, quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ error: 'Quantity cannot be negative' });
  }

  try {
    const updateCartItem = await prisma.cart.update({
      where: {
        userId_itemId: {
          userId: req.user.id,
          itemId,
        },
      },
      data: {
        quantity,
      },
    });

    return res.status(200).json(updateCartItem);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to update cart item quantity', error });
  }
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    await prisma.cart.delete({
      where: {
        userId_itemId: {
          userId: req.user.id,
          itemId: itemId,
        },
      },
    });
    return res.status(200).json({ message: 'Cart item removed' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove cart item', error });
  }
};

export const getUserCartItems = async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        item: true,
      },
    });

    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get cart items', error });
  }
};
