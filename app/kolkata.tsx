import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const kolkata = () => {
    const [username, setUsername] = useState("");
    let injectedJs = `
        (function(){
            const usernameComp = document.getElementById('username');
            
            if("${username}"){
                usernameComp.value = "${username}";
            }
            console.log("ok")
            usernameComp.addEventListener('input',(e)=>{
                window.ReactNativeWebView.postMessage(e.target.value);
            });
            true;
        })()`

    const handleMessage = async (event: any) => {
        setUsername(event.nativeEvent.data)
        console.log(event.nativeEvent.data);
        
        await AsyncStorage.setItem('username-kolkata', event.nativeEvent.data);
    };

    const getUsername = async () => {
        const value = await AsyncStorage.getItem('username-kolkata');
        setUsername(value || "");
    }

    useEffect(() => {
        getUsername();
    },[])

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safe} edges={['top']}>
                <WebView
                    source={{ uri: 'https://system.payaldealers.in' }}
                    style={styles.webview}
                    bounces={false}
                    injectedJavaScript={injectedJs}
                    onMessage={handleMessage}
                    startInLoadingState
                />
            </SafeAreaView>
        </View>
    );
}

export default kolkata

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