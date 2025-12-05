import { BarChart, Bar } from 'recharts';
import { useState } from 'react';
import "./Comparison.css"
import ChartWrapper from './ChartWrapper';
import ChartFrame from './ChartFrame';

function StackedBarChartContainer({
    xAxisLabel = "X Axis",
    yAxisLabel = "Y Axis",
    data = [],
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
            chartType="dual-bar"
            xTickLabels={data.map(d => d.track)}
            tooltipLabel={tooltipLabel}
            toolTipEntity1={entity1}
            toolTipEntity2={entity2}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}>
            {({
                XAxisTick,
                YAxisTick,
                ChartTooltip,
                xAxisLabel,
                yAxisLabel,
                margins
            }) =>
                <BarChart data={data} margin={margins}>
                    <ChartFrame
                        xType="number"
                        xDataKey="x"
                        xTicks={data.map((d, index) => index + 1)}
                        xName={xAxisLabel}
                        xDomain={[0, data.length - 1]}
                        xAxisTick={<XAxisTick />}
                        xLabelMargin={margins.bottom}
                        yDomain={[yAxisMin, yAxisMax]}
                        yDataKey={`ps1`}
                        yName={yAxisLabel}
                        yTickCount={10}
                        reversed={reversed}
                        yAxisTick={<YAxisTick />}
                        chartTooltip={<ChartTooltip />}
                    />
                    <Bar dataKey="ps1" fill={primary1} />
                    <Bar dataKey="ps2" fill={primary2} />
                </BarChart>
            }
        </ChartWrapper>
    );
}

export default StackedBarChartContainer;