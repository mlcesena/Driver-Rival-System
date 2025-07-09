import { fetchDriverInfo } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";

const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [drivers, setDrivers] = useState([]);

    const [firstDriverIdx, setFirstDriverIdx] = useState(-1);
    const [secondDriverIdx, setSecondDriverIdx] = useState(-1);
    const [team1Primary, setTeam1Primary] = useState("#808080")
    const [team2Primary, setTeam2Primary] = useState("#808080")
    const [team1Accent, setTeam1Accent] = useState("#808080")
    const [team2Accent, setTeam2Accent] = useState("#808080")

    useEffect(() => {
        getDriverInfo()
    }, [])

    useEffect(() => {
        if (drivers.length > 0) {
            const colors = convertTeamColors(drivers[firstDriverIdx].team_name);
            setTeam1Primary(colors[0]);
            setTeam1Accent(colors[1]);
        }
    }, [firstDriverIdx]);

    useEffect(() => {
        if (drivers.length > 0) {
            const colors = convertTeamColors(drivers[secondDriverIdx].team_name);
            setTeam2Primary(colors[0]);
            setTeam2Accent(colors[1]);
        }
    }, [secondDriverIdx]);

    const getDriverInfo = async () => {
        try {
            const data = await fetchDriverInfo();

            // for (let i = 0; i < data.length; i++) {
            //     console.log(data[i].first_name + " " + data[i].last_name);
            // }

            setDrivers(data);
        }
        catch (error) {
            console.log("Failed to get driver info", error);
        }
    }

    function convertTeamColors(teamName) {
        switch (teamName) {
            case "Red Bull Racing":
                return ["#171A60", "#FA142A"];
            case "McLaren":
                return ["#FD8003", "#141520"];
            case "Kick Sauber":
                return ["#04E703", "#000000"];
            case "Racing Bulls":
                return ["#1534CB", "#F23821"];
            case "Alpine":
                return ["#0577C8", "#EC8BC6"];
            case "Mercedes":
                return ["#09F5D2", "#000000"];
            case "Aston Martin":
                return ["#015A50", "#E1FF39"];
            case "Williams":
                return ["#1967DA", "#141C21"];
            case "Ferrari":
                return ["#FD0101", "#FFED03"];
            case "Haas F1 Team":
                return ["#AFAFAF", "#D5001C"];
            default:
                return ["#FFFFFF", "#FFFFFF"];
        }
    }

    const value = {
        drivers,
        setDrivers,
        firstDriverIdx,
        setFirstDriverIdx,
        secondDriverIdx,
        setSecondDriverIdx,
        team1Primary,
        setTeam1Primary,
        team2Primary,
        setTeam2Primary,
        team1Accent,
        setTeam1Accent,
        team2Accent,
        setTeam2Accent
    };

    return (
        <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
    )
};