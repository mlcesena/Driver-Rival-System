import { useDriverContext } from "../contexts/DriverContext";
import { useState, useEffect } from "react";
import DriverCard from '../components/Cards/DriverCard'
import ComparisonChart from '../components/Comparison/ComparisonChart'
import "../css/main.css"
import '../App.css'
import ComboxBox from "../components/ComboBox/ComboBox";
import EmptyCard from "../components/Cards/EmptyCard";
import Header from "../components/Header";

function Home() {
    const { drivers, firstDriverIdx, setFirstDriverIdx, secondDriverIdx, setSecondDriverIdx, team1Primary, team1Accent, team2Primary, team2Accent } = useDriverContext();

    const handleUpdatedDriver1 = (idx) => {
        setFirstDriverIdx(idx);
    };

    const handleUpdatedDriver2 = (idx) => {
        setSecondDriverIdx(idx);
    };

    return (
        <>
            <Header></Header>
            <div className="driver-container">
                {drivers.length > 0 ? <>
                    <div className="driver-wrapper">
                        <ComboxBox
                            title="Driver Selection"
                            options={drivers.map((driver, idx) => ({ id: idx, name: `${driver.first_name} ${driver.last_name}` }))}
                            updaterFunction={handleUpdatedDriver1}>
                        </ComboxBox>
                        {firstDriverIdx > -1 ? <DriverCard
                            firstName={drivers[firstDriverIdx].first_name}
                            lastName={drivers[firstDriverIdx].last_name}
                            team={drivers[firstDriverIdx].team_name}
                            number={drivers[firstDriverIdx].driver_number}
                            acronym={drivers[firstDriverIdx].name_acronym}
                            image={drivers[firstDriverIdx].headshot_url}
                            primaryColor={team1Primary}
                            accentColor={team1Accent}
                        ></DriverCard> : <EmptyCard></EmptyCard>}

                    </div>

                    <div className="driver-wrapper align-right">
                        <ComboxBox
                            title="Driver Selection"
                            options={drivers.map((driver, idx) => ({ id: idx, name: `${driver.first_name} ${driver.last_name}` }))}
                            updaterFunction={handleUpdatedDriver2}>

                        </ComboxBox>
                        {secondDriverIdx > -1 ? <DriverCard
                            firstName={drivers[secondDriverIdx].first_name}
                            lastName={drivers[secondDriverIdx].last_name}
                            team={drivers[secondDriverIdx].team_name}
                            number={drivers[secondDriverIdx].driver_number}
                            acronym={drivers[secondDriverIdx].name_acronym}
                            image={drivers[secondDriverIdx].headshot_url}
                            primaryColor={team2Primary}
                            accentColor={team2Accent}
                        ></DriverCard> : <EmptyCard></EmptyCard>}
                    </div>
                </>
                    : <></>}
            </div>
            <ComparisonChart></ComparisonChart>
        </>
    );
}

export default Home;