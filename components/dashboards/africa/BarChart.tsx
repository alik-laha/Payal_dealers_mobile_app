import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { formatNumber, GenericItem, TEXT_FAINT, TEXT_PRIMARY, TEXT_SECONDARY, TINTS, TintKey } from './theme'

interface BarChartProps {
  items: GenericItem[]
  tint: TintKey
  unit: string
  decimals?: number
  showTotal?: boolean
}

export default function BarChart({
  items,
  tint,
  unit,
  decimals = 2,
  showTotal = true,
}: BarChartProps) {
  const colors = TINTS[tint]
  const max = Math.max(...items.map((i) => i.value), 1)
  const sorted = [...items].sort((a, b) => b.value - a.value)
  const total = sorted.reduce((s, i) => s + i.value, 0)

  return (
    <View style={styles.chartContainer}>
      {sorted.map((item, i) => {
        const pct = (item.value / max) * 100
        return (
          <View key={`${item.origin}-${i}`} style={styles.barRow}>
            <Text style={styles.barLabel} numberOfLines={1}>
              {item.origin || '—'}
            </Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${pct}%`, backgroundColor: colors.fg },
                ]}
              />
            </View>
            <Text style={styles.barValue} numberOfLines={1}>
              {formatNumber(item.value, decimals)}
              <Text style={styles.barUnit}> {unit}</Text>
            </Text>
          </View>
        )
      })}

      {showTotal && (
        <View style={[styles.chartTotal, { backgroundColor: colors.bg }]}>
          <Text style={[styles.chartTotalLabel, { color: colors.fg }]}>Total</Text>
          <Text style={[styles.chartTotalValue, { color: colors.fg }]}>
            {formatNumber(total, decimals)} {unit}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  barLabel: {
    width: 90,
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    paddingRight: 8,
  },
  barTrack: {
    flex: 1,
    height: 22,
    backgroundColor: '#F2F4F7',
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  barValue: {
    width: 90,
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    textAlign: 'right',
  },
  barUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_FAINT,
  },
  chartTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chartTotalLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  chartTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
})