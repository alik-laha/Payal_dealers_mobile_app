import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDashboard } from '@/API/loginapi';
import { AfricaData, IndoreDataType, KolkataDataType } from '@/types/apiResponse.type';
import AfricaDashboard from '../../components/dashboards/AfricaDashboard';
import IndoreDashboard from '../../components/dashboards/IndoreDashboard';
import KolkataDashboard from '../../components/dashboards/KolkataDashboard';


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

type SiteDataMap = {
  kolkata?: KolkataDataType
  indore?: IndoreDataType
  africa?: AfricaData
}

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
  const [dashboards, setDashboards] = useState<SiteDataMap>({})
  const [errors, setErrors] = useState<Partial<Record<SiteKey, string>>>({})
  const [reloadKey, setReloadKey] = useState(0)

  const currentSite = SITE_OPTIONS.find(s => s.key === selectedSite)!
  const siteData = dashboards[selectedSite]
  const siteError = errors[selectedSite]
  const loading = !siteData && !siteError

  useEffect(() => {
    let active = true

    getDashboard(selectedSite)
      .then((res: any) => {
        if (!active) return
        if (!res) {
          setErrors(prev => ({ ...prev, [selectedSite]: 'Could not load dashboard data.' }))
          return
        }
        setDashboards(prev => ({ ...prev, [selectedSite]: res }))
      })
      .catch((err: unknown) => {
        if (!active) return
        setErrors(prev => ({
          ...prev,
          [selectedSite]: err instanceof Error ? err.message : 'Could not load dashboard data.',
        }))
      })

    return () => {
      active = false
    }
  }, [selectedSite, reloadKey])

  const retry = () => {
    setErrors(prev => ({ ...prev, [selectedSite]: undefined }))
    setReloadKey(key => key + 1)
  }

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

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator size="large" color={TEXT_PRIMARY} />
          <Text style={styles.stateText}>Loading {currentSite.name} dashboard…</Text>
        </View>
      ) : siteError && !siteData ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateError}>{siteError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retry} activeOpacity={0.8}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, backgroundColor: '#F5F6F8' }}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {selectedSite === 'kolkata' && dashboards.kolkata && <KolkataDashboard data={dashboards.kolkata} />}
          {selectedSite === 'indore' && dashboards.indore && <IndoreDashboard data={dashboards.indore} />}
          {selectedSite === 'africa' && dashboards.africa && <AfricaDashboard data={dashboards.africa} />}
        </ScrollView>
      )}

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
                      setDashboards({})
                      setErrors({})
                      setReloadKey(key => key + 1)
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

  /* Loading / Error states */
  stateBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  stateText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    textAlign: 'center',
  },
  stateError: {
    fontSize: 14,
    fontWeight: '500',
    color: '#C43D3D',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: TEXT_PRIMARY,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
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