import { useEffect } from "react";
import "../../css/main.css"
import { CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function ChartFrame({
    xType = "number",
    xDataKey = "x",
    xTicks = [],
    xName = "X Axis",
    xDomain = [],
    xAxisTick,
    xLabelMargin = 0,
    yType = "number",
    yDataKey = "y",
    yDomain = [],
    yName = "Y Axis",
    yTickCount = 0,
    reversed = false,
    yAxisTick,
    yLabelMargin,
    chartTooltip
}) {
    return (
        <>
            <CartesianGrid stroke={"var(--clr-neutral-700)"} strokeDasharray={"3 3"} />
            <XAxis
                type={xType}
                dataKey={xDataKey}
                name={xName}
                unit=""
                domain={xDomain}
                label={{ value: xName, position: "insideBottom", dy: xLabelMargin }}
                ticks={xTicks}
                tick={xAxisTick}
                minTickGap={10}
                tickMargin={15}
                interval={0}
            />
            <YAxis
                type={yType}
                dataKey={yDataKey}
                name={yName}
                unit=""
                domain={yDomain}
                label={{ value: yName, position: "insideLeft", angle: -90, dx: yLabelMargin }}
                allowDataOverflow={false}
                reversed={reversed}
                tick={yAxisTick}
                tickCount={yTickCount}
                tickMargin={10}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3', fill: "var(--clr-neutral-600)", fillOpacity: 0.25 }} content={chartTooltip} />
        </>
    );
}

export default ChartFrame;