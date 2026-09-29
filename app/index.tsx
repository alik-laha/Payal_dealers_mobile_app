import { Redirect } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPermissions } from '../API/loginapi'

export default function Root() {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("JWT_KEY")
      if (token) {
        const permissions = await getPermissions()
        if (permissions.length > 0) {
          setLoading(false)
          return
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1a1a2e" />
      </View>
    )
  }

  return <Redirect href="/login" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
})
