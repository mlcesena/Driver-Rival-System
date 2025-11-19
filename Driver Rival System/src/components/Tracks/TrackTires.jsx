import CompoundBar from "./CompoundBar";
import TireItem from "./TireItem";

function TrackTires({ activeCompounds = [false, false, false, false, false, false] }) {
    const activeIndices = activeCompounds.reduce((acc, val, idx) => {
        if (Number(val) === 1) acc.push(idx);
        return acc;
    }, []);

    return (
        <div className="tire-wrapper">
            <div className="tire-container">
                {activeCompounds.map((val, idx) => {
                    let fill = "var(--clr-hard-low)";
                    let active = val;
                    const pos = activeIndices.indexOf(idx);

                    if (activeIndices.length !== 0) {
                        if (pos === activeIndices.length - 1)
                            fill = "var(--clr-soft-low)";
                        else if (pos === activeIndices.length - 2)
                            fill = "var(--clr-medium-low)";
                    }
                    else {
                        active = 1;
                    }

                    return (
                        <TireItem title={`C${idx + 1}`} active={active} fill={fill} key={idx} />
                    )
                })}
            </div>
            <CompoundBar />
        </div>

    );
}

export default TrackTires;