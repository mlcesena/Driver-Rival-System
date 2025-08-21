import { useState } from "react";
import { useTeamContext } from "../../contexts/TeamContext";
import ComparisonContainer from "./ComparisonContainer";
import DualBarChartContainer from "./DualBarChartContainer";
import ComparisonBarChart from "./ComparisonBarChart";
import GroupedBarChartContainer from "./GroupedBarChartContainer";
import LineChartContainer from "./LineChartContainer";
import Disclaimer from "../Disclaimer";

function TeamComparison() {
    const [raceOption, setRaceOption] = useState(1);
    const [sprintOption, setSprintOption] = useState(1);
    const [seasonOption, setSeasonOption] = useState(1);
    const { teams,
        raceResults,
        sprintResults,
        seasonResults,
        firstTeamName,
        secondTeamName,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent } = useTeamContext();
    const seasonData = [];
    const highlightMap = new Map([
        ["Wins", [
            firstTeamName !== "" ?
                ((teams.get(firstTeamName)?.race_wins ?? 0) + (teams.get(firstTeamName)?.sprint_wins ?? 0))
                : 0,
            secondTeamName !== "" ?
                ((teams.get(secondTeamName)?.race_wins ?? 0) + (teams.get(secondTeamName)?.sprint_wins ?? 0))
                : 0
        ]],
        ["Podiums", [
            firstTeamName !== "" ?
                ((teams.get(firstTeamName)?.race_podiums ?? 0) + (teams.get(firstTeamName)?.sprint_podiums ?? 0))
                : 0,
            secondTeamName !== "" ?
                ((teams.get(secondTeamName)?.race_podiums ?? 0) + (teams.get(secondTeamName)?.sprint_podiums ?? 0))
                : 0
        ]],
        ["Total Points", [
            firstTeamName !== "" ?
                ((teams.get(firstTeamName)?.race_points ?? 0) + (teams.get(firstTeamName)?.sprint_points ?? 0))
                : 0,
            secondTeamName !== "" ?
                ((teams.get(secondTeamName)?.race_points ?? 0) + (teams.get(secondTeamName)?.sprint_points ?? 0))
                : 0
        ]]
    ])

    function processResults(results, isSprint = false) {
        const pointData = [];
        const positionData = [];
        const pitData = []
        let i = 1;

        for (const [key, value] of results) {
            let t1D1Points = "None", t1D2Points = "None", t2D1Points = "None", t2D2Points = "None";
            let t1D1Pos = "Did Not Race", t1D2Pos = "Did Not Race", t2D1Pos = "Did Not Race", t2D2Pos = "Did Not Race";
            let t1d1Name = null, t1d2Name = null, t2d1Name = null, t2d2Name = null;
            let ps1, ps2;

            if (firstTeamName !== "" && value.has(firstTeamName)) {
                const team1 = value.get(firstTeamName);
                t1D1Points = team1.driver_1_points;
                t1D1Pos = team1.driver_1_position;
                t1d1Name = team1.driver_1_name;
                t1D2Points = team1.driver_2_points;
                t1D2Pos = team1.driver_2_position;
                t1d2Name = team1.driver_2_name;
                ps1 = team1.avg_pit_stop;
            }

            if (secondTeamName !== "" && value.has(secondTeamName)) {
                const team2 = value.get(secondTeamName);
                t2D1Points = team2.driver_1_points;
                t2D1Pos = team2.driver_1_position;
                t2d1Name = team2.driver_1_name;
                t2D2Points = team2.driver_2_points;
                t2D2Pos = team2.driver_2_position;
                t2d2Name = team2.driver_2_name;
                ps2 = team2.avg_pit_stop;
            }

            if (!isSprint) {
                pitData.push({
                    track: key, x: i,
                    ps1: ps1,
                    ps2: ps2,
                });
            }

            pointData.push({
                track: key, x: i,
                t1d1: t1D1Points,
                t1d1n: t1d1Name,
                t1d2: t1D2Points,
                t1d2n: t1d2Name,
                t2d1: t2D1Points,
                t2d1n: t2d1Name,
                t2d2: t2D2Points,
                t2d2n: t2d2Name,
            })

            positionData.push({
                track: key, x: i,
                t1d1: t1D1Pos,
                t1d1n: t1d1Name,
                t1d2: t1D2Pos,
                t1d2n: t1d2Name,
                t2d1: t2D1Pos,
                t2d1n: t2d1Name,
                t2d2: t2D2Pos,
                t2d2n: t2d2Name
            })

            i++;
        }

        return { pointData, positionData, pitData }
    }

    const { pointData: racePointData, positionData: racePositionData, pitData: racePitData } =
        processResults(raceResults);

    const { pointData: sprintPointData, positionData: sprintPositionData } =
        processResults(sprintResults, true);

    for (const [key, value] of seasonResults) {
        let t1Points = "None", t2Points = "None";
        let t1Pos = "Did Not Race", t2Pos = "Did Not Race";
        let t1Name = null, t2Name = null;
        let i = 1;

        if (firstTeamName !== "" && value.has(firstTeamName)) {
            const team1 = value.get(firstTeamName);
            t1Points = team1.team_points;
            t1Pos = team1.team_position;
            t1Name = team1.team_name;
            i = team1.session_num;
        }

        if (secondTeamName !== "" && value.has(secondTeamName)) {
            const team2 = value.get(secondTeamName);
            t2Points = team2.team_points;
            t2Pos = team2.team_position;
            t2Name = team2.team_name;
        }

        seasonData.push({
            track: key, x: i,
            t1v1: t1Points,
            t1v2: t1Pos,
            t1n: t1Name,
            t2v1: t2Points,
            t2v2: t2Pos,
            t2n: t2Name
        })
    }

    return (
        <>
            <ComparisonContainer
                title="Highlights"
                containerType="team"
                controlType="combobox"
                childComponent={
                    <ComparisonBarChart
                        data={highlightMap}
                        team1Primary={team1Primary}
                        team2Primary={team2Primary}
                        team1Accent={team1Accent}
                        team2Accent={team2Accent} />}
                description="Highlights include both race and sprint results" >
            </ComparisonContainer>
            <ComparisonContainer
                title="Pit Stops"
                containerType="team"
                childComponent={
                    <DualBarChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={"Duration"}
                        teamData={racePitData}
                        yAxisMin={0}
                        yAxisMax={10}
                        reversed={false}
                        tooltipLabel={"Time"} />}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Race Results"
                forceSplit={true}
                containerType="team"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setRaceOption(option) } }}
                childComponent={
                    <GroupedBarChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={raceOption === 1 ? "Points" : "Position"}
                        teamData={raceOption === 1 ? racePointData : racePositionData}
                        yAxisMin={0}
                        yAxisMax={raceOption === 1 ? 25 : 20}
                        reversed={raceOption === 1 ? false : true}
                        tooltipLabel={raceOption === 1 ? "Points" : "Position"} />}>

            </ComparisonContainer>
            <ComparisonContainer
                title="Sprint Results"
                forceSplit={true}
                containerType="team"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setSprintOption(option) } }}
                childComponent={
                    <>
                        <Disclaimer title="Sprint Races" description="F1 sprint races are shorter, standalone races, about one-third the distance of a Grand Prix. While Sprint results contribute to driver and constructor (team) standings, they are separate from the main Grand Prix qualifying and race."></Disclaimer>
                        <GroupedBarChartContainer
                            xAxisLabel="Circuit"
                            yAxisLabel={sprintOption === 1 ? "Points" : "Position"}
                            teamData={sprintOption === 1 ? sprintPointData : sprintPositionData}
                            yAxisMin={0}
                            yAxisMax={sprintOption === 1 ? 25 : 20}
                            reversed={sprintOption === 1 ? false : true}
                            tooltipLabel={sprintOption === 1 ? "Points" : "Position"} />
                    </>}>

            </ComparisonContainer>
            <ComparisonContainer
                title="Season Performance"
                containerType="team"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setSeasonOption(option) } }}
                childComponent={
                    <LineChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={seasonOption === 1 ? "Points" : "Position"}
                        teamData={seasonData}
                        yAxisMin={seasonOption === 1 ? 0 : 1}
                        yAxisMax={seasonOption === 1 ? null : 10}
                        dataOption={seasonOption}
                        reversed={seasonOption === 1 ? false : true}
                        tooltipLabel={seasonOption === 1 ? "Points" : "Position"}
                    />}>

            </ComparisonContainer>
        </>
    );
}

export default TeamComparison;