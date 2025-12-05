import { ScatterChart, Scatter, Dot } from 'recharts';
import ChartWrapper from "./ChartWrapper";
import ChartFrame from './ChartFrame';
import "./Comparison.css"

function ScatterChartContainer({
    xAxisLabel = "X Axis",
    yAxisLabel = "Y Axis",
    data1 = [],
    data2 = [],
    yAxisMin = 0,
    yAxisMax = 100,
    reversed = false,
    tooltipLabel = "Value",
    entity1 = "None",
    entity2 = "None",
    primary1 = "var(--clr-neutral-400)",
    primary2 = "var(--clr-neutral-400)",
    accent1 = "var(--clr-neutral-400)",
    accent2 = "var(--clr-neutral-400)"
}) {
    return (
        <ChartWrapper
            chartType="scatter"
            xTickLabels={data1.map(d => d.track)}
            tooltipLabel={tooltipLabel}
            toolTipEntity1={entity1}
            toolTipEntity2={entity2}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
        >
            {({
                XAxisTick,
                YAxisTick,
                ChartTooltip,
                xAxisLabel,
                yAxisLabel,
                margins
            }) =>
                <ScatterChart margin={margins}>
                    <ChartFrame
                        xTicks={data1.map((d, index) => index)}
                        xName={xAxisLabel}
                        xDomain={[0, data1.length - 1]}
                        xAxisTick={<XAxisTick />}
                        xLabelMargin={margins.bottom}
                        yDomain={[yAxisMin, yAxisMax]}
                        yName={yAxisLabel}
                        yTickCount={yAxisMax}
                        reversed={reversed}
                        yAxisTick={<YAxisTick />}
                        chartTooltip={<ChartTooltip />}
                    />
                    <defs>
                        <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="50%" stopColor={primary2} stopOpacity={1} />
                            <stop offset="50%" stopColor={primary1 === primary2 ? accent2 : primary2} stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Scatter
                        name="Driver 1"
                        clip="false"
                        data={data1}
                        fill={primary1}
                        stroke={"var(--clr-neutral-100)"}
                        strokeWidth={2}
                        line={{ strokeWidth: 5 }}
                        shape={<Dot fill={primary1} r={8} />} />
                    <Scatter
                        name="Driver 2"
                        clip="false"
                        data={data2}
                        fill={primary2}
                        stroke={"var(--clr-neutral-100)"}
                        strokeWidth={2}
                        line={{ strokeWidth: 5 }}
                        shape={<Dot fill={primary1 === primary2 ? "url(#scatterGradient)" : primary2} r={8} />} />
                </ScatterChart>
            }
        </ChartWrapper>
    );
}

export default ScatterChartContainer;