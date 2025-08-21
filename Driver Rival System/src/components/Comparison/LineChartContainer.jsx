import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import DualToolTip from './DualToolTip';
import "./Comparison.css"
import { useTeamContext } from '../../contexts/TeamContext';
const data = [
    {
        track: 'Page A',
        ps1: 4000,
        ps2: 2400,
    },
    {
        track: 'Page B',
        ps1: 3000,
        ps2: 1398,
    },
    {
        track: 'Page C',
        ps1: 2000,
        ps2: 9800,
    },
    {
        track: 'Page D',
        ps1: 2780,
        ps2: 3908,
    },
    {
        track: 'Page E',
        ps1: 1890,
        ps2: 4800,
    },
    {
        track: 'Page F',
        ps1: 2390,
        ps2: 3800,
    },
    {
        track: 'Page G',
        ps1: 3490,
        ps2: 4300,
    },
];
function LineChartContainer({ xAxisLabel = "X Axis", yAxisLabel = "Y Axis", teamData = [], yAxisMin = 0, yAxisMax = 100, tooltipLabel = "Value", reversed = false, dataOption }) {
    const { teams, firstTeamName, secondTeamName, team1Primary, team2Primary } = useTeamContext();

    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="#aaaaaa" transform="rotate(-55)">
                    {payload.value}
                </text>
            </g>
        );
    };

    const CustomizedYAxisTick = (props) => {
        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="#aaaaaa">
                    {payload.value}
                </text>
            </g>
        );
    };

    function CustomTooltip({ payload, active }) {
        if (active) {
            return (
                <div className="scatter-tooltip">
                    <h1>{payload[0].payload.track}</h1>
                    <div className="divider"></div>
                    <h2>{firstTeamName !== "" ? teams.get(firstTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[0]?.value ?? "None"}`}</p>

                    <h2>{secondTeamName !== "" ? teams.get(secondTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[1]?.value ?? "None"}`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <>
            <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height={600} minWidth={450} style={{ marginBottom: "2rem" }}>
                    <LineChart
                        data={teamData}
                        margin={{
                            top: 15,
                            right: 20,
                            bottom: 100,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#3e3e3e" strokeDasharray={"3 3"} />
                        <XAxis
                            type="category"
                            dataKey="track"
                            ticks={teamData.map(d => d.track)}
                            name={xAxisLabel}
                            unit=""
                            minTickGap={100}
                            tickMargin={15}
                            interval={0}
                            domain={[0, teamData.length - 1]}
                            label={{ value: xAxisLabel, position: "insideBottom", dy: 100 }}
                            tick={<CustomizedXAxisTick />}
                        />
                        <YAxis
                            type='number'
                            domain={[yAxisMin, yAxisMax]}
                            allowDataOverflow={false}
                            name={yAxisLabel}
                            unit=""
                            reversed={reversed}
                            tickMargin={10}
                            tickCount={yAxisMax}
                            label={{ value: yAxisLabel, position: "insideLeft", angle: -90 }}
                            tick={<CustomizedYAxisTick />}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3', fill: "rgba(100, 100, 100, 0.15)" }} content={<CustomTooltip />} />
                        <Line dataKey={`t1v${dataOption}`} stroke={team1Primary} strokeWidth={4} type='monotone' />
                        <Line dataKey={`t2v${dataOption}`} stroke={team2Primary} strokeWidth={4} type='monotone' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default LineChartContainer;