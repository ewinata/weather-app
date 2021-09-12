import React, { Component } from 'react';
import WeatherType from '../../model/model';
import HomeWeatherResultContainer from '../small-components/HomeWeatherResultContainer';
// Router import
import { Link } from 'react-router-dom';
// Awesome Button imports
import { AwesomeButton } from '@mikegsrv/react-awesome-button';
import '@mikegsrv/react-awesome-button/dist/themes/theme-blue.css';
// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            geolocationEnabled: false,
            location: {
                latitude: null,
                longitude: null,
                city: null,
            },
        };
    }

    /**
     * Generates the current location of the user if geolocation
     * is enabled. If not enabled, show the default location of
     * Santa Monica
     * @returns the state which determines which location to show
     */
    generateState() {
        if ("geolocation" in navigator) {
            // Then geolocation is activated
            // Set the state's location to current location
            this.setState({ geolocation: true });
            navigator.geolocation.getCurrentPosition((position) => {
                let url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
                url += `latitude=${parseFloat(position.coords.latitude.toFixed(7))}`;
                url += `&longitude=${parseFloat(position.coords.longitude.toFixed(7))}&localityLanguage=en`;
                // Fetch city name from reverse geocoder
                fetch(url)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            isLoaded: true,
                            location: {
                                latitude: parseFloat(position.coords.latitude.toFixed(7)),
                                longitude: parseFloat(position.coords.longitude.toFixed(7)),
                                city: result.city,
                            }
                        })
                        
        // Get data from back end
        //fetch('/daily/' + this.state.location.city).then(res => res.json()).then((result) => {console.log(result)});
                    });
            });
        } else {
            // Then geolocation is not activated
            // Set default city location to Seattle
            this.setState({ 
                isLoaded: true,
                geolocation: false, 
                location: {
                    latitude: null,
                    longitude: null,
                    city: "Seattle",
                }
            });
        }
    }

    componentDidMount() {
        this.generateState();
    }

    render() {
        /**
         * Static styles
         */
        const padding = {padding: "1rem"};
        let contentPadding = <Row className="justify-content-center"><Container style={padding} ></Container></Row>;

        if (this.state.isLoaded)
            // If loaded, show the main screen
            return (
                <Container className="home-page">
                    <Row className="justify-content-center">
                        <h1>Welcome to the Weather Forecast App</h1>
                    </Row>
                    {contentPadding}
                    <Row className="justify-content-center">
                        <h2>Current Weather at {this.state.location.city}</h2>
                    </Row>
                    {contentPadding}
                    <Row className="justify-content-center">
                        <Col className="temperature-data">
                            <HomeWeatherResultContainer type={WeatherType.temperature} />
                        </Col>
                        <Col className="humidity-data">
                            <HomeWeatherResultContainer type={WeatherType.humidity} />
                        </Col>
                        <Col className="precipitation-data">
                            <HomeWeatherResultContainer type={WeatherType.precipitation} />
                        </Col>
                        <Col className="wind-data">
                            <HomeWeatherResultContainer type={WeatherType.wind} />
                        </Col>
                    </Row>
                    {contentPadding}
                    <Row className="justify-content-center">
                        <Col>
                            <FormControl placeholder="Search" aria-label="Search" />
                        </Col>
                        <Col>
                            <Link to="/search">
                                <AwesomeButton type="primary" className="primary-button">
                                    <h2><FontAwesomeIcon icon={faSearchLocation} /> Search</h2>
                                </AwesomeButton>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            );
        else {
            // If not loaded, return empty screen
            return (<React.Fragment></React.Fragment>);
        }
    }
}