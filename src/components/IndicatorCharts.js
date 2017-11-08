import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { Container, Row, Col } from 'reactstrap';
import PercentChart from "./PercentChart";

export default class IndicatorCharts extends React.Component {
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
            
            percentChartData.push(percentChartDataEntry);
            ageAdjustedPercentChartData.push(ageAdjustedPercentChartDataEntry);
            numberChartData.push(numberChartDataEntry);
        });

        let chartsHeight = 300; /* IMPORTANT: Change this value to pick the height of the charts */

        return (
            <Container className="indicator-charts">
                <Row>
                    <Col>
                        <PercentChart data={percentChartData} chartHeight={chartsHeight}/>
                    </Col>
                    <Col>
                        <PercentChart data={ageAdjustedPercentChartData} chartHeight={chartsHeight}/>
                    </Col>
                    <Col>
                        <ResponsiveContainer width="100%" height={chartsHeight}>
                            <BarChart data={numberChartData}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="Year"/>
                                <YAxis/>
                                <Label value="Samples" position="top" />
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Bar dataKey="Samples" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Container>
        );
    }
}