import { API_URL } from "@/export.data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePermittedWebsiteStore } from "@/store/permittedWebsites.store"

export async function loginApi(userName: string, password: string) {
    const { setAllPermittedWebsites } = usePermittedWebsiteStore.getState();
    try {
        const response = await fetch(`${API_URL}/appapi/masterlogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password }),
        })

        if (!response.ok) {
            console.error('Login failed:', response.statusText)
            return false
        }

        const data = await response.json()

        if (!data.token) {
            console.error('No token in response')
            return false
        }

        const permittedWebsites: string[] = data.permittedWebsites.map((item: any) => {
            return item.permittedWebsite.url
        });

        setAllPermittedWebsites(data.permittedWebsites);

        const permissions: string[] = []
        if (permittedWebsites.includes('kolkata')) permissions.push('kolkata')
        if (permittedWebsites.includes('africa')) permissions.push('africa')
        if (permittedWebsites.includes('indore')) permissions.push('indore')

        await AsyncStorage.setItem("JWT_KEY", data.token);
        await AsyncStorage.setItem("PERMISSIONS", JSON.stringify(permissions));
        await AsyncStorage.setItem("ROLE", JSON.stringify(data.role));
        await AsyncStorage.setItem("USER_NAME", JSON.stringify(data.name));
        return true

    } catch (error) {
        console.error('Login error:', error)
        return false
    }
}

export async function getDashboard(site: string) {
    const token = await AsyncStorage.getItem("JWT_KEY");

    if (!token) {
        throw new Error("Token is required.");
    }

    try {
        const response = await fetch(`${API_URL}/appapi/appdashboard/${site}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            console.error('Dashboard data fetch failed:', response.statusText)
            return false
        }

        return data.data

    } catch (error) {
        console.error('Login error:', error)
        return false
    }
}

export async function logout() {
    await AsyncStorage.multiRemove(["JWT_KEY", "PERMISSIONS", "ROLE", "USER_NAME"]);
}

export async function getPermissions(): Promise<string[]> {
    const permissions = await AsyncStorage.getItem("PERMISSIONS");
    return permissions ? JSON.parse(permissions) : [];
}
