import { LineChart, Line } from 'recharts';
import ChartWrapper from './ChartWrapper';
import ChartFrame from './ChartFrame';
import "./Comparison.css"

function LineChartContainer({
    xAxisLabel = "X Axis",
    yAxisLabel = "Y Axis",
    data = [],
    yAxisMin = 0,
    yAxisMax = 100,
    reversed = false,
    tooltipLabel = "Value",
    dataOption,
    entity1 = "None",
    entity2 = "None",
    primary1 = "var(--clr-neutral-400)",
    primary2 = "var(--clr-neutral-400)",
    accent1 = "var(--clr-neutral-400)",
    accent2 = "var(--clr-neutral-400)"
}) {
    const key1 = `t1v${dataOption}`;
    const key2 = `t2v${dataOption}`;
    const key1Wins = data.filter(d => d[key1] > d[key2]).length;
    const key2Wins = data.length - key1Wins;
    const yDataKey = key1Wins >= key2Wins ? key1 : key2;

    return (
        <ChartWrapper
            chartType="line"
            xTickLabels={data.map(d => d.track)}
            tooltipLabel={tooltipLabel}
            toolTipEntity1={entity1}
            toolTipEntity2={entity2}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
        > {({
            XAxisTick,
            YAxisTick,
            ChartTooltip,
            xAxisLabel,
            yAxisLabel,
            margins
        }) =>
            <LineChart data={data} margin={margins}>
                <ChartFrame
                    xType="number"
                    xDataKey="x"
                    xTicks={data.map((d, index) => index + 1)}
                    xName={xAxisLabel}
                    xDomain={[0, data.length - 1]}
                    xAxisTick={<XAxisTick />}
                    xLabelMargin={margins.bottom}
                    yDomain={[yAxisMin, yAxisMax]}
                    yDataKey={yDataKey}
                    yName={yAxisLabel}
                    yTickCount={10}
                    reversed={reversed}
                    yAxisTick={<YAxisTick />}
                    yLabelMargin={-15}
                    chartTooltip={<ChartTooltip />}
                />
                <Line dataKey={`t1v${dataOption}`} stroke={primary1} strokeWidth={4} type='monotone' />
                <Line dataKey={`t2v${dataOption}`} stroke={primary2} strokeWidth={4} type='monotone' />
            </LineChart>
            }
        </ChartWrapper>
    );
}

export default LineChartContainer;