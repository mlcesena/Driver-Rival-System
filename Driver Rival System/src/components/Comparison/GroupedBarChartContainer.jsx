import { BarChart, Bar } from 'recharts';
import "./Comparison.css"
import { isDark } from '../../services/GlobalServices';
import ChartWrapper from './ChartWrapper';
import ChartFrame from './ChartFrame';

function GroupedBarChartContainer({
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
            chartType="group-bar"
            data={data}
            xTickLabels={data.map(d => d.track)}
            tooltipLabel={tooltipLabel}
            toolTipEntity1={entity1}
            toolTipEntity2={entity2}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}>
            {({
                // XAxisTick,
                GroupXAxisTick,
                YAxisTick,
                DualChartTooltip,
                xAxisLabel,
                yAxisLabel,
                margins
            }) =>
                <BarChart data={data} margin={margins}>
                    <ChartFrame
                        xType="category"
                        xDataKey="track"
                        xTicks={data.map((d) => d.track)}
                        xName={xAxisLabel}
                        xDomain={[0, data.length]}
                        xAxisTick={<GroupXAxisTick />}
                        xLabelMargin={margins.bottom}
                        yDomain={[yAxisMin, yAxisMax]}
                        yDataKey={`t1d1`}
                        yName={yAxisLabel}
                        yTickCount={10}
                        reversed={reversed}
                        yAxisTick={<YAxisTick />}
                        chartTooltip={<DualChartTooltip />}
                    />
                    <Bar dataKey="t1d1" fill={primary1} stroke={isDark(primary1) ? "var(--clr-neutral-400)" : ""} strokeWidth={isDark(primary1) ? 1 : 0} barSize={20} />
                    <Bar dataKey="t1d2" fill={accent1} stroke={isDark(accent1) ? "var(--clr-neutral-400)" : ""} strokeWidth={isDark(accent1) ? 1 : 0} barSize={20} />
                    <Bar dataKey="t2d1" fill={primary2} stroke={isDark(primary2) ? "var(--clr-neutral-400)" : ""} strokeWidth={isDark(primary2) ? 1 : 0} barSize={20} />
                    <Bar dataKey="t2d2" fill={accent2} stroke={isDark(accent2) ? "var(--clr-neutral-400)" : ""} strokeWidth={isDark(accent2) ? 1 : 0} barSize={20} />
                </BarChart>
            }
        </ChartWrapper>
    );
}

export default GroupedBarChartContainer;