import React from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childComponent: props.childComponent,
        };
    };

    render() {
        return(
            <div className="app-container">
                <NavBar />
                <Container>
                    <div className="box-container">
                        {this.state.childComponent}
                    </div>
                </Container>
            </div>
        );
    };
};