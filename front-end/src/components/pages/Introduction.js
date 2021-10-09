import React from 'react';
// Router import
import { Link } from 'react-router-dom';
// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// Awesome Button imports
import { AwesomeButton } from '@mikegsrv/react-awesome-button';
import '@mikegsrv/react-awesome-button/dist/themes/theme-blue.css';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function Introduction() {
    return (
        <Container className="introduction-box-container">
            <Row className="justify-content-center align-items-center">
                <Col xs="auto" className="p-3 title-container">
                    <h1>WeatheRecommender</h1>
                </Col>
            </Row>
            <Row className="justify-content-center" data-font-color="darkblue">
                <Col xs="auto">
                    <h3 >- Ermano Winata</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" className="p-3 button-container">
                    <Link to="/home">
                        <AwesomeButton type="primary" className="primary-button">
                            <h3><FontAwesomeIcon icon={faCampground} /> Home</h3>
                        </AwesomeButton>
                    </Link>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" className="button-container">
                    <h4>
                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                            {' '}Activate geolocation to add location feature{' '}
                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                    </h4>
                </Col>
            </Row>
        </Container>
    );
}