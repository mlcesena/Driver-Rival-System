import { useDriverContext } from "../../contexts/DriverContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Dot, ResponsiveContainer, ZAxis } from 'recharts';
import DriverLegend from "../DriverLegend";
import "./Comparison.css"
import { act, useEffect } from "react";

function ScatterChartContainer({ title = "Null", xAxisLabel = "X Axis", yAxisLabel = "Y Axis", driver1Data = [], driver2Data = [], yAxisMin = 0, yAxisMax = 100, reversed = false, tooltipLabel = "Value" }) {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary } = useDriverContext();
    const trackMap = new Map(driver1Data.map(d => [d.x, d.track]));
    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;

        const trackName = trackMap.get(payload.value) || "";

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="#aaaaaa" transform="rotate(-90)">
                    {trackName}
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
                    <h1>{trackMap.get(payload[0].value)}</h1>
                    <div className="divider"></div>
                    <h2>{firstDriverNumber > 0 ? drivers.get(firstDriverNumber).full_name : "No Driver"}</h2>
                    <p>{`${tooltipLabel}: ${payload[1]?.value ?? "None"}`}</p>

                    <h2>{secondDriverNumber > 0 ? drivers.get(secondDriverNumber).full_name : "No Driver"}</h2>
                    <p>{`${tooltipLabel}: ${payload[3]?.value ?? "None"}`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <>
            <DriverLegend></DriverLegend>
            <div className="scatter-chart-container">
                <ResponsiveContainer width="100%" height={600} minWidth={500} style={{ marginBottom: "2rem" }}>
                    <ScatterChart
                        margin={{
                            top: 15,
                            right: 20,
                            bottom: 100,
                            left: 20,
                        }}>
                        <CartesianGrid stroke="#3e3e3e" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            ticks={driver1Data.map(d => d.x)}
                            name={xAxisLabel}
                            unit=""
                            minTickGap={10}
                            tickMargin={15}
                            interval={0}
                            domain={[0, driver1Data.length - 1]}
                            label={{ value: xAxisLabel, position: "insideBottom", dy: 100 }}
                            tick={<CustomizedXAxisTick />}
                        />
                        <YAxis
                            type="number"
                            domain={[yAxisMin, yAxisMax]}
                            allowDataOverflow={false}
                            dataKey="y"
                            name={yAxisLabel}
                            unit=""
                            reversed={reversed}
                            tickMargin={10}
                            tickCount={yAxisMax}
                            label={{ value: yAxisLabel, position: "insideLeft", angle: -90 }}
                            tick={<CustomizedYAxisTick />} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <Scatter name="Driver 1" clip="false" data={driver1Data} fill={team1Primary} stroke={"#e0e0e0"} strokeWidth={2} shape={<Dot r={8} />} />
                        <Scatter name="Driver 2" clip="false" data={driver2Data} fill={team2Primary} stroke={"#e0e0e0"} strokeWidth={2} shape={<Dot r={8} />} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default ScatterChartContainer;