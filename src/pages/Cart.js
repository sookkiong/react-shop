import './../App.css';
import { useSelector } from 'react-redux';

function Cart() {
  let a = useSelector((state) => {
    return state; //이 부분의 state는 store.js에서 가져온 state들을 말한다. state.stock 가능
  });
  console.log(a.stock);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {a.list.map((v, i) => {
            return (
              <tr>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
