import { Link } from 'react-router-dom';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      {user ? (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">IMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/items" >Inventory</Nav.Link>
                <Nav.Link as={Link} to="/logs" >Activity Logs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Link to="/items/new"><Button variant="primary">NEW ITEM</Button></Link>
            <Link to="" onClick={handleSignout}><Button variant="secondary">Sign Out</Button></Link>
          </Container>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">IMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
            <ButtonGroup className="ms-auto">
              <Link to="/signin"><Button variant="secondary">Sign In</Button></Link>
              <Link to="/signup"><Button variant="secondary">Sign Up</Button></Link>
            </ButtonGroup>
          </Container>
        </Navbar>
      )}
    </>
  )
}

export default NavBar;