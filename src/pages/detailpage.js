import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

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

  let RedButton = styled.button`
    background-color: red;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &#button {
      color: blue;
      &:disabled {
        background-color: grey;
        color: white;
        cursor: default;
      }
    }
    &:hover {
      background-color: grey;
    }

    border: none;
  `;

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
          <RedButton id="button" disabled={alertNum}>
            주문하기
          </RedButton>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
