export async function fetchTrackInfo() {
    try {
        const response = await fetch("http://localhost:3001/api/tracks/");
        if (!response.ok) throw new Error("Failed to fetch tracks");
        const data = await response.json();

        const trackMap = new Map();
        data.forEach(track => {
            trackMap.set(track.circuit_name, track);
        });

        return trackMap;
    } catch (error) {
        // console.error("Error fetching tracks:", error);
        throw error;
    }
}