import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class WeatherResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className="weather">
        <h1>Current Weather</h1>
        <ul>
            <li>Hourly</li>
            <li>Daily</li>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
            </tbody>
        </Table>
    </div>
        );
    }
}