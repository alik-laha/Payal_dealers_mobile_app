import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { formatNumber, HAIRLINE, TEXT_FAINT, TEXT_PRIMARY, TEXT_SECONDARY } from './theme'

export interface CompareRow {
  label: string
  prev: number
  week: number
  month: number
}

interface CompareTableProps {
  rows: CompareRow[]
  decimals?: number
}

const HEADERS = ['Previous Day', 'Current Week', 'Current Month']
const HEADER_HEIGHT = 26
const ROW_HEIGHT = 40
const LABEL_WIDTH = 100
const COLUMN_WIDTH = 100

export default function CompareTable({ rows, decimals = 2 }: CompareTableProps) {
  return (
    <View style={styles.container}>
      {/* Fixed label column */}
      <View style={styles.fixedColumn}>
        <View style={styles.fixedHeader} />
        {rows.map((row, index) => (
          <View
            key={row.label}
            style={[styles.fixedRow, index === rows.length - 1 && styles.rowLast]}
          >
            <Text style={styles.label} numberOfLines={1}>
              {row.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Scrollable value columns */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          <View style={styles.headerRow}>
            {HEADERS.map((header) => (
              <Text key={header} style={styles.headerText} numberOfLines={1}>
                {header}
              </Text>
            ))}
          </View>

          {rows.map((row, index) => (
            <View key={row.label} style={[styles.row, index === rows.length - 1 && styles.rowLast]}>
              <Text style={styles.value} numberOfLines={1}>
                {formatNumber(row.prev, decimals)}
              </Text>
              <Text style={styles.value} numberOfLines={1}>
                {formatNumber(row.week, decimals)}
              </Text>
              <Text style={styles.value} numberOfLines={1}>
                {formatNumber(row.month, decimals)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fixedColumn: {
    width: LABEL_WIDTH,
    paddingRight: 8,
    borderRightWidth: HAIRLINE,
    borderRightColor: '#EEF1F4',
  },
  fixedHeader: {
    height: HEADER_HEIGHT,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#EEF1F4',
  },
  fixedRow: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#EEF1F4',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingLeft: 12,
    paddingRight: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#EEF1F4',
  },
  headerText: {
    width: COLUMN_WIDTH,
    textAlign: 'right',
    fontSize: 9,
    fontWeight: '700',
    color: TEXT_FAINT,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#EEF1F4',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_SECONDARY,
  },
  value: {
    width: COLUMN_WIDTH,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
})
