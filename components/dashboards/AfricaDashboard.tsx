import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'

export default function AfricaDashboard() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🌍 Africa Dashboard</Text>
        <Text style={styles.subtitle}>Operations Overview</Text>
        <Text style={styles.placeholder}>Africa dashboard coming soon...</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 16,
    color: '#8892a4',
    marginTop: 8,
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#8892a4',
  },
})
