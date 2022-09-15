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
    setList(state, action) {
      const findItem = state.find((v) => v.id === action.payload.id);
      if (!findItem) {
        state.push(action.payload);
      } else {
        alert('이미 담겼어요!');
      }
    },

    setRemove(state, action) {
      return state.filter((a) => {
        return a.id !== action.payload; //받아온 id값을 제외한 다른 객체로 구성되는 새로운 배열을 생성함
      });
    },
  },
});

export let { countUp, setList, setRemove } = list.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    list: list.reducer,
  },
});
