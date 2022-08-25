import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';

const DetailPage = (props) => {
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let [alertNum, setAlertNum] = useState(false);
  let [content, setContent] = useState('');
  let [탭, 탭변경] = useState(0);

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

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent 탭={탭} />
    </div>
  );
};

/* const TabContent = (props) => {
  if (props.탭 == 0) {
    return <div>내용 0</div>;
  } else if (props.탭 == 1) {
    return <div>내용 1</div>;
  } else if (props.탭 == 2) {
    return <div>내용 2</div>;
  }
}; */

/* const TabContent = ({ 탭 }) => {
  if (탭 == 0) {
    return <div>내용 0</div>;
  } else if (탭 == 1) {
    return <div>내용 1</div>;
  } else if (탭 == 2) {
    return <div>내용 2</div>;
  }
}; */

const TabContent = ({ 탭 }) => {
  //탭이 0이면 왼쪽 배열 중 0번째 애가 출력 됨.
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭];
};

export default DetailPage;
