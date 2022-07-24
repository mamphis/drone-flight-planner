import { userStore } from "@/stores/user";


const request = async (method: string, url: string, body?: any, headers?: any) => {
    const user = userStore();
    const authHeaders: { Authorization?: string } = {};
    if (user.token) {
        authHeaders.Authorization = `Bearer ${user.token}`;
    }

    const response = await fetch(url, {
        method: method.toUpperCase(),
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
            ...authHeaders,
        }
    });

    if (response.status === 401) {
        console.warn("User is not logged in");
        user.logout();
    }

    return response;
}

export const get = async (url: string, headers?: any) => {
    return await request("GET", url, undefined, headers);
}

export const post = async (url: string, body?: any, headers?: any) => {
    return await request("POST", url, body, headers);
}

export const put = async (url: string, body?: any, headers?: any) => {
    return await request("PUT", url, body, headers);
}

export const del = async (url: string, headers?: any) => {
    return await request("DELETE", url, undefined, headers);
}