import { fetchDriverInfo, fetchMeetingKeys, fetchSessionInfo } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";

const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [driverData, setDriverData] = useState([]);
    const [meetingKeys, setMeetingKeys] = useState(new Set());
    const [sessionData, setSessionData] = useState([]);
    const [drivers, setDrivers] = useState(new Map());

    const [firstDriverNumber, setFirstDriverNumber] = useState(-1);
    const [secondDriverNumber, setSecondDriverNumber] = useState(-1);
    const [team1Primary, setTeam1Primary] = useState("#808080")
    const [team2Primary, setTeam2Primary] = useState("#808080")
    const [team1Accent, setTeam1Accent] = useState("#808080")
    const [team2Accent, setTeam2Accent] = useState("#808080")

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
        if (driverData.length > 0) {
            initializeDrivers();
        }
    }, [driverData]);

    useEffect(() => {
        if (sessionData.length > 0) {
            updateDrivers();
        }
    }, [sessionData, driverData]);

    const getDriverInfo = async () => {
        try {
            const data = await fetchDriverInfo();
            const keys = await fetchMeetingKeys();
            setDriverData(data);
            setMeetingKeys(keys);

            const sessions = await fetchSessionInfo(keys.values().next().value);
            setSessionData(sessions);
        }
        catch (error) {
            console.log("Failed to get driver info", error);
        }
    }

    function initializeDrivers() {
        // const stats = new Map();

        // for (let i = 0; i < driverData.length; i++) {
        //     const driver = driverData[i];

        //     stats.set(driver.driver_number, {
        //         firstName: driver.first_name,
        //         lastName: driver.last_name,
        //         fullName: `${driver.first_name} ${driver.last_name}`,
        //         acronym: driver.name_acronym,
        //         team: driver.team_name,
        //         number: driver.driver_number,
        //         image: driver.headshot_url,
        //         wins: 0,
        //         podiums: 0,
        //         points: 0,
        //         races: 0,
        //         laps: 0,
        //     });
        // }
        // setDrivers(stats);
    }

    function updateDrivers() {
        setDrivers(prevMap => {
            const newMap = new Map(prevMap);
            for (let i = 0; i < driverData.length; i++) {
                const driver = driverData[i];
                newMap.set(driver.driver_number, {
                    firstName: driver.first_name,
                    lastName: driver.last_name,
                    fullName: `${driver.first_name} ${driver.last_name}`,
                    acronym: driver.name_acronym,
                    team: driver.team_name,
                    number: driver.driver_number,
                    image: driver.headshot_url,
                    wins: 0,
                    podiums: 0,
                    points: 0,
                    races: 0,
                    laps: 0,
                });
            }
            for (let i = 0; i < sessionData.length; i++) {
                const driverNumber = sessionData[i].driver_number;
                const prevStats = newMap.get(driverNumber) || {};
                const podium = sessionData[i].position <= 3 && sessionData[i].position != null ? 1 : 0;
                const win = sessionData[i].position === 1 ? 1 : 0;
                const points = !sessionData[i].dsq ? sessionData[i].points : 0;

                if (driverNumber === 16)
                    console.log(sessionData[i]);



                newMap.set(driverNumber, {
                    ...prevStats,
                    wins: (prevStats.wins || 0) + win,
                    podiums: (prevStats.podiums || 0) + podium,
                    points: (prevStats.points || 0) + points,
                    races: (prevStats.races || 0) + 1,
                    laps: (prevStats.laps || 0) + sessionData[i].number_of_laps,
                });
            }
            return newMap;
        });
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
    };

    return (
        <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
    )
};