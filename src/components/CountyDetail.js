import React from 'react';
import CountyStore from '../stores/CountyStore';
import IndicatorTable from "./IndicatorTable";
import IndicatorCharts from "./IndicatorCharts";

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
                        let indicatorData = this.state.county.indicators[indicatorName];
                        return (
                            <div key={indicatorName}>
                                <h3>{indicatorName}</h3>
                                <IndicatorCharts data={indicatorData} />
                                <IndicatorTable data={indicatorData} indicator_name={indicatorName} />
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