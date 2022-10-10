import './../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, plusAge, increase } from './../store/userSlice.js';
import { countUp, setRemove } from './../store.js';
import { memo, useMemo, useState } from 'react';

function 함수() {
  return 1;
}

let Child = memo(function () {
  console.log('재렌더링 됨');
  return <div>자식임</div>;
});

function Cart() {
  let a = useSelector((state) => {
    return state; //이 부분의 state는 store.js에서 가져온 state들을 말한다. state.stock 가능
  });

  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  let result = useMemo(() => {
    return 함수();
  }, []);

  return (
    <div>
      <Child></Child>

      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
      >
        +
      </button>
      <div>{a.user.name}의 장바구니</div>
      <div>{a.user.age}세</div>
      <button
        onClick={() => {
          dispatch(increase(10));
        }}
      >
        한살 더 먹기
      </button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>항목 삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {a.list.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(countUp(v.id));
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(setRemove(v.id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
