import { useDriverContext } from "../../contexts/DriverContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Comparison.css"
import { useEffect } from "react";

function ScatterChartContainer({ title = "Null", xAxisLabel = "X Axis", yAxisLabel = "Y Axis", driver1Data = [], driver2Data = [], yAxisMin = 0, yAxisMax = 100 }) {
    const { team1Primary, team2Primary } = useDriverContext();
    const trackMap = new Map(driver1Data.map(d => [d.x, d.track]));
    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;

        const trackName = trackMap.get(payload.value) || "";

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="#999" transform="rotate(-90)">
                    {trackName}
                </text>
            </g>
        );
    };

    useEffect(() => {
        console.log(driver1Data.length);

    }, [driver1Data])

    return (
        <div>
            <ResponsiveContainer width="100%" height={600}>
                <ScatterChart
                    margin={{
                        top: 25,
                        right: 20,
                        bottom: 85,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis
                        type="number"
                        dataKey="x"
                        ticks={driver1Data.map(d => d.x)}
                        name={xAxisLabel}
                        unit=""
                        tickMargin={10}
                        interval={0}
                        minTickGap={0}
                        domain={[0, driver1Data.length - 1]}
                        label={{ value: xAxisLabel, position: "insideBottom", dy: 85 }}
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis
                        type="number"
                        domain={[yAxisMin, yAxisMax]}
                        allowDataOverflow
                        dataKey="y"
                        name={yAxisLabel}
                        unit=""
                        tickMargin={10}
                        tickCount={yAxisMax}
                        label={{ value: yAxisLabel, position: "insideLeft", angle: -90 }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Driver 1" clip={false} data={driver1Data} fill={team1Primary} stroke={team1Primary} strokeWidth={8} />
                    <Scatter name="Driver 2" clip={false} data={driver2Data} fill={team2Primary} stroke={team2Primary} strokeWidth={8} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScatterChartContainer;