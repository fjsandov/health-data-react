import React from 'react';
import Select from 'react-select-plus';
import CountyStore from '../stores/CountyStore';

export default class CountySelect extends React.Component {
    constructor() {
        super();
        this.state = {
            counties: [],
            currentCounty: null
        };
        this._onCountiesChange = this.onCountiesChange.bind(this);
        this._onCountySelect = this.onCountySelect.bind(this);
    }

    componentWillMount() {
        CountyStore.addChangeListListener(this._onCountiesChange);
    }

    componentWillUnmount() {
        CountyStore.removeChangeListListener(this._onCountiesChange);
    }

    componentDidMount() {
        CountyStore.list();
    }

    onCountiesChange() {
        let counties = CountyStore.getCounties();
        this.setState({counties: counties, currentCounty: null});
    }

    onCountySelect(selectedOption) {
        if(selectedOption) {
            let county = selectedOption.county;
            CountyStore.show(county.code);
            this.setState({currentCounty: county});
        }
    }

    render() {
        let stateNames = this.state.counties.map((county) => county.state);        
        // removing duplicate states
        stateNames = Array.from(new Set(stateNames));        
        // sorting the states alphabetically
        stateNames = stateNames.sort((a, b) => a.localeCompare(b));

        let data = [];
        stateNames.forEach(stateName => {
            let stateCounties = this.state.counties.filter(county => county.state === stateName);
            
            // sort alphabetically the counties into the current state
            stateCounties = stateCounties.sort((a, b) => a.name.localeCompare(b.name));

            // generating the option for the select2 input
            let stateCountiesOptions = stateCounties.map(stateCounty => {
                return { label: stateCounty.name, value: stateCounty._id, county: stateCounty }; 
            });
            
            let stateOptionGroup = { label: stateName, options: stateCountiesOptions };
            data.push(stateOptionGroup);
        });
        
        return (
            <div className="county-select">
                <Select className="selector"
                    value={this.state.currentCounty === null ? '' : this.state.currentCounty._id}
                    options={data}
                    placeholder={"Select a county"}
                    clearable={false}
                    onChange={this._onCountySelect}
                />
            </div>
        );
    }
}