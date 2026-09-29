import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { logout } from '../../API/loginapi'

export default function Sites() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Sites</Text>
        <Text style={styles.subtitle}>Access your permitted locations</Text>

        <View style={styles.sitesContainer}>
          <TouchableOpacity
            style={[styles.siteCard, { borderLeftColor: '#7b2cbf' }]}
            onPress={() => router.push('/kolkata')}
          >
            <Text style={styles.siteIcon}>🏛️</Text>
            <View style={styles.siteTextContainer}>
              <Text style={styles.siteName}>Kolkata</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.siteCard, { borderLeftColor: '#e85d04' }]}
            onPress={() => router.push('/africa')}
          >
            <Text style={styles.siteIcon}>🌍</Text>
            <View style={styles.siteTextContainer}>
              <Text style={styles.siteName}>Africa</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.siteCard, { borderLeftColor: '#659a29' }]}
            onPress={() => router.push('/indore')}
          >
            <Text style={styles.siteIcon}>🤖</Text>
            <View style={styles.siteTextContainer}>
              <Text style={styles.siteName}>Indore</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 24,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 16,
    color: '#8892a4',
    marginBottom: 20,
  },
  sitesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  siteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  siteIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  siteTextContainer: {
    flex: 1,
  },
  siteName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutButtonText: {
    color: '#e85d04',
    fontSize: 16,
    fontWeight: '600',
  },
})
