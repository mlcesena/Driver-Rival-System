import { fetchDrivers, fetchRaceResults, fetchQualifyingResults, fetchSprintRaceResults, fetchSprintQualifyingResults, fetchDriverSeasonResults } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
import { convertTeamColors } from "../services/GlobalServices";
const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState(new Map());
    const [raceResults, setRaceResults] = useState(new Map());
    const [qualiResults, setQualiResults] = useState(new Map());
    const [sprintRaceResults, setSprintRaceResults] = useState(new Map());
    const [sprintQualiResults, setSprintQualiResults] = useState(new Map());
    const [seasonResults, setSeasonResults] = useState(new Map());

    const [firstDriverNumber, setFirstDriverNumber] = useState(-1);
    const [secondDriverNumber, setSecondDriverNumber] = useState(-1);
    const [team1Primary, setTeam1Primary] = useState("var(--clr-neutral-400)");
    const [team2Primary, setTeam2Primary] = useState("var(--clr-neutral-400)");
    const [team1Accent, setTeam1Accent] = useState("var(--clr-neutral-400)");
    const [team2Accent, setTeam2Accent] = useState("var(--clr-neutral-400)");

    // const { loading, setLoading } = useGlobalStateContext();

    useEffect(() => {
        getDriverInfo();
    }, []);

    useEffect(() => {
        if (drivers.size > 0 && firstDriverNumber > -1) {
            const colors = convertTeamColors(drivers.get(firstDriverNumber).team);
            setTeam1Primary(colors[0]);
            setTeam1Accent(colors[1]);
        }
        else {
            setTeam1Primary("var(--clr-neutral-400)");
            setTeam1Accent("var(--clr-neutral-400)");
        }

    }, [firstDriverNumber]);

    useEffect(() => {
        if (drivers.size > 0 && secondDriverNumber > -1) {
            const colors = convertTeamColors(drivers.get(secondDriverNumber).team);
            setTeam2Primary(colors[0]);
            setTeam2Accent(colors[1]);
        }
        else {
            setTeam1Primary("var(--clr-neutral-400)");
            setTeam1Accent("var(--clr-neutral-400)");
        }
    }, [secondDriverNumber]);

    useEffect(() => {
        if (loading && drivers.size > 0 && raceResults.size > 0 && qualiResults.size > 0 && sprintRaceResults.size > 0 && sprintQualiResults.size > 0 && seasonResults.size > 0) {
            setLoading(false);
            // setError(null);
        }
    }, [drivers, raceResults, qualiResults, sprintRaceResults, sprintQualiResults, seasonResults]);

    const getDriverInfo = async () => {
        try {
            setLoading(true);

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

            const seasonData = await fetchDriverSeasonResults();
            setSeasonResults(seasonData);
        }
        catch (error) {
            // console.log("Failed to get driver info", error);
            setError("Failed to load driver info.");
            setLoading(false);
        }
    }

    const value = {
        loading,
        error,
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
        sprintQualiResults,
        seasonResults
    };

    return (
        <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
    );
};