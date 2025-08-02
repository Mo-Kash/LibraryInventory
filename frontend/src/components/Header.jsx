import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header({setSelectedCategory, setSelectedItem, setShowAddForm}) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" variants="dark" expand="lg" className="mb-4 custom-navbar">
      <Container>
        
        <Navbar.Brand href="#home">📚 Library Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#"
              onClick={()=>{
                setSelectedCategory(null);
                setSelectedItem(null);
                setShowAddForm(false);
              }}
            >
              All Items
            </Nav.Link>
            <Nav.Link 
              href="#"
              onClick={()=>setShowAddForm(true)}
            >
              Add Item
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;