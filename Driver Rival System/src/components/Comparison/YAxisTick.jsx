import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Dot, ResponsiveContainer, ZAxis } from 'recharts';
function YAxisTick({ props }) {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} textAnchor="end" fill="#aaaaaa">
                {payload.value}
            </text>
        </g>
    );
};

export default YAxisTick;