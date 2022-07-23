import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import {useState} from "react";
import data from './data.js';


function App() {

  let [shoes] = useState(data)
  const goodsArr = [1,2,3];

  return (
    <div className="App">
       <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Soo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
            <Nav.Link href="#pricing">My</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      {/* <Container>
        <Row>
          <Col sm>
            <img src={`${process.env.PUBLIC_URL}/img/cn1.jpg`} width="80%"/>
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].price}</p>
          </Col>
          <Col sm>
            <img src="img/cn2.jpg" width="80%"/>
            <h4>{shoes[1].title}</h4>
            <p>{shoes[1].price}</p>
          </Col>
          <Col sm>
            <img src="img/cn3.jpg" width="80%"/>
            <h4>{shoes[2].title}</h4>
            <p>{shoes[2].price}</p>
          </Col>
        </Row>
      </Container> */}

      <Goods shoes={shoes} goodsArr={goodsArr}/>
    </div>
  );
}

const Goods = (props) => {
  return(
    <div>
      <Row>
        {
          props.shoes.map((v, i)=>{
            return(
              <div>
                <Col sm>
                <img src={`${process.env.PUBLIC_URL}/img/cn${i+1}.jpg`} width="80%" alt='사진1'/>
                <h4>{v.title}</h4>
                <p>{v.price}</p>
                </Col>
              </div>
            )
              
          })
        }
      </Row>
    </div>
  )
}

export default App;
