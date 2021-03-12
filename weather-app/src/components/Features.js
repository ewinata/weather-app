import React from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';

export default function Features() {
    return(
        <div className="features">
            <NavBar />
            <Container>
                <div className="box-container">
                    <h1>This is the Features Page</h1>
                </div>
            </Container>
        </div>
    );
};