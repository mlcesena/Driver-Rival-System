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