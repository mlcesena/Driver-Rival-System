import { fetchDrivers, fetchRaceResults, fetchQualifyingResults, fetchSprintRaceResults, fetchSprintQualifyingResults } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
import { convertTeamColors } from "../services/GlobalServices";
const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [drivers, setDrivers] = useState(new Map());
    const [raceResults, setRaceResults] = useState(new Map());
    const [qualiResults, setQualiResults] = useState(new Map());
    const [sprintRaceResults, setSprintRaceResults] = useState(new Map());
    const [sprintQualiResults, setSprintQualiResults] = useState(new Map());

    const [firstDriverNumber, setFirstDriverNumber] = useState(-1);
    const [secondDriverNumber, setSecondDriverNumber] = useState(-1);
    const [team1Primary, setTeam1Primary] = useState("#808080");
    const [team2Primary, setTeam2Primary] = useState("#808080");
    const [team1Accent, setTeam1Accent] = useState("#808080");
    const [team2Accent, setTeam2Accent] = useState("#808080");

    const { loading, setLoading } = useGlobalStateContext();

    useEffect(() => {
        getDriverInfo();
    }, []);

    useEffect(() => {
        if (drivers.size > 0) {
            const colors = convertTeamColors(drivers.get(firstDriverNumber).team);
            setTeam1Primary(colors[0]);
            setTeam1Accent(colors[1]);
        }
    }, [firstDriverNumber]);

    useEffect(() => {
        if (drivers.size > 0) {
            const colors = convertTeamColors(drivers.get(secondDriverNumber).team);
            setTeam2Primary(colors[0]);
            setTeam2Accent(colors[1]);
        }
    }, [secondDriverNumber]);

    useEffect(() => {
        if (loading && drivers.size > 0 && raceResults.size > 0 && qualiResults.size > 0) {
            setLoading(false);
        }
    }, [drivers, raceResults, qualiResults]);

    const getDriverInfo = async () => {
        try {
            const data = await fetchDrivers();
            setDrivers(data);

            const raceData = await fetchRaceResults();
            setRaceResults(raceData);

            const qualiData = await fetchQualifyingResults();
            setQualiResults(qualiData);

            const sprintRaceData = await fetchSprintRaceResults();
            setSprintRaceResults(sprintRaceData);

            const sprintQualiData = await fetchSprintQualifyingResults();
            setSprintQualiResults(sprintQualiData);
        }
        catch (error) {
            console.log("Failed to get driver info", error);
        }
    }

    const value = {
        drivers,
        setDrivers,
        firstDriverNumber,
        setFirstDriverNumber,
        secondDriverNumber,
        setSecondDriverNumber,
        team1Primary,
        setTeam1Primary,
        team2Primary,
        setTeam2Primary,
        team1Accent,
        setTeam1Accent,
        team2Accent,
        setTeam2Accent,
        raceResults,
        qualiResults,
        sprintRaceResults,
        sprintQualiResults
    };

    return (
        <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
    );
};