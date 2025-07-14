export async function fetchDriverInfo() {
    const url = "https://api.openf1.org/v1/drivers?session_key=latest";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json()
        return data;
    }
    catch (error) {
        console.error(error.message)
    }

    return [];
}

export async function fetchMeetingKeys() {
    const date = new Date();
    const url = `https://api.openf1.org/v1/sessions?date_start>=${date.getFullYear()}-01-01&date_end<=${date.getFullYear()}-12-31&session_name%3DRace`;
    const meetingKeys = new Set();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json()

        for (let i = 0; i < data.length; i++) {
            if (!meetingKeys.has(data[i].meeting_key)) {
                meetingKeys.add(data[i].meeting_key);
            }
        }

        return meetingKeys;
    }
    catch (error) {
        console.error(error.message)
    }

    return new Set();
}

export async function fetchSessionInfo(key) {
    const url = `https://api.openf1.org/v1/session_result?meeting_key%3E=${key}&points%3E=0`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();

        return data;
    }
    catch (error) {
        console.error(error.message)
    }

    return [];
}