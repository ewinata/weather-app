import React from 'react';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function About() {
    return(
        <div className="about">
            <NavBar />
            <Container>
                <div className="box-container">
                    <div className="title">
                        <h1>Weather App</h1>
                        <h2>coded by: Ermano Winata</h2>
                    </div>
                    <p>This is a personal project for learning purposes</p>
                    <p>Training for Full-Stack Web Development</p>
                    <p>Uses: React for frontend and _____ for backend</p>
                    <p>API taken from .......</p>
                    <h3><Button variant="primary" className="mr-auto" href="/">
                        Click Here To use the App</Button>
                    </h3>
                    <h1>Description for App: </h1>
                    <p>BLABLA</p>
                    <p>For more description of App Features {'  '} 
                        <Button variant="primary" href="/features">Click Here</Button>
                    </p>
                </div>
            </Container>
        </div>
    );
};