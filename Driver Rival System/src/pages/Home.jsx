import { useGlobalStateContext } from "../contexts/GlobalStateContext";
import { useDriverContext } from "../contexts/DriverContext";
import { useTrackContext } from "../contexts/TrackContext";
import { useState, useEffect } from "react";
import "../css/main.css"
import '../App.css'
import "../css/PageCard.css"
import LoadScreen from "../components/LoadScreen/LoadScreen";
import PageCard from "../components/PageCard";
import { useTeamContext } from "../contexts/TeamContext";

function Home() {
    const { loading } = useGlobalStateContext();
    const { drivers } = useDriverContext();
    const { teams } = useTeamContext();
    const { trackData } = useTrackContext();
    const [driverImages, setDriverImages] = useState([]);
    const [driverNumbers, setDriverNumbers] = useState([]);
    const [teamImages, setTeamImages] = useState([]);
    const [trackImages, setTrackImages] = useState([]);

    useEffect(() => {
        if (drivers.size > 0) {
            let imgList = [];
            let numList = [];

            for (const value of drivers.values()) {
                imgList.push(value.image);
                numList.push(value.driver_number);
            }

            setDriverImages(imgList);
            setDriverNumbers(numList);
        }
    }, [drivers]);


    useEffect(() => {
        if (teams.size > 0) {
            let imgList = [];

            for (const value of teams.values()) {
                imgList.push("/team-logos/" + value.image);
            }

            setTeamImages(imgList);
        }
    }, [teams]);

    useEffect(() => {
        if (trackData.size > 0) {
            let imgList = [];

            for (const value of trackData.values()) {
                imgList.push("/tracks/" + value.image);
            }

            setTrackImages(imgList);
        }
    }, [trackData]);

    return (
        loading ? <LoadScreen></LoadScreen> :
            <>
                <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", marginInline: "auto" }}>
                    <h1 className="fs-secondary-heading" style={{ marginBottom: "1rem" }}>
                        Experience Formula 1 Beyond the Track
                    </h1>
                    <p>
                        Compare drivers and teams, explore detailed circuit profiles, and dive into interactive stats and visualizations. From lap records to championship overviews, discover the data and stories that drive Formula 1
                    </p>
                </div>
                <div className="page-card-container">
                    <PageCard
                        title="Drivers"
                        description="Compare active Formula 1 drivers in a head-to-head matchup. View their performance across each race weekend, current standings, and an in-depth analysis about the entire season as it unfolds."
                        imageList={driverImages}
                        elementList={driverNumbers}
                        loop={true}
                        page="drivers" />
                    <PageCard
                        title="Teams"
                        description="View all of the active Formula 1 constructors. Look into the history behind the distinct teams and at the personnel that makes them up. Compare key metrics from the current season and see where they stack up."
                        imageList={teamImages}
                        loop={true}
                        page="teams" />
                    <PageCard
                        title="Tracks"
                        description="Explore each of the unique circuits on the Formula 1 calendar. All of the tracks offer a variety of challenges for drivers and require a tailored approach."
                        imageList={trackImages}
                        loop={true}
                        page="tracks" />
                    {/* <PageCard
                    title="Information"
                    description="Learn the basics of Formula 1 and dive deep into the technical terminology. Get up to date on the rules, tire information, tracks details, and more."
                    page="info" /> */}
                </div>
            </>
    );
}

export default Home;