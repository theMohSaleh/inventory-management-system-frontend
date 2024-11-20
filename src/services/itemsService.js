const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/items`;
const token = localStorage.getItem('token');

export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(),
        });
        const items = await res.json();
        return items;
    } catch (error) {
        console.log(error);
    }
}