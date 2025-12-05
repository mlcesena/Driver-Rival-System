import { useTeamContext } from "../contexts/TeamContext";
import { useState } from "react";
import TeamComparison from "../components/Comparison/TeamComparison";
import CardControls from "../components/Cards/CardControls";
import TeamCard from "../components/Cards/TeamCard";
import EmptyCard from "../components/Cards/EmptyCard";
import LoadScreen from "../components/LoadScreen/LoadScreen";
import LoadingError from "./LoadingError";

function Teams() {
    const [cardReverse1, setCardReverse1] = useState(false);
    const [cardReverse2, setCardReverse2] = useState(false);
    const {
        loading,
        error,
        teams,
        firstTeamName,
        secondTeamName,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent,
        setFirstTeamName,
        setSecondTeamName } = useTeamContext();

    const handleUpdatedTeam1 = (id, value, text) => {
        if (teams.has(text))
            setFirstTeamName(text);
    };

    const handleUpdatedTeam2 = (id, value, text) => {
        if (teams.has(text))
            setSecondTeamName(text);
    };

    let team1 = teams.get(firstTeamName);
    let team2 = teams.get(secondTeamName);

    return (
        loading ? <LoadScreen /> :
            error ? <LoadingError message={error} />
                :
                <>
                    <div className="driver-container">
                        {teams.size > 0 ? <>
                            <div className="driver-wrapper">
                                <CardControls
                                    title="Team Selection"
                                    options={Array.from(teams.keys()).map((team, idx) => (
                                        {
                                            id: idx,
                                            value: idx,
                                            text: `${teams.get(team).team_name}`,
                                        }))}
                                    invalidOptions={new Set([secondTeamName])}
                                    onChanged={handleUpdatedTeam1}
                                    onReverseChanged={(val) => setCardReverse1(val)}
                                />
                                {firstTeamName !== "" ? <TeamCard
                                    name={team1?.team_name ?? ""}
                                    location={team1?.location ?? ""}
                                    country={team1?.country_code ?? ""}
                                    image={"/team-logos/" + team1?.image ?? ""}
                                    primaryColor={team1Primary}
                                    accentColor={team1Accent}
                                    teamData={[team1?.founding_year, team1?.active_year_count, team1?.constructors_count, team1?.team_principal, team1?.ceo]}
                                    reverse={cardReverse1}
                                ></TeamCard> : <EmptyCard text="Select a team" />}
                            </div>

                            <div className="driver-wrapper">
                                <CardControls
                                    title="Team Selection"
                                    options={Array.from(teams.keys()).map((team, idx) => (
                                        {
                                            id: idx,
                                            value: idx,
                                            text: `${teams.get(team).team_name}`,
                                        }))}
                                    invalidOptions={new Set([firstTeamName])}
                                    onChanged={handleUpdatedTeam2}
                                    onReverseChanged={(val) => setCardReverse2(val)}
                                    layout="right"
                                />
                                {secondTeamName !== "" ? <TeamCard
                                    name={team2?.team_name ?? ""}
                                    location={team2?.location ?? ""}
                                    country={team2?.country_code ?? ""}
                                    image={"/team-logos/" + team2?.image ?? ""}
                                    primaryColor={team2Primary}
                                    accentColor={team2Accent}
                                    teamData={[team2?.founding_year, team2?.active_year_count, team2?.constructors_count, team2?.team_principal, team2?.ceo]}
                                    reverse={cardReverse2}
                                ></TeamCard> : <EmptyCard text="Select a team" />}
                            </div>
                        </>
                            : <></>}
                    </div>
                    <TeamComparison></TeamComparison>
                </>
    );
}

export default Teams;