import React from 'react';
import { Row, Col } from 'reactstrap';
import PercentChart from "./PercentChart";
import SamplesBarChart from "./SamplesBarChart";

export default class IndicatorCharts extends React.Component {

    validPercentChartEntry(entry) {
        return entry['Percent'] !== -1 && 
            entry['Lower confidence limit'] !== -1 &&
            entry['Upper confidence limit'] !== -1;
    }

    validNumberChartEntry(entry) {
        return entry['Samples'] !== -1;
    }

    render() {
        let percentChartData = [];
        let ageAdjustedPercentChartData = [];
        let numberChartData = [];

        this.props.data.forEach(singleYearData => {
            let year = singleYearData['year'];

            let percentChartDataEntry = {
                "Year": year,
                "Percent": singleYearData['percent'],
                "Lower confidence limit": singleYearData['lower_confidence_limit'],
                "Upper confidence limit": singleYearData['upper_confidence_limit']
            };
            let ageAdjustedPercentChartDataEntry = {
                "Year": year,
                "Percent": singleYearData['age_adjusted_percent'],
                "Lower confidence limit": singleYearData['age_adjusted_lower_confidence_limit'],
                "Upper confidence limit": singleYearData['age_adjusted_upper_confidence_limit']
            }
            let numberChartDataEntry = {
                "Year": year,
                "Samples": singleYearData['number']
            };
            
            if(this.validPercentChartEntry(percentChartDataEntry)) {
                percentChartData.push(percentChartDataEntry);
            }
            if(this.validPercentChartEntry(ageAdjustedPercentChartDataEntry)) {
                ageAdjustedPercentChartData.push(ageAdjustedPercentChartDataEntry);
            }
            if(this.validNumberChartEntry(numberChartDataEntry)) {
                numberChartData.push(numberChartDataEntry);
            }
        });

        let chartsHeight = 300; /* IMPORTANT: Change this value to pick the height of the charts */

        return (
            <Row className="indicator-charts">
                <Col md="4">
                    <SamplesBarChart data={numberChartData} chartHeight={chartsHeight} chartTitle='Samples'/>
                </Col>
                <Col md="4">
                    <PercentChart data={percentChartData} chartHeight={chartsHeight} chartTitle='Data'/>
                </Col>
                <Col md="4">
                    <PercentChart data={ageAdjustedPercentChartData} chartHeight={chartsHeight} chartTitle='Age adjusted data'/>
                </Col>
            </Row>
        );
    }
}