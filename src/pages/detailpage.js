import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Context1 } from './../App.js';
import { setList } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const DetailPage = (props) => {
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let [alertNum, setAlertNum] = useState(false);
  let [content, setContent] = useState('');
  let [탭, 탭변경] = useState(0);
  let [nope, setNope] = useState('');

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let a = useSelector((res) => {
    return res;
  });

  useEffect(() => {
    if (isNaN(content) == true) {
      setAlertNum(true);
    } else {
      setAlertNum(false);
    }
  }, [content]);

  useEffect(() => {
    setNope('end');
    return () => {
      setNope('');
    };
  }, []);

  useEffect(() => {
    let storageSum = window.localStorage.getItem('watched');
    storageSum = JSON.parse(storageSum);
    storageSum.push(props.shoes[id].id);
    let newStorage = [...new Set(storageSum)];
    window.localStorage.setItem('watched', JSON.stringify(newStorage));
    console.log(newStorage);
  }, []);

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
    <div className={`container + start + ${nope}`}>
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

          <RedButton
            id="button"
            disabled={alertNum}
            onClick={() => {
              dispatch(setList(props.shoes[id]));
            }}
          >
            주문하기
          </RedButton>
          <RedButton onClick={() => navigate('/cart')}>장바구니</RedButton>
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

const TabContent = ({ 탭, shoes }) => {
  let [fade, setFade] = useState('');
  let { 재고 } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      setFade('');
    };
  }, [탭]);
  return (
    <div className={`start + ${fade}`}>
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
};

export default DetailPage;
