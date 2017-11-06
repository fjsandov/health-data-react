import React from 'react';
import { Table } from 'reactstrap';
import CountyStore from '../stores/CountyStore';

export default class CountyDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            currentCounty: null
        };
        this._onCurrentCountyChange = this.onCurrentCountyChange.bind(this);
    }

    componentWillMount() {
        CountyStore.addChangeCurrentCountyListener(this._onCurrentCountyChange);
    }

    componentWillUnmount() {
        CountyStore.removeChangeListListener(this._onCurrentCountyChange);
    }

    onCurrentCountyChange() {
        let county = CountyStore.getCurrentCounty();
        this.setState({county: county});
    }

    render() {
        if(this.state.county) {
            let indicatorNames = Object.keys(this.state.county.indicators);
            return (
                <div className='county-detail'>
                    <h1>{this.state.county.name}</h1>
                    {indicatorNames.map(indicatorName => {
                        return (
                            <div key={indicatorName}>
                                <h3>{indicatorName}</h3>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Number</th>
                                            <th>Percent</th>
                                            <th>Lower confidence limit</th>
                                            <th>Upper confidence limit</th>
                                            <th>Age adjusted percent</th>
                                            <th>Age adjusted lower confidence limit</th>
                                            <th>Age adjusted upper confidence limit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.county.indicators[indicatorName].map(indicator => {
                                            return(
                                                <tr key={indicatorName+'-'+indicator.year}>
                                                    <th scope="row">{indicator.year}</th>
                                                    <td>{indicator.number}</td>
                                                    <td>{indicator.percent}</td>
                                                    <td>{indicator.lower_confidence_limit}</td>
                                                    <td>{indicator.upper_confidence_limit}</td>
                                                    <td>{indicator.age_adjusted_percent}</td>
                                                    <td>{indicator.age_adjusted_lower_confidence_limit}</td>
                                                    <td>{indicator.age_adjusted_upper_confidence_limit}</td>
                                                </tr>
                                            );
                                        })}               
                                    </tbody>
                                </Table>
                            </div>
                        );
                    })}
                </div>
            );
        }
        else {
            return (
                <div className='county-detail'>
                    <h1>Select a county to display the information</h1>
                </div>
            );
        }
    }
}