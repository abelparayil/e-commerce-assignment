import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = action.payload.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      );
    },
    addItemToCart: (
      state,
      action: PayloadAction<Omit<CartItem, 'quantity'>>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.item.price;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.item.id === action.payload
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalQuantity += action.payload.quantity - item.quantity;
        state.totalPrice +=
          item.item.price * (action.payload.quantity - item.quantity);
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  setCartItems,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
