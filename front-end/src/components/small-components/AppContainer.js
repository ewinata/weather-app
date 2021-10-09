import React from 'react';
import NavBar from './NavBar';
import { Container, Row, Col } from 'react-bootstrap';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childComponent: props.childComponent,
        };
    };

    render() {
        return(
            <Container fluid className="main-app">
                <Row>
                    <Col className="p-0">
                        <NavBar />
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                        <div className="box-container">
                            {this.state.childComponent}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };
};