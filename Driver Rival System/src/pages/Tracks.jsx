import { useEffect, useState } from "react";
import { convertCountryCode } from "../services/GlobalServices"
import TrackInfoContainer from "../components/Tracks/TrackInfoContainer";
import TrackNav from "../components/Tracks/TrackNav";
import TrackTires from "../components/Tracks/TrackTires";
import { useTrackContext } from "../contexts/TrackContext";

function Tracks() {
    const { trackData } = useTrackContext();
    const [activeTrack, setActiveTrack] = useState("");

    useEffect(() => {

        if (trackData.keys().next().value != undefined) {
            const track = trackData.get(trackData.keys().next().value);
            setActiveTrack(track.circuit_name);
        }

    }, [trackData]);

    function handleTrackChange(track) {

        if (track !== "" && track != undefined) {
            setActiveTrack(track);
        }
    }

    const data = trackData.has(activeTrack) ? [
        trackData.get(activeTrack)?.location,
        trackData.get(activeTrack).init_year,
        trackData.get(activeTrack).latest_year,
        `${trackData.get(activeTrack).lap_distance_mi} mi / ${trackData.get(activeTrack).lap_distance_km} km`,
        trackData.get(activeTrack).lap_count,
        `${trackData.get(activeTrack).race_distance_mi} mi / ${trackData.get(activeTrack).race_distance_km} km`,
        `${trackData.get(activeTrack).elevation_imperial} ft / ${trackData.get(activeTrack).elevation_meteric} m`,
        trackData.get(activeTrack).corners,
        `${trackData.get(activeTrack).fastest_lap_time} s (${trackData.get(activeTrack).fastest_lap_year}) ${trackData.get(activeTrack).fastest_lap_holder}`,
        trackData.get(activeTrack).track_type,
    ] : [];

    return (
        <div className="content-columns">
            <div>
                <TrackNav options={Array.from(trackData.keys())} updaterFunction={handleTrackChange}></TrackNav>
            </div>
            <div style={{ position: "relative", width: "fit-content" }}>
                <span className={`fi fis fi-${trackData.has(activeTrack) ? convertCountryCode(trackData.get(activeTrack).country_code) : ""} track-flag`} style={{ zIndex: 50 }}></span>
                <img src={`${trackData.has(activeTrack) ? ("/tracks/" + trackData.get(activeTrack).image) : ""} `} className="track-img"></img>
                <TrackTires></TrackTires>
                <TrackInfoContainer data={data}></TrackInfoContainer>
            </div>
        </div>
    );
}

export default Tracks;

// url("https://media.formula1.com/image/upload/c_lfill,w_3392/v1740000000/common/f1/2025/track/2025trackmonzablackoutline.svg");