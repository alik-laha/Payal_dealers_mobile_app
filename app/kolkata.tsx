import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import CookieManager from 'react-native-nitro-cookies';

const kolkata = () => {
  const params = useLocalSearchParams();

  const cookies = (params.cookies as string) || '';
  const username = (params.username as string) || '';

  const redirectUrl =
    (params.redirectUrl as string) ||
    'https://system.payaldealers.in';

  const [cookiesReady, setCookiesReady] = useState(false);

  useEffect(() => {
    const setupCookies = async () => {
      try {
        console.log('Cookies received:', cookies);
        console.log('Username received:', username);
        console.log('Redirect URL:', redirectUrl);

        // Extract cookie values
        const getCookieValue = (name: string) => {
          const match = cookies
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(`${name}=`));

          return match ? match.substring(name.length + 1) : '';
        };

        const token = getCookieValue('token');
        const user = getCookieValue('user');
        const role = getCookieValue('role');
        const dept = getCookieValue('dept');
        const id = getCookieValue('id');

        const cookieDomain = 'https://system.payaldealers.in';

        if (token) {
          await CookieManager.set(cookieDomain, {
            name: 'token',
            value: token,
            domain: 'system.payaldealers.in',
            path: '/',
            secure: true,
            httpOnly: true,
          });
        }

        if (user) {
          await CookieManager.set(cookieDomain, {
            name: 'user',
            value: user,
            domain: 'system.payaldealers.in',
            path: '/',
            secure: true,
            httpOnly: true,
          });
        }

        if (role) {
          await CookieManager.set(cookieDomain, {
            name: 'role',
            value: role,
            domain: 'system.payaldealers.in',
            path: '/',
            secure: true,
            httpOnly: true,
          });
        }

        if (dept) {
          await CookieManager.set(cookieDomain, {
            name: 'dept',
            value: dept,
            domain: 'system.payaldealers.in',
            path: '/',
            secure: true,
            httpOnly: true,
          });
        }

        if (id) {
          await CookieManager.set(cookieDomain, {
            name: 'id',
            value: id,
            domain: 'system.payaldealers.in',
            path: '/',
            secure: true,
            httpOnly: true,
          });
        }

        // Verify cookies
        const storedCookies = await CookieManager.get(cookieDomain);

        console.log('Cookies stored:', storedCookies);

        // Only now allow WebView to render
        setCookiesReady(true);

      } catch (error) {
        console.error('Cookie setup error:', error);
      }
    };

    setupCookies();
  }, [cookies]);

  if (!cookiesReady) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />

        <SafeAreaView style={styles.safe}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <WebView
          source={{ uri: redirectUrl }}
          style={styles.webview}
          bounces={false}
          startInLoadingState
          sharedCookiesEnabled
        />
      </SafeAreaView>
    </View>
  );
};

export default kolkata;

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