import React from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return(
            <div className="app-container">
                <NavBar />
                <Container>
                    <div className="box-container">
                        <div className="weather">
                            <h1>Current Weather</h1>
                            <ul>
                                <li>Today</li>
                                <li>10 Day</li>
                            </ul>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>Temperature</th>
                                    <th>Humidity</th>
                                    <th>Precipitation</th>
                                    <th>Wind</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    </tr>
                                    <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Container>
            </div>
        );
    };
};