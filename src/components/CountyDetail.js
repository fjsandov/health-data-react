import React from 'react';
import CountyStore from '../stores/CountyStore';
import IndicatorTable from "./IndicatorTable";
import IndicatorCharts from "./IndicatorCharts";
import { Jumbotron, Button, Alert, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


export default class CountyDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            currentCounty: null,
            activeTab: 'tab_1'
        };
        this._onCurrentCountyChange = this.onCurrentCountyChange.bind(this);
        this._toggle = this.toggle.bind(this);
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
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    render() {
        if(this.state.county) {
            let indicatorNames = Object.keys(this.state.county.indicators);

            return (
                <Jumbotron className='county-detail'>
                    <h1 className="display-4 clearfix">
                        <span className="float-left">{this.state.county.name}</span>
                        <Button color="primary" className='float-right'>Add to favorites</Button>
                    </h1>
                    <hr className="my-4" />
                    <div className='county-indicators-data'>
                        <Nav tabs>
                            {indicatorNames.map((indicatorName, index) => {
                                let tab = 'tab_'+(index + 1);
                                return (
                                    <NavItem key={'nav_item_' + indicatorName}>
                                        <NavLink className={classnames({ active: this.state.activeTab === tab, capitalize: true})} onClick={() => { this._toggle(tab); }}>
                                            {indicatorName}
                                        </NavLink>
                                    </NavItem>
                                );
                            })}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            {indicatorNames.map((indicatorName, index) => {
                                let tab = 'tab_'+(index + 1);
                                let indicatorData = this.state.county.indicators[indicatorName];
                                return (
                                    <TabPane tabId={tab} key={'tab_pane_' + indicatorName}>
                                        <IndicatorCharts data={indicatorData} />
                                        <IndicatorTable data={indicatorData} indicator_name={indicatorName} />
                                    </TabPane>
                                );
                            })}
                        </TabContent>
                    </div>
                </Jumbotron>
            );
        }
        else {
            return (
                <Alert className='county-detail' color="info">
                    Select a county to display the information
                </Alert>
            );
        }
    }
}