import { fetchDriverInfo, fetchSessionKeys, fetchSessionInfo } from "../services/DriverInfo";
import { createContext, useState, useContext, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [driverData, setDriverData] = useState([]);
    // const [sessionKeys, setMeetingKeys] = useState(new Set());
    const [sessionKeys, setSessionKeys] = useState(new Map());
    const [sessionData, setSessionData] = useState([]);
    const [drivers, setDrivers] = useState(new Map());

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
        if (driverData.length > 0) {
            initializeDrivers();
        }
    }, [driverData]);

    useEffect(() => {
        if (sessionData.length > 0) {
            updateDrivers();
        }
    }, [sessionData, driverData]);

    useEffect(() => {
        if (loading && drivers.size > 0) {
            // const temp = Array.from(drivers.keys());
            // for (let i = 0; i < temp.length; i++) {
            //     console.log(temp[i]);

            //     console.log(drivers.get(temp[i]));

            // }
            setLoading(false);
        }
    }, [drivers]);

    const getDriverInfo = async () => {
        try {
            const data = await fetchDriverInfo();
            // const keys = await fetchMeetingKeys();
            const keys = await fetchSessionKeys();
            setDriverData(data);
            setSessionKeys(keys);

            // const sessions = await fetchSessionInfo(keys.values().next().value);
            const sessions = await fetchSessionInfo(Math.min(...Array.from(keys.keys())));
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
                    image: driver.headshot_url !== null ? driver.headshot_url.slice(0, driver.headshot_url.indexOf(".transform")) : "",
                    wins: 0,
                    podiums: 0,
                    top10: 0,
                    points: 0,
                    laps: 0,
                    completedRaceCount: 0,
                    incompleteRaceCount: 0,
                    totalRaceCount: 0,
                    dnf: 0,
                    dns: 0,
                    dsq: 0,
                    poleCount: 0,
                    q1Count: 0,
                    q2Count: 0,
                    q3Count: 0,
                    q1Exits: 0,
                    q2Exits: 0,
                });
            }
            for (let i = 0; i < sessionData.length; i++) {
                if (!sessionKeys.has(sessionData[i].session_key)) {
                    continue;
                }

                const key = sessionData[i].session_key;
                const driverNumber = sessionData[i].driver_number;
                const prevStats = newMap.get(driverNumber) || {};

                if (!newMap.has(driverNumber)) {
                    continue;
                }

                if (sessionKeys.get(key) === "Qualifying") {
                    let pole = 0;
                    let q1 = 0;
                    let q2 = 0;
                    let q3 = 0;
                    let q1Exit = 0;
                    let q2Exit = 0;

                    if (sessionData[i].position > 15) {
                        q1 = 1;
                        q1Exit = 1;
                    }
                    else if (sessionData[i].position > 10) {
                        q2 = 1;
                        q1 = 1;
                        q2Exit = 1;
                    }
                    else if (sessionData[i].position <= 10) {
                        q3 = 1;
                        q2 = 1;
                        q1 = 1;
                        pole = (sessionData[i].position === 1) ? 1 : 0;
                    }

                    newMap.set(driverNumber, {
                        ...prevStats,
                        poleCount: (prevStats.poleCount || 0) + pole,
                        q1Count: (prevStats.q1Count || 0) + q1,
                        q2Count: (prevStats.q2Count || 0) + q2,
                        q3Count: (prevStats.q3Count || 0) + q3,
                        q1Exits: (prevStats.q1Exits || 0) + q1Exit,
                        q2Exits: (prevStats.q2Exits || 0) + q2Exit,
                    });
                }
                else if (sessionKeys.get(key) === "Race") {
                    const podium = ((sessionData[i].position <= 3) && (sessionData[i].position != null)) ? 1 : 0;
                    const win = sessionData[i].position === 1 ? 1 : 0;
                    const points = !sessionData[i].dsq ? sessionData[i].points : 0;
                    const finished = !sessionData[i].dnf && !sessionData[i].dns ? 1 : 0;

                    newMap.set(driverNumber, {
                        ...prevStats,
                        wins: (prevStats.wins || 0) + win,
                        podiums: (prevStats.podiums || 0) + podium,
                        top10: (prevStats.top10 || 0) + (((sessionData[i].position <= 10) && (sessionData[i].position != null)) ? 1 : 0),
                        points: (prevStats.points || 0) + points,
                        completedRaceCount: (prevStats.completedRaceCount || 0) + (finished ? 1 : 0),
                        incompleteRaceCount: (prevStats.incompleteRaceCount || 0) + (finished ? 0 : 1),
                        totalRaceCount: (prevStats.totalRaceCount || 0) + 1,
                        laps: (prevStats.laps || 0) + sessionData[i].number_of_laps,
                        dnf: (prevStats.dnf || 0) + (sessionData[i].dnf ? 1 : 0),
                        dns: (prevStats.dns || 0) + (sessionData[i].dns ? 1 : 0),
                        dsq: (prevStats.dsq || 0) + (sessionData[i].dsq ? 1 : 0),
                    });
                }
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