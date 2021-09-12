import React from 'react';
// React bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faHome } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">
                <h1><FontAwesomeIcon icon={faCloudSunRain} /> Weather App</h1>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
                <Nav.Link href="/about"><h4>About</h4></Nav.Link>
                <Nav.Link href="/home"><h4><FontAwesomeIcon icon={faHome} /> Home</h4></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};