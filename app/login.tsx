import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { loginApi } from '../API/loginapi'
import { getPermissions } from '../API/loginapi'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("JWT_KEY")
      if (token) {
        const permissions = await getPermissions()
        if (permissions.length > 0) {
          router.push('/(tabs)')
        }
      }
    }
    checkLogin()
  }, [])

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      return
    }
    setLoading(true)
    const success = await loginApi(username, password)
    if (success) {
      router.push('/(tabs)')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>🌍</Text>
        <Text style={styles.title}>PDPL Connect</Text>
        <Text style={styles.subtitle}>Sign in to access your portal</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#8892a4"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8892a4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>PDPL</Text>
          <View style={styles.divider} />
        </View>
        <Text style={styles.footerText}>Powered by AISP Devs</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8892a4',
  },
  form: {
    gap: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  loginButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dividerText: {
    color: '#8892a4',
    marginHorizontal: 12,
    fontSize: 12,
    letterSpacing: 4,
  },
  footerText: {
    color: '#a0aab8',
    fontSize: 12,
    letterSpacing: 1,
  },
})
