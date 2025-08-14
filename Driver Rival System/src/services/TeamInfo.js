export async function fetchTeamInfo() {
    try {
        const response = await fetch("http://localhost:3001/api/teams/");
        if (!response.ok) throw new Error("Failed to fetch team info");
        const data = await response.json();

        const teamMap = new Map();
        data.forEach(team => {
            team.image = setTeamImage(team.name);
            teamMap.set(team.name, team);
        });

        return teamMap;
    } catch (error) {
        console.error("Error fetching tracks:", error);
    }
}

export async function fetchTeamRaceResults() {
    try {
        const response = await fetch("http://localhost:3001/api/team_race_results/");
        if (!response.ok) throw new Error("Failed to fetch team race results");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, team] of Object.entries(data)) {
            const teamMap = new Map();

            for (const [teamName, data] of Object.entries(team)) {
                teamMap.set(teamName, data);
            }

            resultsMap.set(circuit, teamMap);
        }

        return resultsMap;

    } catch (error) {
        console.error("Error fetching team race results:", error);
    }
}

export async function fetchTeamSprintResults() {
    try {
        const response = await fetch("http://localhost:3001/api/team_sprint_race_results/");
        if (!response.ok) throw new Error("Failed to fetch team sprint results");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, team] of Object.entries(data)) {
            const teamMap = new Map();

            for (const [teamName, data] of Object.entries(team)) {
                teamMap.set(teamName, data);
            }

            resultsMap.set(circuit, teamMap);
        }

        return resultsMap;

    } catch (error) {
        console.error("Error fetching team sprint results:", error);
    }
}

function setTeamImage(name) {
    switch (name) {
        case "Alpine":
            return "alpine.svg"
        case "Aston Martin":
            return "aston-martin.svg"
        case "Ferrari":
            return "ferrari.svg"
        case "Haas F1 Team":
            return "haas.svg"
        case "McLaren":
            return "mclaren.svg"
        case "Mercedes":
            return "mercedes.svg"
        case "Racing Bulls":
            return "racing-bulls.svg"
        case "Red Bull Racing":
            return "redbull.svg"
        case "Kick Sauber":
            return "sauber.svg"
        case "Williams":
            return "williams.svg"
        default:
            break;
    }
}