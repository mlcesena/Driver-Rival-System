import { useState } from "react";
import { useTeamContext } from "../../contexts/TeamContext";
import ComparisonContainer from "./ComparisonContainer";
import DualBarChartContainer from "./DualBarChartContainer";
import ComparisonBarChart from "./ComparisonBarChart";
import GroupedBarChartContainer from "./GroupedBarChartContainer";
import LineChartContainer from "./LineChartContainer";

function TeamComparison() {
    const [raceOption, setRaceOption] = useState(1);
    const [sprintOption, setSprintOption] = useState(1);
    const { teams,
        raceResults,
        sprintResults,
        firstTeamName,
        secondTeamName,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent } = useTeamContext();
    const pitData = [];
    const racePointData = [];
    const racePositionData = [];
    const sprintPointData = [];
    const sprintPositionData = [];
    let i = 1;
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
        ]],
        ["Grand Prix and Sprints", [
            firstTeamName !== "" ?
                ((teams.get(firstTeamName)?.total_race_count ?? 0) + (teams.get(firstTeamName)?.total_sprint_count ?? 0))
                : 0,
            secondTeamName !== "" ?
                ((teams.get(secondTeamName)?.total_race_count ?? 0) + (teams.get(secondTeamName)?.total_sprint_count ?? 0))
                : 0
        ]]
    ])

    for (const [key, value] of raceResults) {
        let t1D1Points, t1D2Points, t2D1Points, t2D2Points;
        let t1D1Pos, t1D2Pos, t2D1Pos, t2D2Pos;
        let ps1, ps2;
        t1D1Points = t1D2Points = t2D1Points = t2D2Points = "None";
        t1D1Pos = t1D2Pos = t2D1Pos = t2D2Pos = "Did Not Race";

        if (firstTeamName !== "" && value.has(firstTeamName)) {
            t1D1Points = value.get(firstTeamName).driver_1_points;
            t1D1Pos = value.get(firstTeamName).driver_1_position;
            t1D2Points = value.get(firstTeamName).driver_2_points;
            t1D2Pos = value.get(firstTeamName).driver_2_position;
            ps1 = value.get(firstTeamName).avg_pit_stop;
        }

        if (secondTeamName !== "" && value.has(secondTeamName)) {
            t2D1Points = value.get(secondTeamName).driver_1_points;
            t2D1Pos = value.get(secondTeamName).driver_1_position;
            t2D2Points = value.get(secondTeamName).driver_2_points;
            t2D2Pos = value.get(secondTeamName).driver_2_position;
            ps2 = value.get(secondTeamName).avg_pit_stop;
        }

        pitData.push({
            track: key, x: i,
            ps1: ps1 + 2,
            ps2: ps2 + 2,
        })

        racePointData.push({
            track: key, x: i,
            t1d1: t1D1Points + 5,
            t1d2: t1D2Points + 5,
            t2d1: t2D1Points + 5,
            t2d2: t2D2Points + 5
        })

        racePositionData.push({
            track: key, x: i,
            t1d1: t1D1Pos,
            t1d2: t1D2Pos,
            t2d1: t2D1Pos,
            t2d2: t2D2Pos
        })

        i++;
    }

    i = 1;
    for (const [key, value] of sprintResults) {
        let t1D1Points, t1D2Points, t2D1Points, t2D2Points;
        let t1D1Pos, t1D2Pos, t2D1Pos, t2D2Pos;
        t1D1Points = t1D2Points = t2D1Points = t2D2Points = "None";
        t1D1Pos = t1D2Pos = t2D1Pos = t2D2Pos = "Did Not Race";

        if (firstTeamName !== "" && value.has(firstTeamName)) {
            t1D1Points = value.get(firstTeamName).driver_1_points;
            t1D1Pos = value.get(firstTeamName).driver_1_position;
            t1D2Points = value.get(firstTeamName).driver_2_points;
            t1D2Pos = value.get(firstTeamName).driver_2_position;
        }

        if (secondTeamName !== "" && value.has(secondTeamName)) {
            t2D1Points = value.get(secondTeamName).driver_1_points;
            t2D1Pos = value.get(secondTeamName).driver_1_position;
            t2D2Points = value.get(secondTeamName).driver_2_points;
            t2D2Pos = value.get(secondTeamName).driver_2_position;
        }

        sprintPointData.push({
            track: key, x: i,
            t1d1: t1D1Points + 5,
            t1d2: t1D2Points + 5,
            t2d1: t2D1Points + 5,
            t2d2: t2D2Points + 5
        })

        sprintPositionData.push({
            track: key, x: i,
            t1d1: t1D1Pos,
            t1d2: t1D2Pos,
            t2d1: t2D1Pos,
            t2d2: t2D2Pos
        })

        i++;
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
                        teamData={pitData}
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
                    <GroupedBarChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={sprintOption === 1 ? "Points" : "Position"}
                        teamData={sprintOption === 1 ? sprintPointData : sprintPositionData}
                        yAxisMin={0}
                        yAxisMax={sprintOption === 1 ? 25 : 20}
                        reversed={sprintOption === 1 ? false : true}
                        tooltipLabel={sprintOption === 1 ? "Points" : "Position"} />}>

            </ComparisonContainer>
            <ComparisonContainer
                title="Season Performance"
                containerType="team"
                childComponent={
                    <LineChartContainer
                        tooltipLabel="Position" />}>

            </ComparisonContainer>
        </>
    );
}

export default TeamComparison;