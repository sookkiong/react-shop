import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import user from './store/userSlice.js';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let list = createSlice({
  name: 'list',
  initialState: [
    { id: 1, name: 'Grey Yordan', count: 100 },
    { id: 0, name: 'White and Black', count: 2 },
  ],
  reducers: {
    countUp(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[번호].count += 1;
    },
    setList(state, action) {
      state.push(action.payload);
    },
    setRemove(state, action) {
      const newLIst = state.filter((a) => {
        a.action.payload !== a;
      });
      return newLIst;
    },
  },
});

const remove = useCallback;

export let { countUp, setList, setRemove } = list.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    list: list.reducer,
  },
});
