import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: 'kim',
  reducers: {
    changeName(state) {
      return 'john' + state;
    },
  },
});

export let { changeName } = user.actions;

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let list = createSlice({
  name: 'list',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 1, name: 'Grey Yordan', count: 100 },
  ],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    list: list.reducer,
  },
});
