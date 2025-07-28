import { fetchDrivers, fetchRaceResults, fetchQualifyingResults, fetchSprintRaceResults, fetchSprintQualifyingResults } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
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

    function convertTeamColors(teamName) {
        switch (teamName) {
            case "Red Bull Racing":
                // return ["#171A60", "#FA142A"];
                return ["#1B1F4F", "#C12B30"]
            case "McLaren":
                // return ["#FD8003", "#141520"];
                return ["#B5631F", "#1E1E1E"];
            case "Kick Sauber":
                // return ["#04E703", "#000000"];
                return ["#3A6B36", "#121212"];
            case "Racing Bulls":
                // return ["#1534CB", "#F23821"];
                return ["#1B4F72", "#C12B30"];
            case "Alpine":
                // return ["#0577C8", "#EC8BC6"];
                return ["#1B4F72", "#99627A"];
            case "Mercedes":
                // return ["#09F5D2", "#000000"];
                return ["#2BADA0", "#121212"];
            case "Aston Martin":
                // return ["#015A50", "#E1FF39"];
                return ["#004225", "#D1B66A"];
            case "Williams":
                // return ["#1967DA", "#141C21"];
                return ["#1B4F72", "#1E1E1E"];
            case "Ferrari":
                // return ["#FD0101", "#FFED03"];
                return ["#C12B30", "#D1B66A"];
            case "Haas F1 Team":
                // return ["#AFAFAF", "#D5001C"];
                return ["#888888", "#C12B30"];
            default:
                return ["#FFFFFF", "#FFFFFF"];
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
    )
};