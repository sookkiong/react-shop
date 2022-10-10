import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { lazy, Suspense, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { createContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
// import DetailPage from './pages/detailpage';
// import Cart from './pages/Cart.js';

const DetailPage = lazy(() => import('./pages/detailpage'));
const Cart = lazy(() => import('./pages/Cart.js'));

export let Context1 = createContext();

function App() {
  let cookie = new Cookies();
  let obj = { name: 'kim' };
  localStorage.setItem('data', JSON.stringify(obj));
  let saving = localStorage.getItem('data');
  console.log(JSON.parse(saving));

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [showBox, setShowBox] = useState(true);
  let [boxNum, setBoxNum] = useState(3);
  let [db, setDb] = useState([]);
  let [userClick, setUserClick] = useState(2);
  let [msg, setMsg] = useState(false);
  let [재고, 재고변경] = useState([11, 12, 13]);
  let lookedItem = JSON.parse(window.localStorage.getItem('watched'));
  let [pop, setPop] = useState(true);

  useEffect(() => {
    if (!window.localStorage.getItem('watched')) {
      window.localStorage.setItem('watched', JSON.stringify([]));
      console.log('watched 스토리지가 만들어졌습니다');
    }
  }, []);

  let result = useQuery(
    '작명',
    () =>
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        console.log('요청됨');
        return a.data;
      }),
    { staleTime: 2000 }
  );

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Soo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              상세페이지
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading ? '로딩 중' : result.data.name + '님 접속 중'}
          </Nav>
        </Container>
      </Navbar>

      <MyGoods lookedItem={lookedItem} />

      {/* {pop && cookie.get('pop') !== 'true' ? <PopUp setPop={setPop} cookie={cookie} /> : null} */}

      <Suspense fallback={<div>페이지 로딩 중</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="main-bg"></div>

                <div style={{ margin: '20px 0' }}></div>

                <Goods shoes={shoes} />
                {db.map((v, i) => {
                  return (
                    <>
                      <div>{v.id}번 상품</div>
                    </>
                  );
                })}
                {msg ? <div>로딩중</div> : null}

                <button
                  onClick={() => {
                    setMsg(true);
                    axios
                      .get(`https://codingapple1.github.io/shop/data${userClick}.json`)
                      .then((data) => {
                        setDb(db.concat(data.data));
                        setUserClick(userClick + 1);
                      })
                      .catch((error) => {
                        if (error.response.status === 404) {
                          alert('마지막 페이지입니다');
                        }
                      });
                    setMsg(false);
                  }}
                >
                  더 보기
                </button>
              </div>
            }
          />
          <Route
            path="/detail"
            element={
              <>
                <div>상세페이지입니다.</div>
                {showBox ? (
                  <div
                    style={{
                      background: 'yellow',
                      padding: '50px 0',
                      marginTop: '20px',
                    }}
                  >
                    저는 {boxNum}초 뒤 사라져요! <br />
                  </div>
                ) : null}
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고 }}>
                <DetailPage shoes={shoes} />
              </Context1.Provider>
            }
          />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버 사이트</div>} />
            <Route path="location" element={<div>위치 정보 사이트</div>} />
          </Route>
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
          </Route>

          <Route path="*" element={<div>없는 페이지 입니다.</div>} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div>
  );
}

const Goods = (props) => {
  return (
    <div>
      <Row>
        {props.shoes.map((v, i) => {
          return (
            <div>
              <Col sm>
                <img
                  src={`${process.env.PUBLIC_URL}/img/cn${i + 1}.jpg`}
                  width="80%"
                  alt={`사진${i + 1}`}
                />
                <h4>{v.title}</h4>
                <p>{v.price}</p>
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
};

const Event = () => {
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  );
};

const MyGoods = (props) => {
  if (props.lookedItem != undefined) {
    return (
      <div>
        <div>내가 본 상품</div>
        {props.lookedItem.map(function (v, i) {
          return (
            <div>
              <div>{v}번 상품 봄</div>
            </div>
          );
        })}
      </div>
    );
  }
};

const PopUp = ({ setPop, cookie }) => {
  let now = new Date();
  let after1m = new Date();
  after1m.setMinutes(now.getMinutes() + 1);
  return (
    <PopupBox>
      <div>팝업창입니다</div>
      <div>
        <button
          onClick={() => {
            setPop(false);
          }}
        >
          x
        </button>
        <button
          onClick={() => {
            cookie.set('pop', 'true', {
              expires: after1m,
            });
            setPop(false);
          }}
        >
          다시 보지 않기
        </button>
      </div>
    </PopupBox>
  );
};

export default App;

const PopupBox = styled.div`
  border: 1px solid black;
  background: #fff;
  position: fixed;
  width: 50%;
  top: 50%;
  left: calc(50% - 25%);
  padding: 50px;
`;
