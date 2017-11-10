import React from 'react';
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';

export default class IndicatorTable extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  cellData(value) {
      return (value === -1) ? 'No Data' : value;
  }

  render() {
    let buttonText = this.state.collapse ? "Hide table" : "Show table with data";
    let buttonColor = this.state.collapse ? "default" : "info";

    return (
      <div className="indicator-table">
        <Button color={buttonColor} onClick={this.toggle} style={{ marginBottom: '1rem' }}>{buttonText}</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
                <Table bordered>
                    <thead>
                        <tr>
                            <th rowSpan="2">Year</th>
                            <th rowSpan="2">Samples</th>
                            <th colSpan="3" scope="colgroup">Data</th>
                            <th colSpan="3" scope="colgroup">Age adjusted data</th>
                        </tr>
                        <tr>
                            <th>Percent</th>
                            <th>Lower confidence limit</th>
                            <th>Upper confidence limit</th>
                            <th>Percent</th>
                            <th>Lower confidence limit</th>
                            <th>Upper confidence limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(indicator => {
                            return(
                                <tr key={this.props.indicator_name+'-'+indicator.year}>
                                    <th scope="row">{indicator.year}</th>
                                    <td>{this.cellData(indicator.number)}</td>
                                    <td>{this.cellData(indicator.percent)}</td>
                                    <td>{this.cellData(indicator.lower_confidence_limit)}</td>
                                    <td>{this.cellData(indicator.upper_confidence_limit)}</td>
                                    <td>{this.cellData(indicator.age_adjusted_percent)}</td>
                                    <td>{this.cellData(indicator.age_adjusted_lower_confidence_limit)}</td>
                                    <td>{this.cellData(indicator.age_adjusted_upper_confidence_limit)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}