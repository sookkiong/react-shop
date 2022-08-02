import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './pages/detailpage';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

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

              <Goods shoes={shoes} />
            </div>
          }
        />
        <Route path="/detail" element={<DetailPage />} />
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
                <img src={`${process.env.PUBLIC_URL}/img/cn${i + 1}.jpg`} width="80%" alt="사진1" />
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
