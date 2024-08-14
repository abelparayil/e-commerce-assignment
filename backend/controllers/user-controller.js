import { PrismaClient } from '@prisma/client';
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../validations/user-validation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = resetPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
