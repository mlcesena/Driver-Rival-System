import "./Comparison.css"

function DualToolTip({ payload, active, label = "Value" }) {
    if (active) {
        return (
            <div className="scatter-tooltip">
                <h1>{/*trackMap.get(payload[0].value)*/}</h1>
                <div className="divider"></div>
                <h2>{"No Driver"}</h2>
                <p>{`${label}: ${payload[1]?.value ?? "None"}`}</p>

                <h2>{"No Driver"}</h2>
                <p>{`${label}: ${payload[3]?.value ?? "None"}`}</p>
            </div>
        );
    }

    return null;
}

export default DualToolTip;