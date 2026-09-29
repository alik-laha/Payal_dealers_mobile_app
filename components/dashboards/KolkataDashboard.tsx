import { StatusBar, StyleSheet, Text, View } from 'react-native'
// Expo:      import { Ionicons } from '@expo/vector-icons'
// Bare RN:   npm i react-native-vector-icons  (+ pod install on iOS)
import { Ionicons } from "@expo/vector-icons";
import { KolkataDataType } from '../../types/apiResponse.type'

/* ---------------------------------- theme ---------------------------------- */

type TintKey = 'blue' | 'orange' | 'teal' | 'violet' | 'red' | 'green'

const TINTS: Record<TintKey, { bg: string; fg: string }> = {
  blue:   { bg: '#EAF2FF', fg: '#2A628F' },
  orange: { bg: '#FFF3E6', fg: '#C05621' },
  teal:   { bg: '#E4F7F2', fg: '#0F9D8F' },
  violet: { bg: '#F1ECFE', fg: '#6D4FC2' },
  red:    { bg: '#FDECEC', fg: '#C43D3D' },
  green:  { bg: '#E9F7EC', fg: '#1E8E4E' },
}

const TEXT_PRIMARY = '#0B1526'
const TEXT_SECONDARY = '#334155'
const TEXT_MUTED = '#667085'
const TEXT_FAINT = '#98A2B3'
const CARD_BORDER = '#E5E8EC'
const HAIRLINE = StyleSheet.hairlineWidth

/* ------------------------------- lot config -------------------------------- */

const LOT_SECTIONS = [
  { key: 'boil',    label: 'Boiling',     icon: 'flame-outline',           tint: 'orange' },
  { key: 'scoop',   label: 'Scooping',    icon: 'basket-outline',          tint: 'blue' },
  { key: 'borma',   label: 'Borma',       icon: 'thermometer-outline',     tint: 'red' },
  { key: 'humid',   label: 'Humidifier',  icon: 'water-outline',           tint: 'teal' },
  { key: 'peel',    label: 'Peeling',     icon: 'cut-outline',             tint: 'green' },
  { key: 'Mayur',   label: 'Mayur',       icon: 'flower-outline',          tint: 'violet' },
  { key: 'hamsa',   label: 'Hamsa',       icon: 'diamond-outline',         tint: 'teal' },
  { key: 'wholes',  label: 'Wholes',      icon: 'cube-outline',            tint: 'blue' },
  { key: 'lw',      label: 'LW',          icon: 'document-text-outline',   tint: 'violet' },
  { key: 'dpds',    label: 'DPDS',        icon: 'business-outline',        tint: 'blue' },
  { key: 'sorting', label: 'Sorting',     icon: 'funnel-outline',          tint: 'teal' },
  { key: 'bigT',    label: 'Taiho',       icon: 'pricetag-outline',        tint: 'orange' },
  { key: 'vil',     label: 'Village',     icon: 'home-outline',            tint: 'green' },
  { key: 'rej',     label: 'Rejection',   icon: 'close-circle-outline',    tint: 'red' },
] as const

type LotKey = typeof LOT_SECTIONS[number]['key']

type LotSection = {
  lotKey: keyof KolkataDataType
  vLotKey?: keyof KolkataDataType
  backlogKey: keyof KolkataDataType
}

const LOT_DATA: Record<LotKey, LotSection> = {
  boil:    { lotKey: 'latestLotboil',                                  backlogKey: 'backlogMayurdata' },
  scoop:   { lotKey: 'latestLotscoop',   vLotKey: 'latestvLotscoop',   backlogKey: 'backlogscoopdata' },
  borma:   { lotKey: 'latestLotborma',   vLotKey: 'latestvLotborma',   backlogKey: 'backlogbormadata' },
  humid:   { lotKey: 'latestLothumid',   vLotKey: 'latestvLothumid',   backlogKey: 'backloghumiddata' },
  peel:    { lotKey: 'latestLotpeel',    vLotKey: 'latestvLotpeel',    backlogKey: 'backlogpeeldata' },
  Mayur:   { lotKey: 'latestLotMayur',   vLotKey: 'latestVLotMayur',   backlogKey: 'backlogMayurdata' },
  hamsa:   { lotKey: 'latestLothamsa',   vLotKey: 'latestVLothamsa',   backlogKey: 'backloghamsadata' },
  wholes:  { lotKey: 'latestLotwholes',  vLotKey: 'latestvLotwholes',  backlogKey: 'backlogwholesdata' },
  lw:      { lotKey: 'latestLotlw',      vLotKey: 'latestvLotlw',      backlogKey: 'backloglwdata' },
  dpds:    { lotKey: 'latestLotdpds',    vLotKey: 'latestvLotdpds',    backlogKey: 'backlogdpdsdata' },
  sorting: { lotKey: 'latestLotsorting', vLotKey: 'latestvLotsorting', backlogKey: 'backlogsortingdata' },
  bigT:    { lotKey: 'latestLotbigT',    vLotKey: 'latestvLotbigT',    backlogKey: 'backlogbigTdata' },
  vil:     { lotKey: 'latestLotvil',     vLotKey: 'latestvLotvil',     backlogKey: 'backlogvildata' },
  rej:     { lotKey: 'latestLotrej',     vLotKey: 'latestvLotrej',     backlogKey: 'backlogrejdata' },
}

/* --------------------------------- helpers --------------------------------- */

function safe<T>(value: T | undefined | null, fallback: T): T {
  return value !== undefined && value !== null ? value : fallback
}

function formatNumber(num: number | string, decimals: number = 2): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(n)) return '0'
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function formatWithUnit(num: number | string, unit: string, decimals: number = 2): string {
  return `${formatNumber(num, decimals)} ${unit}`
}

/**
 * Generic backlog resolver.
 * - Shape 1: { current_backlog }
 * - Shape 2: { current_backlog1, current_backlog2 } (summed, null = 0)
 */
function resolveBacklogValue(item: any): number {
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

/* -------------------------------- component -------------------------------- */

interface Props {
  data: KolkataDataType
}

export default function KolkataDashboard({ data }: Props) {
  const totalReceiving = parseFloat(safe(data.fyReceivingTotal?.Total_Receiving, '0')) / 1000
  const totalBoiling = safe(data.currentYearBoiling, 0) / 1000
  const avgMoistureGain = parseFloat(safe(data.fyResultHumid?.total, '0'))
  const avgBormaLoss = parseFloat(safe(data.fyResultBorma?.total, '0'))
  const villageIn = parseFloat(safe(data.Ville_Inside_gatepass?.Village_In, '0')) / 1000
  const villageOutGate = safe(data.village_out_gate, 0) / 1000
  const villageOutProd = safe(data.village_out_prod, 0) / 1000
  const pendingVillage = safe(data.village_pending, 0) / 1000

  const stats = [
    { icon: 'people-outline',        tint: 'blue' as TintKey,   value: String(safe(data.usercount, 0)),     label: 'Active Users' },
    { icon: 'briefcase-outline',     tint: 'orange' as TintKey, value: String(safe(data.employeecount, 0)), label: 'Employees' },
    { icon: 'time-outline',          tint: 'teal' as TintKey,   value: String(safe(data.pendingGatepass, 0)), label: 'Pending Gate' },
  ]

  const reportRows: { icon: string; tint: TintKey; label: string; value: number; unit: string }[] = [
    { icon: 'download-outline',          tint: 'blue',   label: 'Total RCN Receiving',       value: totalReceiving,   unit: 'Ton' },
    { icon: 'flame-outline',             tint: 'orange', label: 'Total Boiling',             value: totalBoiling,     unit: 'Ton' },
    { icon: 'water-outline',             tint: 'teal',   label: 'Avg Moisture Gain',         value: avgMoistureGain,  unit: '%' },
    { icon: 'trending-down-outline',     tint: 'red',    label: 'Avg Borma Loss',            value: avgBormaLoss,     unit: '%' },
    { icon: 'arrow-down-circle-outline', tint: 'green',  label: 'Village In (Gatepass)',     value: villageIn,        unit: 'Ton' },
    { icon: 'arrow-up-circle-outline',   tint: 'blue',   label: 'Village Out (Gatepass)',    value: villageOutGate,   unit: 'Ton' },
    { icon: 'business-outline',          tint: 'violet', label: 'Village Out (Prod)',        value: villageOutProd,   unit: 'Ton' },
    { icon: 'hourglass-outline',         tint: 'orange', label: 'Pending Village (Outside)', value: pendingVillage,   unit: 'Ton' },
  ]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />

      {/* ------------------------------ page header ----------------------------- */}
      <Text style={styles.pageTitle}>Kolkata Dashboard</Text>
      <Text style={styles.pageSubtitle}>Real-time operations overview</Text>

      {/* ------------------------------ stats row ------------------------------- */}
      <View style={styles.statsRow}>
        {stats.map((s) => {
          const tint = TINTS[s.tint]
          return (
            <View key={s.label} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: tint.bg }]}>
                <Ionicons name={s.icon as any} size={17} color={tint.fg} />
              </View>
              <Text style={styles.statValue} numberOfLines={1}>
                {s.value}
              </Text>
              <Text style={styles.statLabel} numberOfLines={1}>
                {s.label}
              </Text>
            </View>
          )
        })}
      </View>

      {/* --------------------------- FY overall report -------------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current FY 2026-27 Overall Report</Text>

        {reportRows.map((row, i) => {
          const tint = TINTS[row.tint]
          const isLast = i === reportRows.length - 1
          return (
            <View key={row.label} style={[styles.reportRow, isLast && styles.reportRowLast]}>
              <View style={[styles.reportIcon, { backgroundColor: tint.bg }]}>
                <Ionicons name={row.icon as any} size={15} color={tint.fg} />
              </View>
              <Text style={styles.reportLabel} numberOfLines={1}>
                {row.label}
              </Text>
              <Text style={styles.reportValue}>{formatNumber(row.value)}</Text>
              <Text style={styles.reportUnit}>{row.unit}</Text>
            </View>
          )
        })}
      </View>

      {/* ---------------------------- lot & backlog ----------------------------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Current Lot & Backlog</Text>
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>{LOT_SECTIONS.length} Lines</Text>
          </View>
        </View>

        <View style={styles.lotGrid}>
          {LOT_SECTIONS.map((section) => {
            const l = LOT_DATA[section.key]
            const tint = TINTS[section.tint]

            const currentLot = safe(data[l.lotKey] as { LotNo: string }, { LotNo: 'N/A' })
            const currentVLot = l.vLotKey
              ? safe(data[l.vLotKey] as { LotNo: string }, { LotNo: 'N/A' })
              : null

            /* generic backlog resolution */
            const backlogData = data[l.backlogKey] as any[] | undefined
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
              <View key={section.key} style={styles.lotCard}>
                {/* header */}
                <View style={styles.lotHeader}>
                  <View style={[styles.lotIcon, { backgroundColor: tint.bg }]}>
                    <Ionicons name={section.icon as any} size={14} color={tint.fg} />
                  </View>
                  <Text style={styles.lotTitle} numberOfLines={1}>
                    {section.label}
                  </Text>
                </View>

                {/* stacked fields — no label/value crowding */}
                <View style={styles.lotField}>
                  <Text style={styles.lotCaption}>Latest Lot</Text>
                  <Text style={styles.lotValue} numberOfLines={1}>
                    {currentLot.LotNo}
                  </Text>
                </View>

                {currentVLot && currentVLot.LotNo !== 'N/A' && (
                  <View style={styles.lotField}>
                    <Text style={styles.lotCaption}>V-Lot</Text>
                    <Text style={styles.lotValue} numberOfLines={1}>
                      {currentVLot.LotNo}
                    </Text>
                  </View>
                )}

                {/* backlog pinned to card bottom */}
                <View style={[styles.backlogBox, { backgroundColor: backlogTint.bg }]}>
                  <Text style={[styles.backlogCaption, { color: backlogTint.fg }]}>Backlog</Text>
                  <Text style={[styles.backlogValue, { color: backlogTint.fg }]} numberOfLines={1}>
                    {backlogText}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

/* ---------------------------------- styles --------------------------------- */

const cardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* header */
  pageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.6,
    marginBottom: 2,
  },
  pageSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginBottom: 20,
  },

  /* stats */
  statsRow: {
    flexDirection: 'row',
    columnGap: 10,
    marginBottom: 16,
  },
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
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
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

  /* sections */
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    marginBottom: 6,
    flexShrink: 1,
  },
  countChip: {
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  countChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },

  /* report rows */
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
  reportIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  reportLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_SECONDARY,
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
    width: 26,
  },

  /* lot grid */
  lotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  lotCard: {
    width: '48%',
    backgroundColor: '#FBFCFD',
    borderRadius: 16,
    padding: 12,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
  },
  lotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lotIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  lotTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  liveWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#16A34A',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  /* stacked lot fields (fixes congestion) */
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

  /* backlog footer */
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