import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
    let imgstyle = {width: '2rem'};
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img style={imgstyle} src={process.env.PUBLIC_URL + "/logo256.png"}/>Weather App
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="features">Features</Nav.Link>
            </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="dark">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};