import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import IconBox from './IconBox'
import {
  cardShadow,
  CARD_BORDER,
  formatNumber,
  GenericItem,
  HAIRLINE,
  ROW_BORDER,
  TEXT_FAINT,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TintKey,
  TINTS,
} from './theme'

interface OriginSectionProps {
  title: string
  icon: any
  tint: TintKey
  items: GenericItem[]
  unit?: string
  decimals?: number
  totalValue?: number
  totalLabel?: string
  showTotal?: boolean
  onPress: () => void
}

export default function OriginSection({
  title,
  icon,
  tint,
  items,
  unit = '',
  decimals = 2,
  totalValue,
  totalLabel = 'Total',
  showTotal = true,
  onPress,
}: OriginSectionProps) {
  const colors = TINTS[tint]

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={styles.section}>
      {/* section header */}
      <View style={styles.sectionHeaderRow}>
        <IconBox name={icon} tint={tint} size="sm" />
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.length > 0 && (
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>{items.length}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={16} color={TEXT_FAINT} style={{ marginLeft: 4 }} />
      </View>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>No data available</Text>
      ) : (
        <>
          {items.map((item, index) => (
            <View
              key={`${item.origin}-${index}`}
              style={[styles.dataRow, index === items.length - 1 && styles.dataRowLast]}
            >
              <View style={styles.dataLabelBox}>
                <View style={[styles.dataDot, { backgroundColor: colors.fg }]} />
                <Text style={styles.dataLabel} numberOfLines={1}>{item.origin || '—'}</Text>
              </View>
              <Text style={styles.dataValue} numberOfLines={1}>
                {formatNumber(item.value, decimals)}
                {unit ? <Text style={styles.dataUnit}> {unit}</Text> : null}
              </Text>
            </View>
          ))}

          {/* total strip — hidden for weighted-average sections */}
          {showTotal && totalValue !== undefined && (
            <View style={[styles.totalBox, { backgroundColor: colors.bg }]}>
              <Text style={[styles.totalLabel, { color: colors.fg }]}>{totalLabel}</Text>
              <Text style={[styles.totalValue, { color: colors.fg }]}>
                {formatNumber(totalValue, decimals)}
                {unit ? <Text style={[styles.totalUnit, { color: colors.fg }]}> {unit}</Text> : null}
              </Text>
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    marginLeft: 10,
    marginRight: 8,
  },
  countChip: {
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 24,
    alignItems: 'center',
  },
  countChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 0.3,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: ROW_BORDER,
  },
  dataRowLast: {
    borderBottomWidth: 0,
  },
  dataLabelBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  dataDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    opacity: 0.75,
  },
  dataLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_SECONDARY,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    textAlign: 'right',
  },
  dataUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_FAINT,
  },
  totalBox: {
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  totalUnit: {
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_FAINT,
    textAlign: 'center',
    paddingVertical: 14,
  },
})