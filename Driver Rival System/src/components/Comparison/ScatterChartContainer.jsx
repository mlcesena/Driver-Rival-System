import { useDriverContext } from "../../contexts/DriverContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Dot, ResponsiveContainer, ZAxis } from 'recharts';
import "./Comparison.css"

function ScatterChartContainer({ title = "Null", xAxisLabel = "X Axis", yAxisLabel = "Y Axis", driver1Data = [], driver2Data = [], yAxisMin = 0, yAxisMax = 100, reversed = false, tooltipLabel = "Value" }) {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary, team2Accent } = useDriverContext();
    const trackMap = new Map(driver1Data.map(d => [d.x, d.track]));
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
            <div className="scatter-chart-container">
                <ResponsiveContainer width="100%" height={600} minWidth={450} style={{ marginBottom: "2rem" }}>
                    <ScatterChart
                        margin={{
                            top: 15,
                            right: 20,
                            bottom: 100,
                            left: 20,
                        }}>
                        <CartesianGrid stroke="#3e3e3e" strokeDasharray={"3 3"} />
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
                        <defs>
                            <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="50%" stopColor={team2Primary} stopOpacity={1} />
                                <stop offset="50%" stopColor={team1Primary === team2Primary ? team2Accent : team2Primary} stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <Scatter
                            name="Driver 1"
                            clip="false"
                            data={driver1Data}
                            fill={team1Primary}
                            stroke={"#e0e0e0"}
                            strokeWidth={2}
                            line={{ strokeWidth: 5 }}
                            shape={<Dot r={8} />} />
                        <Scatter
                            name="Driver 2"
                            clip="false"
                            data={driver2Data}
                            fill={team2Primary}
                            stroke={"#e0e0e0"}
                            strokeWidth={2}
                            line={{ strokeWidth: 5 }}
                            shape={<Dot fill="url(#scatterGradient)" r={8} />} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default ScatterChartContainer;