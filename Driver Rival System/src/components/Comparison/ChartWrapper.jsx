import { ResponsiveContainer } from 'recharts';
import "./Comparison.css"

function ChartWrapper({
    chartType = "",
    xTickLabels = [],
    data = [],
    tooltipLabel = "Value",
    toolTipEntity1 = "None",
    toolTipEntity2 = "None",
    xAxisLabel,
    yAxisLabel,
    children,
}) {
    const margins = {
        top: 15,
        right: 20,
        bottom: 150,
        left: 20,
    }

    const XAxisTick = (props) => {
        const { x, y, payload } = props;
        const xTickLabel = xTickLabels[payload.value - 1];

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="var(--clr-neutral-300)" transform="rotate(-55)">
                    {xTickLabel}
                </text>
            </g>
        );
    };

    const GroupXAxisTick = (props) => {
        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="var(--clr-neutral-300)" transform="rotate(-55)">
                    {payload.value}
                </text>
            </g>
        );
    };

    const YAxisTick = (props) => {
        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="end" fill="var(--clr-neutral-300)">
                    {payload.value}
                </text>
            </g>
        );
    };

    function ChartTooltip({ payload, active }) {
        if (active) {
            let title = "None";
            let val1 = "None";
            let val2 = "None";
            if (chartType === "line") {
                title = payload[0].payload.track;
                val1 = payload[1]?.value ?? "None";
                val2 = payload[0]?.value ?? "None";
            }
            else if (chartType === "scatter") {
                const idx = payload[0]?.value - 1 ?? -1;
                title = xTickLabels[idx] ?? "None";
                val1 = payload[1]?.value ?? "None"
                val2 = payload[3]?.value ?? "None";
            }
            else if (chartType === "dual-bar") {
                title = payload[0].payload?.track ?? "None";
                val1 = payload[1]?.value ?? "0s"
                val2 = payload[3]?.value ?? "0s";
            }

            return (
                <div className="chart-tooltip">
                    <h1>{title}</h1>
                    <div className="divider"></div>
                    <h2>{toolTipEntity1}</h2>
                    <p>{`${tooltipLabel}: ${val1}`}</p>

                    <h2>{toolTipEntity2}</h2>
                    <p>{`${tooltipLabel}: ${val2}`}</p>
                </div>
            );
        }
        return null;
    }

    function DualChartTooltip({ payload, active }) {
        if (active) {
            let title = "None";
            let itemName1 = "None";
            let itemName2 = "None";
            let itemName3 = "None";
            let itemName4 = "None";
            let val1 = "None";
            let val2 = "None";
            let val3 = "None";
            let val4 = "None";

            if (chartType === "group-bar") {
                // console.log(payload[0]);

                title = payload[0].payload.track;
                itemName1 = payload[0]?.payload.t1d1n ?? "None";
                itemName2 = payload[0]?.payload.t1d2n ?? "None";
                itemName3 = payload[0]?.payload.t2d1n ?? "None";
                itemName4 = payload[0]?.payload.t2d2n ?? "None";
                val1 = payload[0]?.payload.t1d1 ?? "None";
                val2 = payload[0]?.payload.t1d2 ?? "None";
                val3 = payload[0]?.payload.t2d1 ?? "None";
                val4 = payload[0]?.payload.t2d2 ?? "None";
            }

            return (
                <div className="chart-tooltip">
                    <h1>{title}</h1>
                    <div className="divider"></div>
                    <h2>{toolTipEntity1}</h2>
                    <p>{`${itemName1}: ${val1}`}</p>
                    <p>{`${itemName2}: ${val2}`}</p>

                    <h2>{toolTipEntity2}</h2>
                    <p>{`${itemName3}: ${val3}`}</p>
                    <p>{`${itemName4}: ${val4}`}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="chart-container">
            <ResponsiveContainer width={"100%"} height={650} minWidth={data.length > 10 ? 800 : 600} style={{ marginBottom: "2rem" }}>
                {children({
                    XAxisTick,
                    GroupXAxisTick,
                    YAxisTick,
                    ChartTooltip,
                    DualChartTooltip,
                    xAxisLabel,
                    yAxisLabel,
                    margins,
                })}
            </ResponsiveContainer>
        </div>
    );
}

export default ChartWrapper;