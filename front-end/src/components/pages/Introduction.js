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
import { faCampground, faDatabase, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faReact, faPython, faNode, faBootstrap } from '@fortawesome/free-brands-svg-icons';

export default function Introduction() {
    /**
     * Static styles
     */
    const textStyle = {color: "#2E0854"};
    const padding = {padding: "1rem"};
    const reactStyle = {color: "blue", fontSize: "5rem"};
    const dbStyle = {color: "gray", fontSize: "5rem"};
    const pythonStyle = {color: "#f5e50f", fontSize: "5rem"};
    const bootstrapStyle = {color: "purple", fontSize: "5rem"};
    const nodeStyle = {color: "green", fontSize: "5rem"};
    const noteStyle = {color: "#dc143c"};
    let contentPadding = <Row className="justify-content-center"><Container style={padding} ></Container></Row>;

    return (
        <Container className="introduction-page box-container">
            <Row className="justify-content-center align-items-center">
                <Col xs="auto" className="title-container">
                    <h1 style={textStyle}>Weather Forecast App</h1>
                </Col>
            </Row>
            {contentPadding}
            <Row className="justify-content-center">
                <Col xs="auto">
                    <FontAwesomeIcon icon={faReact} style={reactStyle} />
                </Col>
                <Col xs="auto">
                    <FontAwesomeIcon icon={faBootstrap} style={bootstrapStyle}/>
                </Col>
                <Col xs="auto">
                    <FontAwesomeIcon icon={faPython} style={pythonStyle}/>
                </Col>
                <Col xs="auto">
                    <FontAwesomeIcon icon={faNode} style={nodeStyle}/>
                </Col>
                <Col xs="auto">
                    <FontAwesomeIcon icon={faDatabase} style={dbStyle}/>
                </Col>
            </Row>
            {contentPadding}
            <Row className="justify-content-center">
                <Col xs="auto" className="button-container">
                    <Link to="/home">
                        <AwesomeButton type="primary" className="primary-button">
                            <h2><FontAwesomeIcon icon={faCampground} /> Home Page</h2>
                        </AwesomeButton>
                    </Link>
                </Col>
            </Row>
            {contentPadding}
            <Row className="justify-content-center">
                <Col xs="auto" className="button-container">
                    <h4 style={textStyle}>
                        <FontAwesomeIcon icon={faExclamationTriangle} style={noteStyle}/>
                            {' '}Activate geolocation to unlock all features{' '}
                        <FontAwesomeIcon icon={faExclamationTriangle} style={noteStyle}/>
                    </h4>
                </Col>
            </Row>
        </Container>
    );
}