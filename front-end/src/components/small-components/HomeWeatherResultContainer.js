import React, { Component } from 'react';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudShowersHeavy, faThermometerThreeQuarters, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/**
 * This class focuses on showing the UI of weather results
 * on home page, while also retrieving the data from back end
 */
export default class HomeWeatherResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            value: null,
            icon: null,
        }
    }

    componentDidMount() {
        // Generate icon based on data type
        switch(this.state.type) {
            case "temperature":
                this.setState({icon: <FontAwesomeIcon icon={faThermometerThreeQuarters} />})
                break;
            case "humidity":
                this.setState({icon: <FontAwesomeIcon icon={faTint} />})
                break;
            case "precipitation":
                this.setState({icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />});
                break;
            case "wind":
                this.setState({icon: <FontAwesomeIcon icon={faWind} />});
                break;
            default:
                console.log("No data of this type");
                break;
        }
        this.setState({value: this.props.data});
    }

    render() {
        return(
            <div className="home-data card onhover">
                <div className="card-content">
                    <Container fluid>
                    <Row className="justify-content-center">
                        {this.state.icon}
                        </Row>
                        <Row className="justify-content-center">
                            <h5>{this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}:</h5>
                        </Row>
                        <Row className="justify-content-center">
                            <h5>{this.state.value}</h5>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}