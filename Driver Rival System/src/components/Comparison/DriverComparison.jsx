import { useDriverContext } from "../../contexts/DriverContext";
import { useEffect, useState } from "react";
import "./Comparison.css"
import "./../Cards/Card.css"
import ComparisonBarChart from "./ComparisonBarChart"
import DonutChartContainer from "./DonutChartContainer"
import ScatterChartContainer from "./ScatterChartContainer"
import ComparisonContainer from "./ComparisonContainer";
import LineChartContainer from "./LineChartContainer";
import Disclaimer from "../Disclaimer";

function Comparison() {
    const [raceOption, setRaceOption] = useState(1);
    const [qualiOption, setQualiOption] = useState(1);
    const [sprintRaceOption, setSprintRaceOption] = useState(1);
    const [sprintQualiOption, setSprintQualiOption] = useState(1);
    const [seasonOption, setSeasonOption] = useState(1);
    const { drivers,
        raceResults,
        qualiResults,
        sprintRaceResults,
        sprintQualiResults,
        seasonResults,
        firstDriverNumber,
        secondDriverNumber,
        team1Primary,
        team2Primary,
        team1Accent,
        team2Accent } = useDriverContext();
    const racePointData = [[], []];
    const racePositionData = [[], []];
    const qualiPositionData = [[], []];
    const sprintRacePointData = [[], []];
    const sprintRacePositionData = [[], []];
    const sprintQualiPositionData = [[], []];
    const seasonData = [];
    let i = 1;
    const highlightMap = new Map([
        ["Wins", [
            firstDriverNumber > 0 ?
                ((drivers.get(firstDriverNumber)?.race_wins ?? 0) + (drivers.get(firstDriverNumber)?.sprint_wins ?? 0))
                : 0,
            secondDriverNumber > 0 ?
                ((drivers.get(secondDriverNumber)?.race_wins ?? 0) + (drivers.get(secondDriverNumber)?.sprint_wins ?? 0))
                : 0
        ]],
        ["Podiums", [
            firstDriverNumber > 0 ?
                ((drivers.get(firstDriverNumber)?.race_podiums ?? 0) + (drivers.get(firstDriverNumber)?.sprint_podiums ?? 0))
                : 0,
            secondDriverNumber > 0 ?
                ((drivers.get(secondDriverNumber)?.race_podiums ?? 0) + (drivers.get(secondDriverNumber)?.sprint_podiums ?? 0))
                : 0
        ]],
        ["Total Points", [
            firstDriverNumber > 0 ?
                ((drivers.get(firstDriverNumber)?.race_points ?? 0) + (drivers.get(firstDriverNumber)?.sprint_points ?? 0))
                : 0,
            secondDriverNumber > 0 ?
                ((drivers.get(secondDriverNumber)?.race_points ?? 0) + (drivers.get(secondDriverNumber)?.sprint_points ?? 0))
                : 0
        ]],
        ["Grand Prix and Sprints", [
            firstDriverNumber > 0 ?
                ((drivers.get(firstDriverNumber)?.total_race_count ?? 0) + (drivers.get(firstDriverNumber)?.total_sprint_count ?? 0))
                : 0,
            secondDriverNumber > 0 ?
                ((drivers.get(secondDriverNumber)?.total_race_count ?? 0) + (drivers.get(secondDriverNumber)?.total_sprint_count ?? 0))
                : 0
        ]],
        ["Completed Laps", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.laps ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.laps ?? 0 : 0
        ]]
    ])
    const qualiMap = new Map([
        ["Pole Positions", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_pole_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_pole_count ?? 0 : 0
        ]],
        ["Q3 Appearances (Top 10)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_q3_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_q3_count ?? 0 : 0
        ]],
        ["Q2 Appearances (Top 15)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_q2_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_q2_count ?? 0 : 0
        ]],
        ["Q1 Appearances", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_q1_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_q1_count ?? 0 : 0
        ]],
        ["Q2 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_q2_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_q2_exits ?? 0 : 0
        ]],
        ["Q1 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.race_q1_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.race_q1_exits ?? 0 : 0
        ]],
    ])
    const sprintQualiMap = new Map([
        ["Sprint Pole Positions", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_pole_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_pole_count ?? 0 : 0
        ]],
        ["SQ3 Appearances (Top 10)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_q3_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_q3_count ?? 0 : 0
        ]],
        ["SQ2 Appearances (Top 15)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_q2_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_q2_count ?? 0 : 0
        ]],
        ["SQ1 Appearances", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_q1_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_q1_count ?? 0 : 0
        ]],
        ["SQ2 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_q2_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_q2_exits ?? 0 : 0
        ]],
        ["SQ1 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.sprint_q1_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.sprint_q1_exits ?? 0 : 0
        ]],
    ])

    for (const [key, value] of raceResults) {
        let d1Points = "None";
        let d1Pos = "Did Not Race";
        let d2Points = "None";
        let d2Pos = "Did Not Race";

        if (firstDriverNumber > 0 && value.has(firstDriverNumber)) {
            d1Points = value.get(firstDriverNumber).points;
            d1Pos = value.get(firstDriverNumber).position;

        }

        if (secondDriverNumber > 0 && value.has(secondDriverNumber)) {
            d2Points = value.get(secondDriverNumber).points;
            d2Pos = value.get(secondDriverNumber).position;
        }

        racePointData[0].push({ track: key, x: i, y: d1Points })
        racePointData[1].push({ track: key, x: i, y: d2Points })
        racePositionData[0].push({ track: key, x: i, y: d1Pos })
        racePositionData[1].push({ track: key, x: i, y: d2Pos })
        i++;
    }

    i = 1;
    for (const [key, value] of qualiResults) {
        qualiPositionData[0].push({ x: i, y: firstDriverNumber > 0 && value.has(firstDriverNumber) ? value.get(firstDriverNumber).position : 0, z: 200, track: key })
        qualiPositionData[1].push({ x: i, y: secondDriverNumber > 0 && value.has(secondDriverNumber) ? value.get(secondDriverNumber).position : 0, z: 200, track: key })
        i++;
    }

    i = 1;
    for (const [key, value] of sprintRaceResults) {
        let d1Points = "None";
        let d1Pos = "Did Not Race";
        let d2Points = "None";
        let d2Pos = "Did Not Race";

        if (firstDriverNumber > 0 && value.has(firstDriverNumber)) {
            d1Points = value.get(firstDriverNumber).points;
            d1Pos = value.get(firstDriverNumber).position;
        }

        if (secondDriverNumber > 0 && value.has(secondDriverNumber)) {
            d2Points = value.get(secondDriverNumber).points;
            d2Pos = value.get(secondDriverNumber).position;
        }

        sprintRacePointData[0].push({ x: i, y: d1Points, track: key })
        sprintRacePointData[1].push({ x: i, y: d2Points, track: key })
        sprintRacePositionData[0].push({ x: i, y: d1Pos, track: key })
        sprintRacePositionData[1].push({ x: i, y: d2Pos, track: key })
        i++;
    }

    i = 1;
    for (const [key, value] of sprintQualiResults) {
        sprintQualiPositionData[0].push({ x: i, y: firstDriverNumber > 0 && value.has(firstDriverNumber) ? value.get(firstDriverNumber).position : 0, z: 200, track: key })
        sprintQualiPositionData[1].push({ x: i, y: secondDriverNumber > 0 && value.has(secondDriverNumber) ? value.get(secondDriverNumber).position : 0, z: 200, track: key })
        i++;
    }

    i = 1;
    for (const [key, value] of seasonResults) {
        let d1Points = "None", d2Points = "None";
        let d1Pos = "Did Not Race", d2Pos = "Did Not Race";
        let d1Name = null, d2Name = null;

        if (firstDriverNumber !== -1 && value.has(drivers.get(firstDriverNumber).full_name)) {
            const team1 = value.get(drivers.get(firstDriverNumber).full_name);
            d1Points = team1.driver_points;
            d1Pos = team1.driver_position;
            d1Name = team1.driver_name;
            i = team1.session_num;
        }

        if (secondDriverNumber !== -1 && value.has(drivers.get(secondDriverNumber).full_name)) {
            const team2 = value.get(drivers.get(secondDriverNumber).full_name);
            d2Points = team2.driver_points;
            d2Pos = team2.driver_position;
            d2Name = team2.driver_name;
        }

        seasonData.push({
            track: key, x: i,
            t1v1: d1Points,
            t1v2: d1Pos,
            t1n: d1Name,
            t2v1: d2Points,
            t2v2: d2Pos,
            t2n: d2Name
        })
        i++;
    }

    return (
        <div className="justify-flex-center">
            <ComparisonContainer
                title="Highlights"
                controlType="combobox"
                containerType="driver"
                childComponent={
                    <ComparisonBarChart
                        data={highlightMap}
                        team1Primary={team1Primary}
                        team2Primary={team2Primary}
                        team1Accent={team1Accent}
                        team2Accent={team2Accent} />}
                description="Highlights include both race and sprint results" >
            </ComparisonContainer >
            <ComparisonContainer
                title="Race Overview"
                containerType="driver"
                childComponent={<DonutChartContainer></DonutChartContainer>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Race Results"
                containerType="driver"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setRaceOption(option) } }}
                childComponent={<ScatterChartContainer
                    xAxisLabel="Circuit"
                    yAxisLabel={raceOption === 1 ? "Points" : "Position"}
                    data1={raceOption === 1 ? racePointData[0] : racePositionData[0]}
                    data2={raceOption === 1 ? racePointData[1] : racePositionData[1]}
                    yAxisMin={0}
                    yAxisMax={raceOption === 1 ? 25 : 20}
                    reversed={raceOption === 1 ? false : true}
                    tooltipLabel={raceOption === 1 ? "Points" : "Position"}
                    entity1={drivers.get(firstDriverNumber)?.full_name ?? "None"}
                    entity2={drivers.get(secondDriverNumber)?.full_name ?? "None"}
                    primary1={team1Primary}
                    primary2={team2Primary}
                    accent1={team1Accent}
                    accent2={team2Accent}
                />}
                description={raceOption === 1 ?
                    "After each race concludes, drivers score points based on their final position. Drivers in the top 10 positions are awarded points in decreasing amounts from 25 to 1. Outside of those positions 0 points are received."
                    : "At the end of each race, final driver positions are based on where the driver finished and any time penalties. First being indicated by 1 (best) and last indicated by 20 (worst)."}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Qualifying"
                containerType="driver"
                controlType="toggle"
                controlProps={{ label1: "Summary", label2: "Results", updaterFunction: (option) => { setQualiOption(option) } }}
                description={`Q1-Q3 represent the 3 different qualifying stages for each race weekend.\n*Each round, the slowest 5 drivers exit qualifying and do not move on to the next round.`}
                childComponent={qualiOption === 1 ?
                    <ComparisonBarChart
                        data={qualiMap}
                        team1Primary={team1Primary}
                        team2Primary={team2Primary}
                        team1Accent={team1Accent}
                        team2Accent={team2Accent} />
                    : <ScatterChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={"Position"}
                        data1={racePositionData[0]}
                        data2={racePositionData[1]}
                        yAxisMin={0}
                        yAxisMax={20}
                        reversed={true}
                        tooltipLabel="Position"
                        entity1={drivers.get(firstDriverNumber)?.full_name ?? "None"}
                        entity2={drivers.get(secondDriverNumber)?.full_name ?? "None"}
                        primary1={team1Primary}
                        primary2={team2Primary}
                        accent1={team1Accent}
                        accent2={team2Accent}
                    ></ScatterChartContainer>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Sprint Race Results"
                containerType="driver"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setSprintRaceOption(option) } }}
                childComponent={
                    <>
                        <Disclaimer title="Sprint Races and Qualifying" description="F1 sprint races are shorter, standalone races, about one-third the distance of a Grand Prix. While Sprint results contribute to driver and constructor (team) standings, they are separate from the main Grand Prix qualifying and race."></Disclaimer>
                        <ScatterChartContainer
                            xAxisLabel="Circuit"
                            yAxisLabel={sprintRaceOption === 1 ? "Points" : "Position"}
                            data1={sprintRaceOption === 1 ? sprintRacePointData[0] : sprintRacePositionData[0]}
                            data2={sprintRaceOption === 1 ? sprintRacePointData[1] : sprintRacePositionData[1]}
                            yAxisMin={0}
                            yAxisMax={sprintRaceOption === 1 ? 10 : 20}
                            reversed={sprintRaceOption === 1 ? false : true}
                            tooltipLabel={sprintRaceOption === 1 ? "Points" : "Position"}
                            entity1={drivers.get(firstDriverNumber)?.full_name ?? "None"}
                            entity2={drivers.get(secondDriverNumber)?.full_name ?? "None"}
                            primary1={team1Primary}
                            primary2={team2Primary}
                            accent1={team1Accent}
                            accent2={team2Accent} />
                    </>}
                description={sprintRaceOption === 1 ?
                    "After each race concludes, drivers score points based on their final position. Drivers in the top 8 positions are awarded points in decreasing amounts from 10 to 1. Outside of those positions 0 points are received."
                    : "At the end of each sprint, final driver positions are based on where the driver finished and any time penalties. First being indicated by 1 (best) and last indicated by 20 (worst)."}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Sprint Qualifying"
                containerType="driver"
                controlType="toggle"
                controlProps={{ label1: "Summary", label2: "Results", updaterFunction: (option) => { setSprintQualiOption(option) } }}
                description={`Similar to standard race qualifying, Q1-Q3 also represent the 3 different qualifying stages for each the sprint race.\n*Each round, the slowest 5 drivers exit sprint qualifying and do not move on to the next round.`}
                childComponent={
                    <>
                        <Disclaimer title="Sprint Races and Qualifying" description="F1 sprint races are shorter, standalone races, about one-third the distance of a Grand Prix. While Sprint results contribute to driver and constructor (team) standings, they are separate from the main Grand Prix qualifying and race."></Disclaimer>
                        {sprintQualiOption === 1 ?
                            <ComparisonBarChart
                                data={sprintQualiMap}
                                team1Primary={team1Primary}
                                team2Primary={team2Primary}
                                team1Accent={team1Accent}
                                team2Accent={team2Accent} />
                            : <ScatterChartContainer
                                xAxisLabel="Circuit"
                                yAxisLabel={"Position"}
                                data1={sprintQualiPositionData[0]}
                                data2={sprintQualiPositionData[1]}
                                yAxisMin={0}
                                yAxisMax={20}
                                reversed={true}
                                tooltipLabel="Position"
                                entity1={drivers.get(firstDriverNumber)?.full_name ?? "None"}
                                entity2={drivers.get(secondDriverNumber)?.full_name ?? "None"}
                                primary1={team1Primary}
                                primary2={team2Primary}
                                accent1={team1Accent}
                                accent2={team2Accent}
                            />}
                    </>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Season Performance"
                containerType="driver"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setSeasonOption(option) } }}
                childComponent={
                    <LineChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={seasonOption === 1 ? "Points" : "Position"}
                        data={seasonData}
                        yAxisMin={seasonOption === 1 ? 0 : 1}
                        yAxisMax={seasonOption === 1 ? null : 10}
                        dataOption={seasonOption}
                        reversed={seasonOption === 1 ? false : true}
                        tooltipLabel={seasonOption === 1 ? "Points" : "Position"}
                        entity1={firstDriverNumber > -1 ? drivers.get(firstDriverNumber).full_name : "None"}
                        entity2={secondDriverNumber > -1 ? drivers.get(secondDriverNumber).full_name : "None"}
                        primary1={team1Primary}
                        primary2={team2Primary !== team1Primary ? team2Primary : team2Accent}
                    />}>

            </ComparisonContainer>
        </div>
    )
}

export default Comparison;