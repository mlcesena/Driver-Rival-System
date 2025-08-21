import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import DualToolTip from './DualToolTip';
import "./Comparison.css"
import { useTeamContext } from '../../contexts/TeamContext';
import { isDark } from '../../services/GlobalServices';

function GroupedBarChartContainer({ xAxisLabel = "X Axis", yAxisLabel = "Y Axis", teamData = [], yAxisMin = 0, yAxisMax = 100, reversed = false, tooltipLabel = "Value" }) {
    const { teams, firstTeamName, secondTeamName, team1Primary, team2Primary, team1Accent, team2Accent } = useTeamContext();

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
            // console.log(payload);

            return (
                <div className="scatter-tooltip">
                    <h1>{payload[0].payload.track}</h1>
                    <div className="divider"></div>
                    <h2>{firstTeamName !== "" ? teams.get(firstTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[0]?.payload.t1d1 ?? "None"} (${payload[0]?.payload.t1d1n})`}</p>
                    <p>{`${tooltipLabel}: ${payload[0]?.payload.t1d2 ?? "None"} (${payload[0]?.payload.t1d2n})`}</p>

                    <h2>{secondTeamName !== "" ? teams.get(secondTeamName).name : "No Team"}</h2>
                    <p>{`${tooltipLabel}: ${payload[0]?.payload.t2d1 ?? "None"} (${payload[0]?.payload.t2d1n})`}</p>
                    <p>{`${tooltipLabel}: ${payload[0]?.payload.t2d2 ?? "None"} (${payload[0]?.payload.t2d2n})`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <>
            <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height={600} minWidth={teamData.length > 10 ? 600 : 450} style={{ marginBottom: "2rem" }}>
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
                        <Bar dataKey="t1d1" fill={team1Primary} stroke={isDark(team1Primary) ? "#808080" : ""} strokeWidth={isDark(team1Primary) ? 1 : 0} />
                        <Bar dataKey="t1d2" fill={team1Accent} stroke={isDark(team1Accent) ? "#808080" : ""} strokeWidth={isDark(team1Accent) ? 1 : 0} />
                        <Bar dataKey="t2d1" fill={team2Primary} stroke={isDark(team2Primary) ? "#808080" : ""} strokeWidth={isDark(team2Primary) ? 1 : 0} />
                        <Bar dataKey="t2d2" fill={team2Accent} stroke={isDark(team2Accent) ? "#808080" : ""} strokeWidth={isDark(team2Accent) ? 1 : 0} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default GroupedBarChartContainer;