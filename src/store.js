import { configureStore, createSlice } from '@reduxjs/toolkit';
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

    setRemove(state, action) {
      return state.filter((a) => {
        //넘겨준 id값을 받아서 그 id를 제외한 배열을 return 해준다.
        return action.payload != a.id;
      });
    },

    setList(state, action) {
      const listId = state.find((a) => {
        return a.id === action.payload.id;
      });
      if (listId === undefined) {
        return alert('상품이 담겼습니다.'), state.concat(action.payload);
      } else {
        alert('이미 담겼습니다!');
      }
    },
  },
});

export let { countUp, setList, setRemove, watchedId } = list.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    list: list.reducer,
  },
});
