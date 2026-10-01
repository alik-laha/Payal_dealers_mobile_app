import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconBox from './IconBox'
import {
  cardShadow,
  CARD_BORDER,
  HAIRLINE,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TintKey,
} from './theme'

interface StatCardProps {
  icon: any
  tint: TintKey
  value: string
  label: string
}

export default function StatCard({ icon, tint, value, label }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <IconBox name={icon} tint={tint} size="md" />
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: TEXT_MUTED,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginTop: 3,
    textAlign: 'center',
  },
})