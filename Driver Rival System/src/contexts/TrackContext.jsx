import { fetchTrackInfo } from "../services/TrackInfo";
import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
const TrackContext = createContext();

export const useTrackContext = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trackData, setTrackData] = useState(new Map());
    useEffect(() => {
        getTrackInfo();
    }, []);

    useEffect(() => {
        if (loading && trackData.size > 0) {
            setLoading(false);
        }
    }, [trackData])

    const getTrackInfo = async () => {
        try {
            setLoading(true);
            const data = await fetchTrackInfo();
            setTrackData(data);

        } catch (error) {
            // console.log("Failed to get track info", error);
            setError("Failed to load track info.");
            setLoading(false);
        }
    }

    const value = {
        loading,
        error,
        trackData,
    };

    return (
        <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
    );
}


