import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { apiConfig } from '../constants/apiConfig'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

const index = () => {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = React.useState(apiConfig[0])
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(selectedPlatform.loginApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password,
        }),
      })

      // console.log('Login Response Status:', response.status)
      console.log('Login Response Headers:', Object.fromEntries(response.headers))
      // console.log('Login Response Cookies:', response.headers.get('Set-Cookie'))
      
      const cookiesHeader = response.headers.get('Set-Cookie')
      console.log('Login Response Cookies:', cookiesHeader)
      
      const responseText = await response.text()
      console.log('Login Response Text:', responseText)
      
      const data = JSON.parse(responseText)
      console.log('Login Response Body:', data)
      
      if (response.status === 200 || response.status === 201) {
        const cookies = cookiesHeader?.split(',') || []
        const cookiesString = cookies.map((c: string) => c.trim()).join('; ')
        console.log('Cookies string for WebView:', cookiesString)
        
        Alert.alert('Login Successful', 'Redirecting to dashboard...')
        router.push({
          pathname: '/kolkata',
          params: {
            cookies: cookiesString,
            username,
            platform: selectedPlatform.name,
            redirectUrl: selectedPlatform.redirectUrl,
          },
        })
      } else {
        Alert.alert('Login Error', data.message || 'Login failed')
      }
    } catch (error) {
      console.log('Login Error:', error)
      Alert.alert('Error', 'Login failed. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌍</Text>
        <Text style={styles.title}>PDPL Connect</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      {/* Platform Selection */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Platform</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPlatform.name}
            onValueChange={(itemValue) => {
              const platform = apiConfig.find((p) => p.name === itemValue)
              if (platform) setSelectedPlatform(platform)
            }}
            style={styles.picker}
          >
            {apiConfig.map((platform) => (
              <Picker.Item key={platform.name} label={platform.name} value={platform.name} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#8892a4"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#8892a4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
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

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -80,
    right: -60,
    backgroundColor: '#e85d04',
    opacity: 0.06,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 100,
    left: -70,
    backgroundColor: '#7b2cbf',
    opacity: 0.06,
  },
  circle3: {
    width: 150,
    height: 150,
    bottom: -30,
    right: -30,
    backgroundColor: '#3a86ff',
    opacity: 0.06,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  loginButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    marginTop: 50,
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
