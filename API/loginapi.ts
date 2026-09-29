import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loginApi(username: string, password: string) {
    try {
        const response = await fetch('http://192.168.43.234:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
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

        const permittedWebsites = data.permittedWebsites || []
        const permissions: string[] = []
        if (permittedWebsites.includes('kolkata')) permissions.push('kolkata')
        if (permittedWebsites.includes('africa')) permissions.push('africa')
        if (permittedWebsites.includes('indore')) permissions.push('indore')

        await AsyncStorage.setItem("JWT_KEY", data.token);
        await AsyncStorage.setItem("PERMISSIONS", JSON.stringify(permissions));
        return true

    } catch (error) {
        console.error('Login error:', error)
        return false
    }
}

export async function logout() {
    await AsyncStorage.multiRemove(["JWT_KEY", "PERMISSIONS"]);
}

export async function getPermissions(): Promise<string[]> {
    const permissions = await AsyncStorage.getItem("PERMISSIONS");
    return permissions ? JSON.parse(permissions) : [];
}
