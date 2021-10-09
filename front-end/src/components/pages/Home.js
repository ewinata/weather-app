import React, { Component } from 'react';
// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Misc components
import SearchBar from '../misc-commponents/SearchBar';
import DailyWeatherResultContainer from '../misc-commponents/DailyWeatherResultContainer';
import HourlyWeatherResultContainer from '../misc-commponents/HourlyWeatherResultContainer';
// Test
import testData from '../../test/dailyData.json';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // USED FOR TESTING
            test: false,
            // SET TO FALSE IF NOT TESTING
            isLoaded: false,
            geolocationEnabled: false,
            location: {
                latitude: null,
                longitude: null,
                city: null,
            },
            data: null,
            daily: true,   //used to check if we want daily (true) or hourly (false) results
            refetch: true, // used to check if we have to refetch data from backend
                            // starts at true since we would have to initially fetch data
        };
        this.changeCity = this.changeCity.bind(this);
    }

    /**
     * Generates the current location of the user if geolocation
     * is enabled. If not enabled, show the default location of
     * Santa Monica
     */
    componentDidMount() {
        if ("geolocation" in navigator) {
            // Then geolocation is activated
            navigator.geolocation.getCurrentPosition((position) => {
                let url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
                url += `latitude=${parseFloat(position.coords.latitude.toFixed(7))}`;
                url += `&longitude=${parseFloat(position.coords.longitude.toFixed(7))}&localityLanguage=en`;
                // Fetch city name from reverse geocoder
                fetch(url)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            geolocation: true,
                            location: {
                                latitude: parseFloat(position.coords.latitude.toFixed(7)),
                                longitude: parseFloat(position.coords.longitude.toFixed(7)),
                                city: result.city,
                            }
                        })
                    });
            });
        } else {
            // Then geolocation is not activated
            // Set default city location to Seattle
            this.setState({
                geolocation: false, 
                location: {
                    latitude: null,
                    longitude: null,
                    city: "Seattle",
                }
            });
        }
    }

    /*
        This function is called whenever setState is called
    */
    async componentDidUpdate(prevProps, prevState) {
        // If we have to refetch data then we fetch from back end
        if (this.state.location.city !== prevState.location.city && this.state.refetch) {
            if (this.state.test)
                this.setState({
                    data: testData,
                    isLoaded: true
                })
            else {
                // Get data from back end
                let result = await fetch('/weather/' + this.state.location.city + '?table=daily').then(res => res.json());
                // console.log(result)
                if (result)
                    // If result is not empty
                    // set the result as this.state.data
                    this.setState({data: result, isLoaded: true})
                else 
                    // If result is empty
                    // Go back to previous state
                    // this.state.data is still the same as prevState.data
                    {
                        this.setState({
                        location: prevState.location,
                        isLoaded: true,
                        refetch: false
                    });
                    alert('There was a problem with your search: City not found');
                }
            }
          }
    }

    /*
        This function is used to change state of home screen
        It is to be passed in to search bar and used to change states of home screen.
    */
    changeCity = (newLocation) => {
        // Check if newLocation is the same as this.state.location
        if (this.state.location.city !== newLocation)
            // Start loading and set new city
            // let componentDidUpdate refetch data from back end
            this.setState({
                isLoaded: false,
                refetch: true,
                location: { city: newLocation }
            });
        else if (!this.state.daily)
            // Resets to show daily results
            this.setState({
                daily: true
            })
    }

    render() {
        if (this.state.isLoaded)
            // If loaded, show the main screen
            return (
                <Container fluid className="text-center p-0">
                    <Row className="justify-content-center align-items-center m-0 p-0" data-bg-color="search">
                        <Col>
                            <Row className="px-4 pt-4 justify-content-center">
                                <Col className="col-auto">
                                    <h2>Current Weather</h2>
                                </Col>
                            </Row>
                            <Row className="px-5 pb-5 justify-content-center">
                                <Col className="col-auto">
                                    <Container>
                                        <Row>
                                            <Col data-bg-color="lightblue">
                                                <h5>@ {this.state.location.city}</h5>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className="p-2 justify-content-center">
                                <Col className="col-auto">
                                    <SearchBar changeCity={this.changeCity} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="result-container m-0 p-0">
                        <Col>
                            {this.state.daily ? <DailyWeatherResultContainer data={this.state.data} /> : <HourlyWeatherResultContainer />}
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