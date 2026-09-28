import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

const africa = () => {
    const params = useLocalSearchParams();
    const cookies = params.cookies as string || '';
    const username = params.username as string || '';
    const redirectUrl = params.redirectUrl as string || 'https://africa.pdpl.aispkoldev.space';

    useEffect(() => {
        console.log('Cookies received:', cookies);
        console.log('Username received:', username);
        console.log('Redirect URL:', redirectUrl);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safe} edges={['top']}>
                <WebView
                    source={{ uri: redirectUrl }}
                    style={styles.webview}
                    bounces={false}
                    setCookies={[
                        {
                            name: 'token',
                            value: cookies.includes('token=') ? cookies.split('token=')[1].split(';')[0] : '',
                            domain: '.pdpl.aispkoldev.space',
                            path: '/',
                            secure: true,
                            httpOnly: true,
                        },
                        {
                            name: 'user',
                            value: cookies.includes('user=') ? cookies.split('user=')[1].split(';')[0] : '',
                            domain: '.pdpl.aispkoldev.space',
                            path: '/',
                            secure: true,
                            httpOnly: true,
                        },
                        {
                            name: 'role',
                            value: cookies.includes('role=') ? cookies.split('role=')[1].split(';')[0] : '',
                            domain: '.pdpl.aispkoldev.space',
                            path: '/',
                            secure: true,
                            httpOnly: true,
                        },
                        {
                            name: 'dept',
                            value: cookies.includes('dept=') ? cookies.split('dept=')[1].split(';')[0] : '',
                            domain: '.pdpl.aispkoldev.space',
                            path: '/',
                            secure: true,
                            httpOnly: true,
                        },
                        {
                            name: 'id',
                            value: cookies.includes('id=') ? cookies.split('id=')[1].split(';')[0] : '',
                            domain: '.pdpl.aispkoldev.space',
                            path: '/',
                            secure: true,
                            httpOnly: true,
                        },
                    ]}
                    startInLoadingState
                />
            </SafeAreaView>
        </View>
    );
}

export default africa

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    safe: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
})
