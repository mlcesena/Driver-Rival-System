export async function fetchTrackInfo() {
    try {
        const response = await fetch("http://localhost:3001/api/tracks/");
        if (!response.ok) throw new Error("Failed to fetch tracks");
        const data = await response.json();

        const trackMap = new Map();
        data.forEach(track => {
            track.image = setTrackImage(track.circuit_name);
            trackMap.set(track.circuit_name, track);
        });

        return trackMap;
    } catch (error) {
        console.error("Error fetching tracks:", error);
    }
}

function setTrackImage(name) {
    switch (name) {
        case "Sakhir":
            return "sakhir.svg"
        case "Jeddah":
            return "jeddah.svg"
        case "Melbourne":
            return "melbourne.svg"
        case "Suzuka":
            return "suzuka.svg"
        case "Shanghai":
            return "shanghai.svg"
        case "Miami":
            return "miami.svg"
        case "Imola":
            return "imola.svg"
        case "Monte Carlo":
            return "monaco.svg"
        case "Montreal":
            return "montreal.svg"
        case "Catalunya":
            return "barcelona.svg"
        case "Spielberg":
            return "spielberg.svg"
        case "Silverstone":
            return "silverstone.svg"
        case "Hungaroring":
            return "hungary.svg"
        case "Spa-Francorchamps":
            return "spa.svg"
        case "Zandvoort":
            return "zandvoort.svg"
        case "Monza":
            return "monza.svg"
        case "Baku":
            return "baku.svg"
        case "Singapore":
            return "singapore.svg"
        case "Austin":
            return "austin.svg"
        case "Mexico City":
            return "mexico.svg"
        case "Interlagos":
            return "brazil.svg"
        case "Las Vegas":
            return "lasvegas.svg"
        case "Lusail":
            return "qatar.svg"
        case "Yas Marina Circuit":
            return "abudhabi.svg"
        default:
            break;
    }
}