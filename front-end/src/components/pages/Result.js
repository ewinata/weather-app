import React from 'react';
import { useParams } from 'react-router';

export function Result() {
    let { cityName } = useParams();
    return(
        <React.Fragment>
            <h1>{cityName}</h1>
        </React.Fragment>
    );
}