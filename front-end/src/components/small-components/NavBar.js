import React from 'react';
// React bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faHome } from '@fortawesome/free-solid-svg-icons';
// Stylesheet imports
import './NavBar.css';

export default function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand href="/home">
                <h3 data-hover-opacity="decrease"><FontAwesomeIcon icon={faCloudSunRain} /> WeatheRecommender</h3>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
                <Nav.Link href="/about"><h4 data-font-color="black" data-hover-opacity="decrease">About</h4></Nav.Link>
                <Nav.Link href="/home"><h4 data-font-color="black" data-hover-opacity="decrease"><FontAwesomeIcon icon={faHome} /> Home</h4></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};