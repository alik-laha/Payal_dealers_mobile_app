import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconBox from './IconBox'
import {
  cardShadow,
  CARD_BORDER,
  formatWithUnit,
  HAIRLINE,
  resolveBacklogValue,
  TEXT_FAINT,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TintKey,
} from './theme'

interface LotCardProps {
  label: string
  icon: any
  tint: TintKey
  currentLot: string
  vLot?: string
  backlogData: any[] | undefined
}

export default function LotCard({
  label,
  icon,
  tint,
  currentLot,
  vLot,
  backlogData,
}: LotCardProps) {
  const hasBacklog = Array.isArray(backlogData) && backlogData.length > 0
  const backlogNum = hasBacklog ? resolveBacklogValue(backlogData[0]) : null
  const backlogText = backlogNum === null ? '—' : formatWithUnit(backlogNum, 'Kg')
  const isZero = backlogNum !== null && backlogNum <= 0

  const backlogTint =
    backlogNum === null
      ? { bg: '#F2F4F7', fg: TEXT_MUTED }
      : isZero
        ? { bg: '#E9F7EC', fg: '#1E8E4E' }
        : { bg: '#FFF3E6', fg: '#C05621' }

  return (
    <View style={styles.lotCard}>
      {/* header */}
      <View style={styles.lotHeader}>
        <IconBox name={icon} tint={tint} size="sm" />
        <Text style={styles.lotTitle} numberOfLines={1}>
          {label}
        </Text>
      </View>

      {/* stacked fields */}
      <View style={styles.lotField}>
        <Text style={styles.lotCaption}>Latest Lot</Text>
        <Text style={styles.lotValue} numberOfLines={1}>
          {currentLot}
        </Text>
      </View>

      {vLot && vLot !== 'N/A' && (
        <View style={styles.lotField}>
          <Text style={styles.lotCaption}>V-Lot</Text>
          <Text style={styles.lotValue} numberOfLines={1}>
            {vLot}
          </Text>
        </View>
      )}

      {/* backlog footer */}
      <View style={[styles.backlogBox, { backgroundColor: backlogTint.bg }]}>
        <Text style={[styles.backlogCaption, { color: backlogTint.fg }]}>Backlog</Text>
        <Text style={[styles.backlogValue, { color: backlogTint.fg }]} numberOfLines={1}>
          {backlogText}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lotCard: {
    width: '48%',
    backgroundColor: '#FBFCFD',
    borderRadius: 16,
    padding: 12,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  lotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lotTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    marginLeft: 7,
  },
  lotField: {
    marginBottom: 9,
  },
  lotCaption: {
    fontSize: 10,
    fontWeight: '600',
    color: TEXT_FAINT,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  lotValue: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_SECONDARY,
  },
  backlogBox: {
    marginTop: 'auto',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  backlogCaption: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.75,
    marginBottom: 1,
  },
  backlogValue: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
})