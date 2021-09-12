import React from 'react';
import Button from 'react-bootstrap/Button';

export default function About() {
    return(
        <div className="about">
            <div className="title">
                <h1>Weather App</h1>
                <h2>coded by: Ermano Winata</h2>
            </div>
            <p>This is a personal project for learning purposes</p>
            <p>Training for Full-Stack Web Development</p>
            <p>Uses: React for frontend and flask for backend</p>
            <p>Dependencies:</p>
            <ul>
                <li>
                    <a href="https://www.npmjs.com/package/@mikegsrv/react-awesome-button">Animated Buttons</a>
                </li>
                <li>
                    <a href="https://www.npmjs.com/package/react-router-dom">Router</a>
                </li>
                <li>
                    <a href="https://www.npmjs.com/package/react-bootstrap">BootStrap</a>
                </li>
                <li>
                    <a href="https://www.npmjs.com/package//font-awesome">Icons</a>
                </li>
                <li>
                    <a href="https://www.npmjs.com/package/sass-loader">Sass Loader</a>
                </li>
            </ul>
            <p>APIs used:</p>
            <ul>
                <li>
                    <a href="https://www.bigdatacloud.com/geocoding-apis">Location</a>
                </li>
            </ul>
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
    );
};