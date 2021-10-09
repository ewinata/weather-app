import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Awesome Button imports
import { AwesomeButton } from '@mikegsrv/react-awesome-button';
import '@mikegsrv/react-awesome-button/dist/themes/theme-blue.css';
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

/*
    Props:
    @changeCity - used to change the city in home screen
*/
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCity: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({searchCity: event.target.value});
    }


    render() {
        return(
            <Container className="search-bar">
                <Row className="justify-content-center align-items-center">
                    <Col className="col-auto p-0 m-0">
                        <h4><input type="text" placeholder="Search a city" value={this.state.searchCity} onChange={this.handleChange} /></h4>
                    </Col>
                    <Col className="col-auto p-0 m-0">
                        <AwesomeButton type="primary" className="primary-button" onPress={() => this.props.changeCity(this.state.searchCity)}>
                            <h4><FontAwesomeIcon icon={faSearch} /></h4>
                        </AwesomeButton>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SearchBar;