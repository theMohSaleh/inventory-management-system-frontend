const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/items`;
const token = localStorage.getItem('token');

export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const items = await res.json();
        return items;
    } catch (error) {
        console.log(error);
    }
}

export const show = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const item = await res.json();
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (itemFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemFormData),
        });
        const items = await res.json();
        return items;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (itemFormData, itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemFormData),
        });
        const item = await res.json();
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const deletedItem = await res.json();
        return deletedItem;
    } catch (error) {
        console.log(error);
    }
}