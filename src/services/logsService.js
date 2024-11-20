const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/logs`;
const token = localStorage.getItem('token');

export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const logs = await res.json();
        return logs;
    } catch (error) {
        console.log(error);
    }
}