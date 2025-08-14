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
function LineChartContainer({ team1Data = [], team2Data = [], tooltipLabel = "Value" }) {
    const { teams, firstTeamName, secondTeamName, team1Primary, team2Primary } = useTeamContext();
    const trackMap = new Map(team1Data.map(d => [d.x, d.track]));

    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;

        const trackName = trackMap.get(payload.value) || "";

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="#aaaaaa" transform="rotate(-55)">
                    {trackName}
                </text>
            </g>
        );
    };

    function CustomTooltip({ payload, active }) {
        if (active) {
            return (
                <div className="scatter-tooltip">
                    <h1>{trackMap.get(payload[0].value)}</h1>
                    <div className="divider"></div>
                    <h2>{firstTeamName !== "" ? teams.get(firstTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[1]?.value ?? "None"}`}</p>

                    <h2>{secondTeamName !== "" ? teams.get(secondTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[3]?.value ?? "None"}`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <>
            <div className="stacked-bar-char-container">
                <ResponsiveContainer width="100%" height={600} minWidth={450} style={{ marginBottom: "2rem" }}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke="#3e3e3e" strokeDasharray={"3 3"} />
                        <XAxis
                            dataKey="track"
                            tick={CustomizedXAxisTick} />
                        <YAxis />
                        <Tooltip cursor={{ strokeDasharray: '3 3', fill: "rgba(100, 100, 100, 0.15)" }} content={<CustomTooltip />} />
                        <Line dataKey="ps1" stroke={team1Primary} strokeWidth={4} type='monotone' />
                        <Line dataKey="ps2" stroke={team2Primary} strokeWidth={4} type='monotone' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default LineChartContainer;