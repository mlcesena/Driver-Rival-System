import { useEffect, useState, useRef } from "react";
import "../../css/main.css"
import "./Track.css"
import TrackInfoItem from "./TrackInfoItem";

function TrackInfoContainer({ data = [] }) {
    // const {trackData} = useTrackContext();
    const [expanded, setExpanded] = useState(true);
    const itemRef = useRef();
    const infoLabels = ["Location:",
        "First Held:",
        "Appearances:",
        "Lap Distance:",
        "Lap Count:",
        "Total Distance:",
        "Elevation:",
        "Corners:",
        "Fastest Lap:",
        "Track Type"]
    const infoIcons = ["location_on",
        "account_balance",
        "sports_score",
        "timer",
        "laps",
        "route",
        "elevation",
        "turn_sharp_right",
        "bolt",
        "stadium"]

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 64 * 16;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        if (windowWidth <= breakpoint && expanded) {
            setExpanded(false);
        }
        else if (windowWidth > breakpoint && !expanded) {
            setExpanded(true)
        }
    }, [windowWidth]);

    useEffect(() => {
        if (expanded) {
            itemRef.current.style.height = "fit-content";
        }
        else {
            itemRef.current.style.height = "200px";
        }

    }, [expanded]);

    return (
        <div className="content-container-large">
            <div className="content-header">
                <h1>About</h1>
            </div>

            <div className="divider"></div>
            <div className="track-item-container" ref={itemRef}>
                {infoLabels.map((label, idx) => (
                    <TrackInfoItem title={label} content={data?.[idx] ?? "null"} icon={infoIcons[idx]} key={idx}></TrackInfoItem>
                ))}
            </div>
            {windowWidth <= breakpoint && <button className="collapsible-btn" onClick={() => setExpanded((e) => !e)}>
                <span className="material-symbols-outlined">
                    {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                </span>
            </button>}
        </div>
    );
}

export default TrackInfoContainer;