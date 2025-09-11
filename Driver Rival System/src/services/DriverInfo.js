export async function fetchDrivers() {
    try {
        const response = await fetch("http://localhost:3001/api/drivers/");
        if (!response.ok) throw new Error("Failed to fetch drivers");
        const data = await response.json();

        const driversMap = new Map();
        data.forEach(driver => {
            driversMap.set(driver.driver_number, driver);
        });

        return driversMap;
    } catch (error) {
        // console.error("Error fetching drivers:", error);
        throw error;
    }
}

export async function fetchRaceResults() {
    try {
        const response = await fetch("http://localhost:3001/api/race_results/");
        if (!response.ok) throw new Error("Failed to fetch drivers");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, driver] of Object.entries(data)) {
            const driverMap = new Map();

            for (const [driverNum, data] of Object.entries(driver)) {
                driverMap.set(Number(driverNum), data);
            }

            resultsMap.set(circuit, driverMap);
        }

        return resultsMap;

    } catch (error) {
        // console.error("Error fetching drivers:", error);
        throw error;
    }
}

export async function fetchQualifyingResults() {
    try {
        const response = await fetch("http://localhost:3001/api/qualifying_results/");
        if (!response.ok) throw new Error("Failed to fetch drivers");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, driver] of Object.entries(data)) {
            const driverMap = new Map();

            for (const [driverNum, data] of Object.entries(driver)) {
                driverMap.set(Number(driverNum), data);
            }

            resultsMap.set(circuit, driverMap);
        }

        return resultsMap;

    } catch (error) {
        // console.error("Error fetching drivers:", error);
        throw error;
    }
}

export async function fetchSprintRaceResults() {
    try {
        const response = await fetch("http://localhost:3001/api/sprint_race_results/");
        if (!response.ok) throw new Error("Failed to fetch driver sprint race results");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, driver] of Object.entries(data)) {
            const driverMap = new Map();

            for (const [driverNum, data] of Object.entries(driver)) {
                driverMap.set(Number(driverNum), data);
            }

            resultsMap.set(circuit, driverMap);
        }

        return resultsMap;

    } catch (error) {
        console.error("Error fetching drivers:", error);
        throw error;
    }
}

export async function fetchSprintQualifyingResults() {
    try {
        const response = await fetch("http://localhost:3001/api/sprint_qualifying_results/");
        if (!response.ok) throw new Error("Failed to fetch driver sprint quali results");
        const data = await response.json();

        const resultsMap = new Map();

        for (const [circuit, driver] of Object.entries(data)) {
            const driverMap = new Map();

            for (const [driverNum, data] of Object.entries(driver)) {
                driverMap.set(Number(driverNum), data);
            }

            resultsMap.set(circuit, driverMap);
        }

        return resultsMap;

    } catch (error) {
        // console.error("Error fetching drivers:", error);
        throw error;
    }
}