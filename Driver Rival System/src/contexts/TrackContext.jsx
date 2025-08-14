import { fetchTrackInfo } from "../services/TrackInfo";
import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
const TrackContext = createContext();

export const useTrackContext = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
    const [trackData, setTrackData] = useState(new Map());
    useEffect(() => {
        getTrackInfo();
    }, []);


    const getTrackInfo = async () => {
        try {
            const data = await fetchTrackInfo();
            setTrackData(data);

        } catch (error) {
            console.log("Failed to get track info", error);
        }
    }

    const value = {
        trackData,
    };

    return (
        <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
    );
}