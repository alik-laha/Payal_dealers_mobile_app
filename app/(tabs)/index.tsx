import { useState } from 'react';
import { Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AfricaDashboard from '../../components/dashboards/AfricaDashboard';
import IndoreDashboard from '../../components/dashboards/IndoreDashboard';
import KolkataDashboard from '../../components/dashboards/KolkataDashboard';

const DEFAULT_DATA: any = {
  backlogMayurdata: [{ current_backlog: '4809.00' }],
  latestLotMayur: { LotNo: '2026-161' },
  latestVLotMayur: { LotNo: '2026-V170' },
  latestLothamsa: { LotNo: '2026-161' },
  latestVLothamsa: { LotNo: '2026-V170' },
  backloghamsadata: [{ current_backlog: '1162.00' }],
  latestLotdpds: { LotNo: '2026-158' },
  latestvLotdpds: { LotNo: '2026-V161' },
  backlogdpdsdata: [{ current_backlog: '1087.00' }],
  latestLotsorting: { LotNo: '2026-160' },
  latestvLotsorting: { LotNo: '2026-V163' },
  backlogsortingdata: [{ current_backlog: '0.00' }],
  latestLotwholes: { LotNo: '2026-158' },
  latestvLotwholes: { LotNo: '2026-V166' },
  backlogwholesdata: [{ current_backlog: '9627.00' }],
  latestLotlw: { LotNo: '2026-155' },
  latestvLotlw: { LotNo: '2026-V163' },
  backloglwdata: [{ current_backlog: '12568.00' }],
  latestLotbigT: { LotNo: '2026-160' },
  latestvLotbigT: { LotNo: '2026-V163' },
  backlogbigTdata: [{ current_backlog: '12866.00' }],
  latestLotvil: { LotNo: '2026-158' },
  latestvLotvil: { LotNo: '2026-V169' },
  backlogvildata: [{ current_backlog: '6907.00' }],
  latestLotrej: { LotNo: '2026-159' },
  latestvLotrej: { LotNo: '2026-V164' },
  backlogrejdata: [{ current_backlog: '1087.00' }],
  latestLotpeel: { LotNo: '2026-161' },
  latestvLotpeel: { LotNo: '2026-V170' },
  backlogpeeldata: [{ current_backlog: '10471.00' }],
  latestLotborma: { LotNo: '2026-163' },
  latestvLotborma: { LotNo: '2026-V163' },
  backlogbormadata: [{ current_backlog1: null, current_backlog2: null }],
  latestLothumid: { LotNo: '2026-162' },
  latestvLothumid: { LotNo: '2026-V162' },
  backloghumiddata: [{ current_backlog: '7925.00' }],
  latestLotscoop: { LotNo: '2026-163' },
  backlogscoopdata: [{ current_backlog1: '3292.50', current_backlog2: '51795.00' }],
  latestLotboil: { LotNo: '2026-165' },
  usercount: 34,
  employeecount: 35,
  pendingGatepass: 764,
  village_pending: 4265,
  village_pending_in: 1224,
  fyReceivingTotal: { Total_Receiving: '4799760' },
  village_out_gate: 268702,
  village_out_prod: 264437,
  Ville_Inside_gatepass: { Village_In: '267478.00' },
  previousBoiling: 25233,
  previousBorma: 6.71,
  previousHumid: 4.36,
  previousGate: 9,
  previousBormalab: 0,
  previousBoilingDate: '2026-09-28T00:00:00.000Z',
  previousBormaDate: '2026-09-28T00:00:00.000Z',
  previousHumidDate: '2026-09-28T00:00:00.000Z',
  previousGateDate: '2026-09-28T00:00:00.000Z',
  currentWeekBoil: 25233,
  currentWeekBorma: 6.71,
  currentWeekBormaLab: 0,
  currentWeekHumid: 4.075,
  weekResultGate: 26,
  currentMonthBoiling: 741414,
  currentMonthBorma: 6.931154,
  currentMonthBormaLab: 6.82125,
  currentMonthHumid: 3.532593,
  monthResultGate: 176,
  customBoiling: 0,
  customBorma: 0,
  customBormalab: 0,
  customHumid: 0,
  customGate: 0,
  currentYearBoiling: 4191810,
  fyResultBorma: { total: '6.387134' },
  fyResultHumid: { total: '3.345636' },
  previousscoopDate: '2026-09-28T00:00:00.000Z',
  previouswholesprcntg: 24.7616707472964,
  previousbrokenprcntg: 0.08804799639617504,
  previousuncutprcntg: 0.8263640857780548,
  previousnoncutprcntg: 8.804799639617503,
  previousunscoopprcntg: 0,
  previousdustprcntg: 0.13953121023579898,
  previousrejectionprcntg: 0,
  previouskor: 48.53,
  previouskorlab: 0,
  monthlyBrokenAvg: 0.20466387981632972,
  monthlyDustAvg: 0.1455112300698666,
  monthlyNoncutAvg: 3.015869974562935,
  monthlyUnscoopAvg: 0.6030493599688687,
  monthlyUncutAvg: 1.4161327947205535,
  monthlyKORAvg: 50.35076923076922,
  monthlyKORAvglab: 46.17038461538463,
  weeklyBrokenAvg: 0.08804799639617504,
  weeklyDustAvg: 0.13953121023579898,
  weeklyNoncutAvg: 8.804799639617503,
  weeklyUnscoopAvg: 0,
  weeklyUncutAvg: 0.8263640857780548,
  weeklyKORAvg: 48.53,
  weeklyKORLabAvg: 0,
  customBrokenAvg: 0,
  customDustAvg: 0,
  customNoncutAvg: 0,
  customUnscoopAvg: 0,
  customUncutAvg: 0,
  customKORAvg: 0,
  customKORAvglab: 0,
  customBroken: 0,
  customUnpeel: 0,
  customChura: 0,
  currentMonthBroken: 0,
  currentMonthUnpeel: 0,
  currentMonthChura: 0,
  currentWeekBroken: 0,
  currentWeekUnpeel: 0,
  currentWeekChura: 0,
  previousBroken: 0,
  previousChura: 0,
  previousUnpeel: 0,
  previousPeelDate: '2026-09-28T00:00:00.000Z',
}

/* ---------------------------------- theme ---------------------------------- */

type TintKey = 'blue' | 'orange' | 'teal'

const TINTS: Record<TintKey, { bg: string; fg: string }> = {
  blue:   { bg: '#EAF2FF', fg: '#2A628F' },
  orange: { bg: '#FFF3E6', fg: '#C05621' },
  teal:   { bg: '#E4F7F2', fg: '#0F9D8F' },
}

const TEXT_PRIMARY = '#0B1526'
const TEXT_SECONDARY = '#334155'
const TEXT_MUTED = '#667085'
const TEXT_FAINT = '#98A2B3'
const CARD_BORDER = '#E5E8EC'
const HAIRLINE = StyleSheet.hairlineWidth

/* ------------------------------- site config ------------------------------- */

const SITE_OPTIONS = [
  { key: 'kolkata', name: 'Kolkata', letter: 'K', tint: 'blue' as TintKey, subtitle: 'West Bengal Plant' },
  { key: 'indore',  name: 'Indore',  letter: 'I', tint: 'orange' as TintKey, subtitle: 'Madhya Pradesh Plant' },
  { key: 'africa',  name: 'Africa',  letter: 'A', tint: 'teal' as TintKey, subtitle: 'International Operations' },
] as const

type SiteKey = (typeof SITE_OPTIONS)[number]['key']

/* ------------------------------ icon component ----------------------------- */

function IconBox({ letter, tint, size = 'md' }: { letter: string; tint: TintKey; size?: 'sm' | 'md' }) {
  const colors = TINTS[tint]
  const isSmall = size === 'sm'
  return (
    <View
      style={[
        styles.iconBox,
        { backgroundColor: colors.bg },
        isSmall ? styles.iconBoxSm : styles.iconBoxMd,
      ]}
    >
      <Text
        style={[
          styles.iconLetter,
          { color: colors.fg },
          isSmall ? styles.iconLetterSm : styles.iconLetterMd,
        ]}
      >
        {letter}
      </Text>
    </View>
  )
}

/* -------------------------------- component -------------------------------- */

export default function Dashboard() {
  const insets = useSafeAreaInsets()
  const [selectedSite, setSelectedSite] = useState<SiteKey>('kolkata')
  const [showSelector, setShowSelector] = useState(false)

  const currentSite = SITE_OPTIONS.find(s => s.key === selectedSite)!

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity 
          style={styles.selector} 
          onPress={() => setShowSelector(true)}
          activeOpacity={0.7}
        >
          <IconBox letter={currentSite.letter} tint={currentSite.tint} size="sm" />
          <Text style={styles.selectorText}>{currentSite.name}</Text>
          <Text style={styles.chevron}>▾</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#F5F6F8' }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {selectedSite === 'kolkata' && <KolkataDashboard data={DEFAULT_DATA} />}
        {selectedSite === 'indore' && <IndoreDashboard />}
        {selectedSite === 'africa' && <AfricaDashboard />}
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <Modal animationType="slide" transparent visible={showSelector} onRequestClose={() => setShowSelector(false)}>
        <View style={styles.modalOverlay}>
          {/* Tapping the dimmed background closes the modal */}
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={() => setShowSelector(false)} 
          />
          
          <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Select Site</Text>
            
            <View style={styles.siteList}>
              {SITE_OPTIONS.map((site) => {
                const isSelected = selectedSite === site.key;
                return (
                  <TouchableOpacity
                    key={site.key}
                    style={[styles.siteOption, isSelected && styles.siteOptionSelected]}
                    onPress={() => {
                      setSelectedSite(site.key)
                      setShowSelector(false)
                    }}
                    activeOpacity={0.7}
                  >
                    <IconBox letter={site.letter} tint={site.tint} size="md" />
                    <View style={styles.siteTextWrap}>
                      <Text style={[styles.siteName, isSelected && { color: TINTS[site.tint].fg }]}>
                        {site.name}
                      </Text>
                      <Text style={styles.siteSubtitle}>{site.subtitle}</Text>
                    </View>
                    {isSelected && (
                      <View style={[styles.checkCircle, { backgroundColor: TINTS[site.tint].fg }]}>
                        <Text style={styles.checkMark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowSelector(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#F5F6F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    paddingRight: 14,
    borderRadius: 24,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    marginLeft: 8,
  },
  chevron: {
    fontSize: 14,
    color: TEXT_FAINT,
    marginLeft: 6,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  
  /* Modal / Bottom Sheet */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#eac5c5',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#88784a',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 16,
    textAlign: 'center',
  },
  siteList: {
    marginBottom: 24,
  },
  siteOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  siteOptionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: CARD_BORDER,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  siteTextWrap: {
    flex: 1,
    marginLeft: 14,
  },
  siteName: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  siteSubtitle: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginTop: 2,
    fontWeight: '500',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: TEXT_PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  /* Icon Box */
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxMd: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  iconBoxSm: {
    width: 26,
    height: 26,
    borderRadius: 8,
  },
  iconLetter: {
    fontWeight: '700',
  },
  iconLetterMd: {
    fontSize: 17,
  },
  iconLetterSm: {
    fontSize: 12,
  },
})