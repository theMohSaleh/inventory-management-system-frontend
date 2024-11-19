const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`;

export const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        const items = await res.json();
        return items;
    } catch (error) {
        console.log(error);
    }
}