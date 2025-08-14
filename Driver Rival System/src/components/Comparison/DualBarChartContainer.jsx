import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import DualToolTip from './DualToolTip';
import "./Comparison.css"
import { useTeamContext } from '../../contexts/TeamContext';
function StackedBarChartContainer({ xAxisLabel = "X Axis", yAxisLabel = "Y Axis", teamData = [], yAxisMin = 0, yAxisMax = 100, reversed = false, tooltipLabel = "Value" }) {
    const { teams, firstTeamName, secondTeamName, team1Primary, team2Primary } = useTeamContext();
    const trackMap = new Map(teamData.map(d => [d.x, d.track]));

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
            <div className="dual-bar-char-container">
                <ResponsiveContainer width="100%" height={600} minWidth={450} style={{ marginBottom: "2rem" }}>
                    <BarChart
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
                            type="number"
                            dataKey="x"
                            ticks={teamData.map(d => d.x)}
                            name={xAxisLabel}
                            unit=""
                            minTickGap={10}
                            tickMargin={15}
                            interval={0}
                            domain={[0, teamData.length - 1]}
                            label={{ value: xAxisLabel, position: "insideBottom", dy: 100 }}
                            tick={<CustomizedXAxisTick />} />
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
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3', fill: "rgba(100, 100, 100, 0.15)" }} content={<CustomTooltip />} />
                        <Bar dataKey="ps1" fill={team1Primary} />
                        <Bar dataKey="ps2" fill={team2Primary} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default StackedBarChartContainer;