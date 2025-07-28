import { useDriverContext } from "../../contexts/DriverContext";
import { useEffect, useState } from "react";
import "./Comparison.css"
import "./../Cards/Card.css"
import ComparisonBarChart from "./ComparisonBarChart"
import DonutChartContainer from "./DonutChartContainer"
import ScatterChartContainer from "./ScatterChartContainer"
import ComparisonContainer from "./ComparisonContainer";
import Disclaimer from "../Disclaimer";

function Comparison() {
    const [raceOption, setRaceOption] = useState(1);
    const [qualiOption, setQualiOption] = useState(1);
    const [sprintRaceOption, setSprintRaceOption] = useState(1);
    const [sprintQualiOption, setSprintQualiOption] = useState(1);
    const { drivers, raceResults, qualiResults, sprintRaceResults, sprintQualiResults, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary, } = useDriverContext();
    const highlightMap = new Map([
        ["Wins", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.wins ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.wins ?? 0 : 0
        ]],
        ["Podiums", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.podiums ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.podiums ?? 0 : 0
        ]],
        ["Points", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.points ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.points ?? 0 : 0
        ]],
        ["Points", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.points ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.points ?? 0 : 0
        ]],
        ["Grand Prix", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.total_race_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.total_race_count ?? 0 : 0
        ]],
        ["Compelted Laps", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.laps ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.laps ?? 0 : 0
        ]]
    ])
    const qualiMap = new Map([
        ["Pole Positions", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.pole_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.pole_count ?? 0 : 0
        ]],
        ["Q3 Appearances (Top 10)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q3_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q3_count ?? 0 : 0
        ]],
        ["Q2 Appearances (Top 15)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q2_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q2_count ?? 0 : 0
        ]],
        ["Q1 Appearances", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q1_count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q1_count ?? 0 : 0
        ]],
        ["Q2 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q2_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q2_exits ?? 0 : 0
        ]],
        ["Q1 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q1_exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q1_exits ?? 0 : 0
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

    const racePointData = [[], []];
    const racePositionData = [[], []];
    const qualiPositionData = [[], []];
    const sprintRacePointData = [[], []];
    const sprintRacePositionData = [[], []];
    const sprintQualiPositionData = [[], []];
    let i = 1;

    for (const [key, value] of raceResults) {
        let d1Points = "None";
        let d1Pos = "None";
        let d2Points = "None";
        let d2Pos = "None";

        if (firstDriverNumber > 0 && value.has(firstDriverNumber)) {
            d1Points = value.get(firstDriverNumber).points;
            d1Pos = value.get(firstDriverNumber).position;
        }

        if (secondDriverNumber > 0 && value.has(secondDriverNumber)) {
            d2Points = value.get(secondDriverNumber).points;
            d2Pos = value.get(secondDriverNumber).position;
        }

        racePointData[0].push({ x: i, y: d1Points, track: key })
        racePointData[1].push({ x: i, y: d2Points, track: key })
        racePositionData[0].push({ x: i, y: d1Pos, track: key })
        racePositionData[1].push({ x: i, y: d2Pos, track: key })
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
        let d1Pos = "None";
        let d2Points = "None";
        let d2Pos = "None";

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

    return (
        <>
            <ComparisonContainer
                title="Highlights"
                controlType="combobox"
                childComponent={<ComparisonBarChart data={highlightMap}></ComparisonBarChart>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Race Overview"
                childComponent={<DonutChartContainer></DonutChartContainer>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Race Results"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setRaceOption(option) } }}
                childComponent={<ScatterChartContainer
                    xAxisLabel="Circuit"
                    yAxisLabel={raceOption === 1 ? "Points" : "Position"}
                    driver1Data={raceOption === 1 ? racePointData[0] : racePositionData[0]}
                    driver2Data={raceOption === 1 ? racePointData[1] : racePositionData[1]}
                    yAxisMin={0}
                    yAxisMax={raceOption === 1 ? 25 : 20}
                    reversed={raceOption === 1 ? false : true}
                    tooltipLabel={raceOption === 1 ? "Points" : "Position"}></ScatterChartContainer>}
                description={raceOption === 1 ?
                    "After each race concludes, drivers score points based on their final position. Drivers in the top 10 positions are awarded points in decreasing amounts from 25 to 1. Outside of those positions 0 points are received."
                    : "At the end of each race, final driver positions are based on where the driver finished and any time penalties. First being indicated by 1 (best) and last indicated by 20 (worst)."}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Qualifying"
                controlType="toggle"
                controlProps={{ label1: "Summary", label2: "Results", updaterFunction: (option) => { setQualiOption(option) } }}
                description={`Q1-Q3 represent the 3 different qualifying stages for each race weekend.\n*Each round, the slowest 5 drivers exit qualifying and do not move on to the next round.`}
                childComponent={qualiOption === 1 ?
                    <ComparisonBarChart data={qualiMap}></ComparisonBarChart>
                    : <ScatterChartContainer
                        xAxisLabel="Circuit"
                        yAxisLabel={"Position"}
                        driver1Data={racePositionData[0]}
                        driver2Data={racePositionData[1]}
                        yAxisMin={0}
                        yAxisMax={20}
                        reversed={true}
                        tooltipLabel="Position"
                    ></ScatterChartContainer>}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Sprint Race Results"
                controlType="toggle"
                controlProps={{ label1: "Points", label2: "Position", updaterFunction: (option) => { setSprintRaceOption(option) } }}
                childComponent={
                    <>
                        <Disclaimer title="Sprint Races and Qualifying" description="F1 sprint races are shorter, standalone races, about one-third the distance of a Grand Prix. While Sprint results contribute to driver and constructor (team) standings, they are separate from the main Grand Prix qualifying and race."></Disclaimer>
                        <ScatterChartContainer
                            xAxisLabel="Circuit"
                            yAxisLabel={sprintRaceOption === 1 ? "Points" : "Position"}
                            driver1Data={sprintRaceOption === 1 ? sprintRacePointData[0] : sprintRacePositionData[0]}
                            driver2Data={sprintRaceOption === 1 ? sprintRacePointData[1] : sprintRacePositionData[1]}
                            yAxisMin={0}
                            yAxisMax={sprintRaceOption === 1 ? 10 : 20}
                            reversed={sprintRaceOption === 1 ? false : true}
                            tooltipLabel={sprintRaceOption === 1 ? "Points" : "Position"}></ScatterChartContainer>
                    </>}
                description={sprintRaceOption === 1 ?
                    "After each race concludes, drivers score points based on their final position. Drivers in the top 8 positions are awarded points in decreasing amounts from 10 to 1. Outside of those positions 0 points are received."
                    : "At the end of each sprint, final driver positions are based on where the driver finished and any time penalties. First being indicated by 1 (best) and last indicated by 20 (worst)."}>
            </ComparisonContainer>
            <ComparisonContainer
                title="Sprint Qualifying"
                controlType="toggle"
                controlProps={{ label1: "Summary", label2: "Results", updaterFunction: (option) => { setSprintQualiOption(option) } }}
                description={`Similar to standard race qualifying, Q1-Q3 also represent the 3 different qualifying stages for each the sprint race.\n*Each round, the slowest 5 drivers exit sprint qualifying and do not move on to the next round.`}
                childComponent={
                    <>
                        <Disclaimer title="Sprint Races and Qualifying" description="F1 sprint races are shorter, standalone races, about one-third the distance of a Grand Prix. While Sprint results contribute to driver and constructor (team) standings, they are separate from the main Grand Prix qualifying and race."></Disclaimer>
                        {sprintQualiOption === 1 ?
                            <ComparisonBarChart data={sprintQualiMap}></ComparisonBarChart>
                            : <ScatterChartContainer
                                xAxisLabel="Circuit"
                                yAxisLabel={"Position"}
                                driver1Data={sprintQualiPositionData[0]}
                                driver2Data={sprintQualiPositionData[1]}
                                yAxisMin={0}
                                yAxisMax={20}
                                reversed={true}
                                tooltipLabel="Position"
                            ></ScatterChartContainer>}
                    </>}>
            </ComparisonContainer>

        </>
    )
}

export default Comparison;