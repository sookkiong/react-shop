import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const DetailPage = (props) => {
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let [alertNum, setAlertNum] = useState(false);
  let [content, setContent] = useState('');

  useEffect(() => {
    if (isNaN(content) == true) {
      setAlertNum(true);
    } else {
      setAlertNum(false);
    }
  }, [content]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input onChange={(e) => setContent(e.target.value)} />
          {alertNum ? <p style={{ color: 'red' }}>숫자만 입력해주세요.</p> : null}

          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
