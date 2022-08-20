import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './pages/detailpage';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [showBox, setShowBox] = useState(true);
  let [boxNum, setBoxNum] = useState(3);
  let [db, setDb] = useState({
    data: [],
  });

  useEffect(() => {
    if (boxNum > 0) {
      setTimeout(() => {
        setBoxNum(boxNum - 1);
      }, 1000);
    } else {
      setShowBox(false);
    }

    return () => {};
  }, [boxNum]);

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
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main-bg"></div>

              <div style={{ margin: '20px 0' }}></div>

              <Goods shoes={shoes} />

              {db.data.map((v, i) => {
                return <div>{v.id}</div>;
              })}

              <button
                onClick={() => {
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((data) => {
                      setDb(data);
                    })
                    .catch(() => {
                      console.log('실패함');
                    });
                }}
              >
                버튼
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
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버 사이트</div>} />
          <Route path="location" element={<div>위치 정보 사이트</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>

        <Route path="*" element={<div>없는 페이지 입니다.</div>} />
      </Routes>
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

export default App;
