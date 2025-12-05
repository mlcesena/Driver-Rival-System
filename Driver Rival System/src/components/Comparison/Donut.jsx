import { useEffect, useState } from "react";

function Donut({ color = "var(--clr-neutral-100)", colorAccent = "var(--clr-neutral-100)", value = 0, total = 0, matching = false }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (!total) {
            setPercentage(0);
        }
        else {
            setPercentage((value / total).toFixed(2))
        }
    }, [value, total]);

    return (
        <div className="donut-container">
            <svg width="130px" height="130px" xmlns="http://www.w3.org/2000/svg">
                <circle className="donut-chart" cx="65" cy="65" r={radius} strokeWidth="1.5rem" fill="none" />
                <circle className="donut-arc" cx="65" cy="65" r={radius} stroke={color} strokeWidth="1.5rem" strokeLinecap="" fill="none" strokeDasharray={`${circumference * percentage} ${circumference}`} transform="rotate(-90 65 65) scale(1, -1) translate(0, -130)" />
                {matching && <circle className="donut-arc" cx="65" cy="65" r={radius} stroke={colorAccent} strokeWidth="0.5rem" strokeLinecap="" fill="none" strokeDasharray={`${circumference * percentage} ${circumference}`} transform="rotate(-90 65 65) scale(1, -1) translate(0, -130)" />}
            </svg>
            <h2>{`${value}/${total}`}</h2>
        </div>
    );
}

export default Donut;