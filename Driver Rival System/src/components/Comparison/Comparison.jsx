import { useDriverContext } from "../../contexts/DriverContext";
import { useEffect, useState } from "react";
import "./Comparison.css"
import "./../Cards/Card.css"
import ComparisonBarChart from "./ComparisonBarChart"
import DonutChartContainer from "./DonutChartContainer"
import ScatterChartContainer from "./ScatterChartContainer"
import ComparisonContainer from "./ComparisonContainer";

function Comparison() {
    const [raceOption, setRaceOption] = useState(1);
    const [qualiOption, setQualiOption] = useState(1);
    const { drivers, raceResults, qualiResults, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary, } = useDriverContext();
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
        ["Laps", [
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

    const racePointData = [[], []];
    const racePositionData = [[], []];
    const qualiPositionData = [[], []];
    let i = 1;

    for (const [key, value] of raceResults) {
        racePointData[0].push({ x: i, y: firstDriverNumber > 0 && value.has(firstDriverNumber) ? value.get(firstDriverNumber).points : 0, track: key })
        racePointData[1].push({ x: i, y: secondDriverNumber > 0 && value.has(secondDriverNumber) ? value.get(secondDriverNumber).points : 0, track: key })
        racePositionData[0].push({ x: i, y: firstDriverNumber > 0 && value.has(firstDriverNumber) ? value.get(firstDriverNumber).position : 0, track: key })
        racePositionData[1].push({ x: i, y: secondDriverNumber > 0 && value.has(secondDriverNumber) ? value.get(secondDriverNumber).position : 0, track: key })
        i++;
        // racePointData.set(key,
        //     [firstDriverNumber > 0 ? value.get(firstDriverNumber).points : 0,
        //     secondDriverNumber > 0 ? value.get(secondDriverNumber).points : 0])

        // racePositionData.set(key,
        //     [firstDriverNumber > 0 ? value.get(firstDriverNumber).position : 0,
        //     secondDriverNumber > 0 ? value.get(secondDriverNumber).position : 0])
    }

    for (const [key, value] of qualiResults) {
        qualiPositionData[0].push({ x: i, y: firstDriverNumber > 0 && value.has(firstDriverNumber) ? value.get(firstDriverNumber).position : 0, z: 200, track: key })
        qualiPositionData[1].push({ x: i, y: secondDriverNumber > 0 && value.has(secondDriverNumber) ? value.get(secondDriverNumber).position : 0, z: 200, track: key })
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
                {/* childComponent={<ComparisonBarChart data={
                    raceOption === 1 ? racePointData : racePositionData
                }
                    inverse={raceOption === 1 ? false : true}>
                        </ComparisonBarChart>}> */}
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

        </>
    )
}

export default Comparison;