import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function Index() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Important: disable bottom safe area */}
            <SafeAreaView style={styles.safe} edges={['top']}>
                <WebView
                    source={{ uri: 'https://preciousalloys-uat.frappe.cloud/hrms/' }}
                    style={styles.webview}
                    bounces={false}
                    startInLoadingState
                />
            </SafeAreaView>
        </View>
    );
}

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
});