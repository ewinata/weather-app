import React, { Component } from 'react';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCloudShowersHeavy, faThermometerThreeQuarters, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
// React Bootstrap imports
import { Container, Row, Col } from 'react-bootstrap';

/**
 * This class focuses on showing the UI of daily weather results
 * on home page, while also retrieving the data from back end
 * Props:
 *   @data - the json response that will be shown by UI
 * 
 * Sample response:
        {
            dayTemp:   Array,
            nightTemp:    Array,
            dayWind:       Array of dict
                        {
                            direction:  String,
                            speed:      int in mph,
                        }
            nightWind:     Array of dict
                        {
                            direction:  String,
                            speed:      int in mph,
                        }
            dayWeather:    Array,
            nightWeather:    Array,
            dayHumidity:    Array,
            nightHumidity:  Array,
            dayPrecipitation:  Array,   int in  %, -1 if NA
            nightPrecipitation: Array,  int in  %
            sunriseTime:    Array,
            sunsetTime:     Array,
            moonriseTime:   Array,
            moonsetTime:    Array,
            dayUvIndex:     Array,  int out of 10, -1 if NA
            nightUvIndex:   Array,  int out of 10
        }
 */
export default class DailyWeatherResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.incrementIndex = this.incrementIndex.bind(this);
        this.decrementIndex = this.decrementIndex.bind(this);
    }

    incrementIndex() {
        if (this.state.index < 14)
            this.setState({index: this.state.index + 1})
    }

    decrementIndex() {
        if (this.state.index > 0)
            this.setState({index: this.state.index - 1})
    }

    render() {
        let cards = [];
        for (let i = 0; i < 15; i++) {
            let tempProps = {};
            tempProps.dayTemp = this.props.data.dayTemp[i];
            tempProps.nightTemp = this.props.data.nightTemp[i];
            tempProps.dayHumidity = this.props.data.dayHumidity[i];
            tempProps.nightHumidity = this.props.data.nightHumidity[i];
            tempProps.dayPrecipitation = this.props.data.dayPrecipitation[i];
            tempProps.nightPrecipitation = this.props.data.nightPrecipitation[i];
            tempProps.dayUvIndex = this.props.data.dayUvIndex[i];
            tempProps.nightUvIndex = this.props.data.nightUvIndex[i];
            tempProps.dayWeather = this.props.data.dayWeather[i];
            tempProps.nightWeather = this.props.data.nightWeather[i];
            tempProps.dayWind = this.props.data.dayWind[i];
            tempProps.nightWind = this.props.data.nightWind[i];
            tempProps.sunriseTime = this.props.data.sunriseTime[i];
            tempProps.sunsetTime = this.props.data.sunsetTime[i];
            tempProps.moonriseTime = this.props.data.moonriseTime[i];
            tempProps.moonsetTime = this.props.data.moonsetTime[i];
            cards.push(<Col><DailyContainer cardData={tempProps}/></Col>)
        }
        //console.log(this.props.data);
        return(
            <Container>
                <Row>
                    <Col>
                        <h2>Daily Result</h2>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container data-bg-color="lightblue">
                            <Row>
                                {cards[this.state.index]}
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col><h3>Day {this.state.index+1} of 15</h3></Col>
                </Row>
                <Row>
                    <Col>
                        <h2><button onClick={this.decrementIndex}><FontAwesomeIcon icon={faArrowCircleLeft} /></button></h2>
                    </Col>
                    <Col>
                        <h2><button onClick={this.incrementIndex}><FontAwesomeIcon icon={faArrowCircleRight} /></button></h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function DailyContainer({cardData}) {
    return (
        <Container>
            <Row>
                <Col>
                    <Container>
                        <Row><Col><h2>Day</h2></Col></Row>
                        <Row>
                            <Col>
                                <p>Temperature: {cardData.dayTemp}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Humidity: {cardData.dayHumidity}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Precipitation: {cardData.dayPrecipitation}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Uv Index: {cardData.dayUvIndex}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Weather: {cardData.dayWeather}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Wind: {cardData.dayWind.direction + ' ' + cardData.dayWind.speed + ' mph'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Sunrise Time: {cardData.sunriseTime}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Sunset Time: {cardData.sunsetTime}</p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container>
                        <Row><Col><h2>Night</h2></Col></Row>
                        <Row>
                            <Col>
                                <p>Temperature: {cardData.nightTemp}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Humidity: {cardData.nightHumidity}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Precipitation: {cardData.nightPrecipitation}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Uv Index: {cardData.nightUvIndex}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Weather: {cardData.nightWeather}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Wind: {cardData.nightWind.direction + ' ' + cardData.nightWind.speed + ' mph'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Moonrise Time: {cardData.moonriseTime}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Moonset Time: {cardData.moonsetTime}</p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}