import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';

export default class SamplesBarChart extends React.Component {
    render() {
        return (
            <ResponsiveContainer width="100%" height={this.props.chartHeight} className="samples-bar-chart">
                <BarChart data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 25}}>
                    <XAxis dataKey="Year">
                        <Label value={this.props.chartTitle} position="bottom" />
                    </XAxis>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Bar dataKey="Samples" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}