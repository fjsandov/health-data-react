import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label } from 'recharts';

export default class PercentChart extends React.Component {
    render() {        
        return (
            <ResponsiveContainer width="100%" height={this.props.chartHeight} className="percent-chart">
                <LineChart data={this.props.data} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Year">
                        <Label value={this.props.chartTitle} position="bottom" />
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Percent" stroke="darkred" />
                    <Line type="monotone" dataKey="Lower confidence limit" stroke="darkblue" />
                    <Line type="monotone" dataKey="Upper confidence limit" stroke="darkgreen" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}