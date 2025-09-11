import "../css/Info.css"

function Info() {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">What is Formula 1?</h1>
                        <p>Starting in 1950, Formula 1 is the pinnacle of single-seater motor racing. 10 teams, also known as constructors compete head to head to develop the best car. Racing at circuits around the world, each team features 2 drivers who compete head with all other drivers. All of the teams and their drivers compete for position based points rewarded after each race weekend. These points go towards their Constructor and Driver world championship ranking.</p>
                    </div>

                    <div className="vert-divider"></div>
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">How Race Weekends Work</h1>
                        <p>
                            Officially kicking off on Friday, most Formula 1 race weeks include 3 free practice sessions. These 1 hour long sessions allow teams and drivers to learn about the circuit, experiment with different race strategies, test out variations of car setup, and see where they stack up against the rest.
                            <br></br>
                            <br></br>
                            After the 3 free practices conclude, a 3 round qualifying session is held. In each round of qualifying, drivers compete to drive the fastest lap around the circuit. At the end of the round, the 5 slowest drivers are eliminated and will start the race from the position they finished. The driver with the fastest time at the end of Q3 earns "pole position" and starts in the best spot at the front of the grid.
                            <br></br>
                            <br></br>
                            Sundays feature the actual race where the drivers and teams compete for points. While the number of laps and total race duration vary by track, most races are around 1 hour and 30 minutes.</p>
                    </div>

                    <div className="vert-divider"></div>
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">Tracks</h1>
                        <p>Hosted across 20 countries around the world, all of the tracks on the Formula 1 calendar offer a unique experience for drivers and teams. Each utilizes a variety of low, medium, and high speed corners paired with long straights where drivers can reach an excess of 215 MPH / 350 KPH.
                            <br></br>
                            <br></br>
                            Circuits typically include some changes in elevation which provide an additional challenge.
                            <br></br>
                            <br></br>
                            While a majority of F1 circuits are permanent tracks that are used throughout the year by other racing series, some are temporary street circuits. These are typically hosted on public roads and undergo a hefty transformation to prepare it for the race weekend. The most infamous street circuit on the F1 calendar is the Monaco Grand Prix, where the entire city of Monaco is captivated by the extreme precision that the drivers dare to put onto display.
                            <br></br>
                            <br></br>
                            Alongside all of the other factors, circuits feature varying degrees of tire wear. While some are extremely harsh of the tire compounds, requiring drivers to make multiple pit stops, other tracks may be more suited to the single mandatory stop.
                            <br></br>
                            <br></br>
                            Race tracks are also categorized based on a spectrum from maximum top speed or maximum downforce. Tracks like Monza have multiple long straights and few corners. In contrast, the Hungaroring in Hungary utilizes few straights, but a lot of technical corners.</p>
                    </div>

                    <div className="vert-divider"></div>
                </div>
            </div>

            <div className="divider" style={{ marginBlock: "3rem" }}></div>

            <div className="content-container-large">
                <div className="info-text-container" style={{ maxWidth: "none" }}>
                    <h1 className="fs-sub-heading">About This Site</h1>
                    <p>Driver Rival System was created as a passion project to share an interactive view of Formula 1 and its technical details. The goal was to present users with a blend of in-depth data in an easy to understand and clean look. The aim was to expand beyond what is shown on track and provide users with tools to compare season statistics and learn more about one of the most exiciting forms of motor racing.</p>
                </div>
            </div>
        </>
    );
}

export default Info;