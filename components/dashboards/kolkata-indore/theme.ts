import { StyleSheet } from 'react-native'

export type TintKey = 'blue' | 'orange' | 'teal' | 'violet' | 'red' | 'green'

export const TINTS: Record<TintKey, { bg: string; fg: string }> = {
  blue:   { bg: '#EAF2FF', fg: '#2A628F' },
  orange: { bg: '#FFF3E6', fg: '#C05621' },
  teal:   { bg: '#E4F7F2', fg: '#0F9D8F' },
  violet: { bg: '#F1ECFE', fg: '#6D4FC2' },
  red:    { bg: '#FDECEC', fg: '#C43D3D' },
  green:  { bg: '#E9F7EC', fg: '#1E8E4E' },
}

export const TEXT_PRIMARY = '#0B1526'
export const TEXT_SECONDARY = '#334155'
export const TEXT_MUTED = '#667085'
export const TEXT_FAINT = '#98A2B3'
export const CARD_BORDER = '#E5E8EC'
export const HAIRLINE = StyleSheet.hairlineWidth

export const cardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2,
}

export function safe<T>(value: T | undefined | null, fallback: T): T {
  return value !== undefined && value !== null ? value : fallback
}

export function formatNumber(num: number | string, decimals: number = 2): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(n)) return '0'
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatWithUnit(num: number | string, unit: string, decimals: number = 2): string {
  return `${formatNumber(num, decimals)} ${unit}`
}

export function resolveBacklogValue(item: any): number {
  if (item == null) return 0

  if (item.current_backlog !== undefined && item.current_backlog !== null) {
    const v = parseFloat(item.current_backlog)
    return isNaN(v) ? 0 : v
  }

  const b1 =
    item.current_backlog1 !== undefined && item.current_backlog1 !== null
      ? parseFloat(item.current_backlog1)
      : 0
  const b2 =
    item.current_backlog2 !== undefined && item.current_backlog2 !== null
      ? parseFloat(item.current_backlog2)
      : 0

  return (isNaN(b1) ? 0 : b1) + (isNaN(b2) ? 0 : b2)
}