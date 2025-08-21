import { fetchTeamInfo, fetchTeamRaceResults, fetchTeamSeasonResults, fetchTeamSprintResults } from "../services/TeamInfo";
import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalStateContext } from "./GlobalStateContext";
import { convertTeamColors } from "../services/GlobalServices";
const TeamContext = createContext();

export const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState(new Map());
    const [raceResults, setRaceResults] = useState(new Map());
    const [sprintResults, setSprintResults] = useState(new Map());
    const [seasonResults, setSeasonResults] = useState(new Map());
    const [firstTeamName, setFirstTeamName] = useState("");
    const [secondTeamName, setSecondTeamName] = useState("");
    const [team1Primary, setTeam1Primary] = useState("#808080");
    const [team1Accent, setTeam1Accent] = useState("#808080");
    const [team2Primary, setTeam2Primary] = useState("#808080");
    const [team2Accent, setTeam2Accent] = useState("#808080");

    useEffect(() => {
        getTeamInfo();
    }, []);

    useEffect(() => {
        if (teams.size > 0) {
            const colors = convertTeamColors(teams.get(firstTeamName).name);
            setTeam1Primary(colors[0]);
            setTeam1Accent(colors[1]);
        }
    }, [firstTeamName]);

    useEffect(() => {
        if (teams.size > 0) {
            const colors = convertTeamColors(teams.get(secondTeamName).name);
            setTeam2Primary(colors[0]);
            setTeam2Accent(colors[1]);
        }
    }, [secondTeamName]);

    const getTeamInfo = async () => {
        try {
            const data = await fetchTeamInfo();
            setTeams(data);

            const raceData = await fetchTeamRaceResults();
            setRaceResults(raceData);

            const sprintData = await fetchTeamSprintResults();
            setSprintResults(sprintData);

            const seasonData = await fetchTeamSeasonResults();
            setSeasonResults(seasonData);

        } catch (error) {
            console.log("Failed to get team info", error);
        }
    }

    const value = {
        teams,
        firstTeamName,
        setFirstTeamName,
        secondTeamName,
        setSecondTeamName,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent,
        raceResults,
        sprintResults,
        seasonResults
    };

    return (
        <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
    );
}