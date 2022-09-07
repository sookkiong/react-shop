import { createSlice } from '@reduxjs/toolkit';

// store.js에서 만든 state 변경함수가 너무 길어져서 하나의 파일로 뺌.

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    changeName(state) {
      state.name = 'park';
    },
    plusAge(state) {
      state.age += 1;
    },
    plusAge2(state) {
      state.age += 10;
    },

    // 이 버튼을 눌렀을 땐 +10, 이 버튼을 눌렀을 땐 +2가 올라가도록 각각 짜려면 여러 개의 state함수를 만들어야 되는데, 파라미터를  이용하면 한번에 만들 수 있다.
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, plusAge, increase } = user.actions;

export default user;
