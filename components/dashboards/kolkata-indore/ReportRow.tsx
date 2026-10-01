import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconBox from './IconBox'
import {
  formatNumber,
  HAIRLINE,
  TEXT_FAINT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TintKey,
} from './theme'

interface ReportRowProps {
  icon: any
  tint: TintKey
  label: string
  value: number
  unit: string
  isLast?: boolean
}

export default function ReportRow({ icon, tint, label, value, unit, isLast }: ReportRowProps) {
  return (
    <View style={[styles.reportRow, isLast && styles.reportRowLast]}>
      <IconBox name={icon} tint={tint} size="sm" />
      <Text style={styles.reportLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.reportValue}>{formatNumber(value)}</Text>
      <Text style={styles.reportUnit}>{unit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#EEF1F4',
  },
  reportRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  reportLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_SECONDARY,
    marginLeft: 10,
  },
  reportValue: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  reportUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_FAINT,
    marginLeft: 4,
    width: 32,
  },
})