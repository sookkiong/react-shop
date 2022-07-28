import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Soo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" style={{ paddingRight: '15px' }}>
              홈
            </Link>
            <Link to="/detail">상세페이지</Link>
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
        <Route path="/detail" element={<div>상세페이지임</div>} />
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

export default App;
