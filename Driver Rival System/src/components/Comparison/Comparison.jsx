import { useDriverContext } from "../../contexts/DriverContext";
import { useEffect, useState } from "react";
import "./Comparison.css"
import "./../Cards/Card.css"
import ComparisonBarChart from "./ComparisonBarChart"
import DonutChartContainer from "./DonutChartContainer"
import ScatterChartContainer from "./ScatterChartContainer"

function Comparison() {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary } = useDriverContext();
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
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.totalRaceCount ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.totalRaceCount ?? 0 : 0
        ]],
        ["Laps", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.laps ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.laps ?? 0 : 0
        ]]
    ])
    const qualiMap = new Map([
        ["Pole Positions", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.poleCount ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.poleCount ?? 0 : 0
        ]],
        ["Q3 Appearances (Top 10)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q3Count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q3Count ?? 0 : 0
        ]],
        ["Q2 Appearances (Top 15)", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q2Count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q2Count ?? 0 : 0
        ]],
        ["Q1 Appearances", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q1Count ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q1Count ?? 0 : 0
        ]],
        ["Q2 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q2Exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q2Exits ?? 0 : 0
        ]],
        ["Q1 Exits*", [
            firstDriverNumber > 0 ? drivers.get(firstDriverNumber)?.q1Exits ?? 0 : 0,
            secondDriverNumber > 0 ? drivers.get(secondDriverNumber)?.q1Exits ?? 0 : 0
        ]],
    ])


    return (
        <>
            <ComparisonBarChart title="Highlights" data={highlightMap} type="combobox"></ComparisonBarChart>
            <DonutChartContainer title="Race Statistics"></DonutChartContainer>
            <ScatterChartContainer title="Race Results"></ScatterChartContainer>
            <ComparisonBarChart
                title="Qualifying"
                data={qualiMap}
                type="toggle"
                description={`Q1-Q3 represent the 3 different qualifying stages for each race weekend.\n*Each round, the slowest 5 drivers exit qualifying and do not move on to the next round.`}></ComparisonBarChart>
        </>
    )
}

export default Comparison;