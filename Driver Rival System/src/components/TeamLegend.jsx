import { useTeamContext } from "../contexts/TeamContext";
import "./Comparison/Comparison.css"
function TeamLegend({ forceSplit = false }) {
    const { teams, firstTeamName, secondTeamName, team1Primary, team1Accent, team2Primary, team2Accent } = useTeamContext();

    return (
        <div className='comparison-names'>
            <div>
                <span className={`color-marker ${(forceSplit) ? "divided" : ""} `} style={{ backgroundColor: team1Primary, "--mark-clr-1": team1Primary, "--mark-clr-2": team1Accent }}></span>
                <h2 className='driver-acronym' style={{ margin: 0 }}>{teams.size > 0 && firstTeamName !== "" ? teams.get(firstTeamName).team_name : "---"}</h2>
            </div>
            <div style={{ marginLeft: "auto" }}>
                <h2 className='driver-acronym' style={{ marginBottom: 0 }}>{teams.size > 0 && secondTeamName !== "" ? teams.get(secondTeamName).team_name : "---"}</h2>
                <span className={`color-marker ${((team1Primary === team2Primary) || forceSplit) ? "divided" : ""} `}
                    style={{ backgroundColor: team2Primary, "--mark-clr-1": team2Primary, "--mark-clr-2": team2Accent }}
                ></span>
            </div>
        </div>
    );
}

export default TeamLegend;