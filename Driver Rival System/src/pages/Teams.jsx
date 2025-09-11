import { useTeamContext } from "../contexts/TeamContext";
import TeamComparison from "../components/Comparison/TeamComparison";
import ComboxBox from "../components/ComboBox/ComboBox";
import TeamCard from "../components/Cards/TeamCard";
import EmptyCard from "../components/Cards/EmptyCard";
import LoadScreen from "../components/LoadScreen/LoadScreen";
import LoadingError from "./LoadingError";

function Teams() {
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

    const handleUpdatedTeam1 = (idx) => {
        // FIX ME: find better solution for getting driver number
        setFirstTeamName(idx);
    };

    const handleUpdatedTeam2 = (idx) => {
        setSecondTeamName(idx);
    };

    return (
        loading ? <LoadScreen /> :
            error ? <LoadingError message={error} />
                :
                <>
                    <div className="driver-container">
                        {teams.size > 0 ? <>
                            <div className="driver-wrapper">
                                <ComboxBox
                                    title="Team Selection"
                                    options={Array.from(teams.keys()).filter(team => team !== secondTeamName).map((team, idx) => (
                                        {
                                            id: idx,
                                            item: team,
                                            value: `${teams.get(team).name}`,
                                        }))}
                                    updaterFunction={handleUpdatedTeam1}
                                    searchable={true}>
                                </ComboxBox>
                                {firstTeamName !== "" ? <TeamCard
                                    name={teams.get(firstTeamName)?.name ?? ""}
                                    location={teams.get(firstTeamName)?.location ?? ""}
                                    country={teams.get(firstTeamName)?.country_code ?? ""}
                                    image={"/team-logos/" + teams.get(firstTeamName)?.image ?? ""}
                                    primaryColor={team1Primary}
                                    accentColor={team1Accent}
                                ></TeamCard> : <EmptyCard></EmptyCard>}
                            </div>

                            <div className="driver-wrapper align-right">
                                <ComboxBox
                                    title="Team Selection"
                                    options={Array.from(teams.keys()).filter(team => team !== firstTeamName).map((team, idx) => (
                                        {
                                            id: idx,
                                            item: team,
                                            value: `${teams.get(team).name}`,
                                        }))}
                                    updaterFunction={handleUpdatedTeam2}
                                    searchable={true}>
                                </ComboxBox>
                                {secondTeamName !== "" ? <TeamCard
                                    name={teams.get(secondTeamName)?.name ?? ""}
                                    location={teams.get(secondTeamName)?.location ?? ""}
                                    country={teams.get(secondTeamName)?.country_code ?? ""}
                                    image={"/team-logos/" + teams.get(secondTeamName)?.image ?? ""}
                                    primaryColor={team2Primary}
                                    accentColor={team2Accent}
                                ></TeamCard> : <EmptyCard></EmptyCard>}
                            </div>
                        </>
                            : <></>}
                    </div>
                    <TeamComparison></TeamComparison>
                </>)
        ;
}

export default Teams;