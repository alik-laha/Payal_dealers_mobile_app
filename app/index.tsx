import { useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const index = () => {
  const router = useRouter()

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
        <Text style={styles.subtitle}>Select your origin to continue</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        {/* Africa Card */}
        <TouchableOpacity
          style={[styles.card, styles.africaCard]}
          activeOpacity={0.85}
          onPress={() => router.push('/africa')}
        >
          <Text style={styles.cardEmoji}>🌍</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Africa</Text>
            <Text style={styles.cardSubtitle}>ORIGIN</Text>
          </View>
          <View style={[styles.cardArrow, styles.africaArrow]}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Kolkata Card */}
        <TouchableOpacity
          style={[styles.card, styles.kolkataCard]}
          activeOpacity={0.85}
          onPress={() => router.push('/kolkata')}
        >
          <Text style={styles.cardEmoji}>🏛️</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Kolkata</Text>
            <Text style={styles.cardSubtitle}>ORIGIN</Text>
          </View>
          <View style={[styles.cardArrow, styles.kolkataArrow]}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Indore Card */}
        <TouchableOpacity
          style={[styles.card, styles.kolkataCard]}
          activeOpacity={0.85}
          onPress={() => router.push('/indore')}
        >
          <Text style={styles.cardEmoji}>🤖</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Indore</Text>
            <Text style={styles.cardSubtitle}>ORIGIN</Text>
          </View>
          <View style={[styles.cardArrow, styles.indoreArrow]}>
            <Text style={styles.arrowText}>→</Text>
          </View>
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
  // Decorative circles
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
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 50,
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
  // Cards
  cardContainer: {
    width: '100%',
    gap: 20,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  africaCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#e85d04',
  },
  kolkataCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#7b2cbf',
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#8892a4',
    letterSpacing: 3,
    marginTop: 4,
  },
  cardArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  africaArrow: {
    backgroundColor: 'rgba(232, 93, 4, 0.1)',
  },
  kolkataArrow: {
    backgroundColor: 'rgba(123, 44, 191, 0.1)',
  },
  indoreArrow:{
    backgroundColor: 'rgba(123, 148, 30, 0.1)',
  },
  arrowText: {
    fontSize: 22,
    color: '#1a1a2e',
    fontWeight: '700',
  },
  // Footer
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