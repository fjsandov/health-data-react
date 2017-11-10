import React from 'react';
import Select from 'react-select-plus';
import Toggle from 'react-toggle';
import CountyStore from '../stores/CountyStore';
import { Row, Col } from 'reactstrap';

export default class CountySelect extends React.Component {
    constructor() {
        super();
        this.state = {
            counties: [],
            currentCounty: null,
            onlyFavorites: false
        };
        this._onCountiesChange = this.onCountiesChange.bind(this);
        this._onCountySelect = this.onCountySelect.bind(this);
        this._toggleOnlyFavorites = this.toggleOnlyFavorites.bind(this);

        this._onFavoriteCountiesChange = this.onFavoriteCountiesChange.bind(this);
    }

    componentWillMount() {
        CountyStore.addChangeCountiesListener(this._onCountiesChange);
        CountyStore.addChangeFavoriteCountiesListener(this._onFavoriteCountiesChange);
    }
    
    componentWillUnmount() {
        CountyStore.removeChangeCountiesListener(this._onCountiesChange);
        CountyStore.removeChangeFavoriteCountiesListener(this._onFavoriteCountiesChange);
    }

    componentDidMount() {
        CountyStore.list();
    }

    onCountiesChange() {
        let counties = this.state.onlyFavorites ? CountyStore.getFavoriteCounties() : 
            CountyStore.getCounties();
        CountyStore.clearCurrentCounty();
        this.setState({counties: counties, currentCounty: null});
    }

    onCountySelect(selectedOption) {
        if(selectedOption) {
            let county = selectedOption.county;
            CountyStore.show(county.code);
            this.setState({currentCounty: county});
        }
    }

    onFavoriteCountiesChange() {
        if(this.state.onlyFavorites) {
            this._onCountiesChange();
        }
    }

    toggleOnlyFavorites() {
        // the logic looks reversed because at the end of the method we 
        // will toggle the value of onlyFavorites
        let counties = this.state.onlyFavorites ? CountyStore.getCounties() : 
            CountyStore.getFavoriteCounties();
        CountyStore.clearCurrentCounty();
        this.setState({
            counties: counties,
            currentCounty: null,
            onlyFavorites: !this.state.onlyFavorites
        });
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
            <Row className='county-select'>
                <Col>                        
                    <Select className='county-selector'
                        value={this.state.currentCounty === null ? '' : this.state.currentCounty._id}
                        options={data}
                        placeholder={"Select a county"}
                        clearable={false}
                        onChange={this._onCountySelect}
                    />
                    <div className="show-only-favorites">
                        <Toggle id='favorites-toggle' icons={false} onChange={this._toggleOnlyFavorites} />
                        <label htmlFor='favorites-toggle'>Show favorite counties only</label>
                    </div>
                </Col>
            </Row>
        );
    }
}