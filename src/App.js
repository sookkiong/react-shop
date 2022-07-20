import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
       <Navbar variant="dark" className="redBg">
        <Container>
          <Navbar.Brand href="#home">Bootstrap</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">메뉴1</Nav.Link>
            <Nav.Link href="#features">메뉴2</Nav.Link>
            <Nav.Link href="#pricing">메뉴3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
